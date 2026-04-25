// Cloudflare Worker — multi-upstream proxy with CORS headers
//
// 路由：
//   /api/*         → https://cd.210k.cc/api/*           (海关数据)
//   /anthropic/*   → https://api.anthropic.com/*        (Claude)
//   /grok/*        → https://api.x.ai/*                 (xAI Grok)
//   /healthz       → 健康检查
//
// 部署：
//   方案 A：dash.cloudflare.com → Workers → Create → 粘贴本文件内容 → Deploy
//   方案 B：cd worker/ && npx wrangler deploy
//
// 部署完得到的 URL 形如 https://customs-data-proxy.<你的子域>.workers.dev
// 把它填到前端「设置 → API 代理」即可。

const UPSTREAMS = [
  { prefix: '/api/', host: 'https://cd.210k.cc', stripPrefix: false },
  { prefix: '/anthropic/', host: 'https://api.anthropic.com', stripPrefix: true },
  { prefix: '/grok/', host: 'https://api.x.ai', stripPrefix: true },
];

const ALLOWED_ORIGINS = [
  'https://kicky001.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
];

// 透传到上游的请求头白名单（其他都丢掉，避免 cf-* 等内部头泄漏）
const FORWARD_HEADERS = new Set([
  'authorization',
  'content-type',
  'x-api-key',
  'anthropic-version',
  'anthropic-dangerous-direct-browser-access',
  'x-goog-api-key',
  'x-goog-fieldmask',
]);

function buildCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Authorization, Content-Type, x-api-key, anthropic-version, anthropic-dangerous-direct-browser-access, x-goog-api-key, x-goog-fieldmask',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function matchUpstream(pathname) {
  for (const u of UPSTREAMS) {
    if (pathname.startsWith(u.prefix)) {
      const remainder = u.stripPrefix
        ? '/' + pathname.substring(u.prefix.length)
        : pathname;
      return { host: u.host, path: remainder };
    }
  }
  return null;
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const cors = buildCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'forbidden_origin', origin }), {
        status: 403,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/healthz') {
      return new Response(
        JSON.stringify({
          ok: true,
          upstreams: UPSTREAMS.map((u) => ({ prefix: u.prefix, host: u.host })),
          allowed_origins: ALLOWED_ORIGINS,
          ts: Date.now(),
        }),
        { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    const matched = matchUpstream(url.pathname);
    if (!matched) {
      return new Response(JSON.stringify({ error: 'no_upstream_match', path: url.pathname }), {
        status: 404,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const upstreamUrl = matched.host + matched.path + url.search;

    const forward = new Headers();
    for (const [k, v] of request.headers) {
      if (FORWARD_HEADERS.has(k.toLowerCase())) forward.set(k, v);
    }
    forward.set('User-Agent', 'cde260425-worker/2.0');

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
        JSON.stringify({ error: 'upstream_fetch_failed', upstream: matched.host, detail: String(err) }),
        { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    const responseHeaders = new Headers(upstream.headers);
    for (const [k, v] of Object.entries(cors)) {
      responseHeaders.set(k, v);
    }
    responseHeaders.delete('set-cookie');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  },
};
