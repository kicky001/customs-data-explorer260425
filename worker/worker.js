// Cloudflare Worker — proxy for https://cd.210k.cc with CORS headers
//
// 部署方式：
//   1) 控制台手动：dash.cloudflare.com → Workers & Pages → Create → Hello World
//      → 把这个文件内容粘贴进去 → Deploy。Worker URL 形如
//      https://customs-data-proxy.<你的子域>.workers.dev
//   2) Wrangler CLI：cd worker/ && npx wrangler deploy
//
// 部署完成后，把 Worker URL 填到前端「设置 → API 代理 (可选)」。

const UPSTREAM = 'https://cd.210k.cc';

// 只允许这些来源使用代理（防止被当公开 CORS 桥滥用）
const ALLOWED_ORIGINS = [
  'https://kicky001.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
];

function buildCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const cors = buildCorsHeaders(origin);

    // 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    // 限制来源（同源/无 Origin header 的请求放行，跨源必须在白名单里）
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'forbidden_origin', origin }), {
        status: 403,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);

    // 健康检查
    if (url.pathname === '/' || url.pathname === '/healthz') {
      return new Response(
        JSON.stringify({
          ok: true,
          upstream: UPSTREAM,
          allowed_origins: ALLOWED_ORIGINS,
          ts: Date.now(),
        }),
        { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    // 转发 /api/* 到上游
    if (!url.pathname.startsWith('/api/')) {
      return new Response('not found', { status: 404, headers: cors });
    }

    const upstreamUrl = UPSTREAM + url.pathname + url.search;

    const forward = new Headers();
    const auth = request.headers.get('Authorization');
    if (auth) forward.set('Authorization', auth);
    const ct = request.headers.get('Content-Type');
    if (ct) forward.set('Content-Type', ct);
    forward.set('User-Agent', 'cde260425-worker/1.0');

    let body;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer();
    }

    let upstream;
    try {
      upstream = await fetch(upstreamUrl, {
        method: request.method,
        headers: forward,
        body,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'upstream_fetch_failed', detail: String(err) }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    // 镜像响应 + 注入 CORS
    const responseHeaders = new Headers(upstream.headers);
    for (const [k, v] of Object.entries(cors)) {
      responseHeaders.set(k, v);
    }
    // 防止 Cloudflare 给这里加上 set-cookie 等多余 header
    responseHeaders.delete('set-cookie');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  },
};
