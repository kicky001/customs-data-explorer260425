// 海关数据 API 客户端
// 文档：https://cd.210k.cc/doc

export const DEFAULT_API_BASE = 'https://cd.210k.cc';

function resolveBase(override) {
  if (!override) return DEFAULT_API_BASE;
  return override.replace(/\/+$/, '');
}

class ApiError extends Error {
  constructor(message, { code, status, retryAfter, captchaUrl } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.retryAfter = retryAfter;
    this.captchaUrl = captchaUrl;
  }
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function safeJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { _raw: text };
  }
}

async function handle(res) {
  const body = await safeJson(res);
  if (res.ok) return body;

  const code = body.error || body.code;
  const message = body.detail || body.message || body.error || `HTTP ${res.status}`;
  throw new ApiError(message, {
    code,
    status: res.status,
    retryAfter: body.retry_after_sec,
    captchaUrl: body.captcha_url,
  });
}

export async function postQuery(token, payload, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/query`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function getTask(token, taskId, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/task/${encodeURIComponent(taskId)}`, {
    method: 'GET',
    headers: authHeaders(token),
  });
  return handle(res);
}

export async function cancelTask(token, taskId, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/task/${encodeURIComponent(taskId)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  return handle(res);
}

export async function batchTaskStatus(token, taskIds, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/tasks/status`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ task_ids: taskIds }),
  });
  return handle(res);
}

export async function getQueueStatus(token, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/queue/status`, {
    method: 'GET',
    headers: authHeaders(token),
  });
  return handle(res);
}

export async function postDetail(token, payload, apiBase) {
  const base = resolveBase(apiBase);
  const res = await fetch(`${base}/api/detail`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// 等待异步任务完成（轮询）
// onProgress(state)：每次轮询都会回调，便于 UI 显示队列位置
export async function waitForTask(token, taskId, { onProgress, signal, intervalMs = 2000, maxAttempts = 90, apiBase } = {}) {
  for (let i = 0; i < maxAttempts; i++) {
    if (signal?.aborted) throw new Error('aborted');
    await new Promise((r) => setTimeout(r, intervalMs));
    if (signal?.aborted) throw new Error('aborted');

    let state;
    try {
      state = await getTask(token, taskId, apiBase);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        throw new ApiError('任务未找到（可能已超时取消）', { code: 'task_not_found' });
      }
      throw err;
    }

    onProgress?.(state);

    if (state.status === 'done') return state.result;
    if (state.status === 'failed') throw new ApiError(state.error || '查询失败', { code: 'task_failed' });
    if (state.status === 'cancelled') throw new ApiError('任务已被取消（' + (state.reason || '') + '）', { code: 'task_cancelled' });
  }
  throw new ApiError('查询超时：超过最大轮询次数', { code: 'poll_timeout' });
}

// 提交查询并等待结果（单页，便利方法）
export async function runQuery(token, payload, { onProgress, signal, apiBase } = {}) {
  const submit = await postQuery(token, payload, apiBase);

  // 缓存命中
  if (submit.cached && submit.result) {
    return { result: submit.result, cached: true };
  }

  // 多页 prefetch 形态：返回 tasks 数组
  if (submit.tasks) {
    const first = submit.tasks.find((t) => t.page_num === (payload.page_num || 1));
    if (first?.cached) return { result: first.result, cached: true };
    if (first?.task_id) {
      onProgress?.({ status: 'pending', position: submit.position });
      const result = await waitForTask(token, first.task_id, { onProgress, signal, apiBase });
      return { result, cached: false, taskId: first.task_id };
    }
  }

  // 单 task
  if (submit.task_id) {
    onProgress?.({ status: 'pending', position: submit.position });
    const result = await waitForTask(token, submit.task_id, { onProgress, signal, apiBase });
    return { result, cached: false, taskId: submit.task_id };
  }

  // 兜底
  if (submit.result) return { result: submit.result, cached: !!submit.cached };

  throw new ApiError('意外的响应结构', { code: 'unexpected_response' });
}

export { ApiError };
