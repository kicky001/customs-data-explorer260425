import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import TokenSettings from './components/TokenSettings.jsx';
import SourcesPanel from './components/SourcesPanel.jsx';
import SearchForm from './components/SearchForm.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import AnalysisPanel from './components/AnalysisPanel.jsx';
import { runQuery, ApiError } from './api.js';
import { buildDemoResult } from './data/demo.js';

const STORAGE_KEY = 'cde260425.settings.v1';

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSettings(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

function dedupRecords(records) {
  const seen = new Set();
  const out = [];
  for (const r of records) {
    const key = r.BID || `${r.Dates}|${r.Importer1}|${r.Exporter1}|${r.ProductDesc1}|${r.HSCODE}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

// 客户端排除过滤：任一 token 命中 Importer1 / Exporter1 / ProductDesc1 即丢弃
function applyExcludes(records, tokens) {
  if (!tokens || tokens.length === 0) return records;
  const lc = tokens.map((t) => t.toLowerCase());
  return records.filter((r) => {
    const hay = `${r.Importer1 || ''} || ${r.Exporter1 || ''} || ${r.ProductDesc1 || ''}`.toLowerCase();
    return !lc.some((t) => hay.includes(t));
  });
}

export default function App() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSid, setSelectedSid] = useState('100');
  const [aggregateRegion, setAggregateRegion] = useState(null);
  const [lastPayload, setLastPayload] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [queueState, setQueueState] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const isDemoMode = !settings.token;

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const onSelectSid = (sid) => {
    setSelectedSid(sid);
    setAggregateRegion(null);
  };

  const onAggregateRegion = (region, sources) => {
    setAggregateRegion({ region, sources });
  };

  const cancelInFlight = () => {
    abortRef.current?.abort();
    abortRef.current = null;
  };

  const runDemo = async (payload, pageNum = 1) => {
    await new Promise((r) => setTimeout(r, 350));
    return buildDemoResult({
      keyword: payload.keyword,
      pageSize: payload.page_size,
      pageNum,
    });
  };

  const fetchPage = async (payload, pageNum) => {
    setStatus('loading');
    setError(null);
    setQueueState({ status: 'pending' });

    // 拆出客户端字段，剩下的才发给 API
    const { _excludes, ...apiPayload } = payload;

    const finalize = (raw, opts = {}) => {
      const original = raw?.records || [];
      const filtered = applyExcludes(original, _excludes);
      const droppedCount = original.length - filtered.length;
      setData({
        ...raw,
        records: filtered,
        _originalCount: original.length,
        _droppedCount: droppedCount,
        _excludes: _excludes || null,
        ...opts,
      });
    };

    if (isDemoMode) {
      try {
        const result = await runDemo(apiPayload, pageNum);
        finalize(result);
        setStatus('cached');
        setQueueState(null);
        return;
      } catch (e) {
        setError(e.message);
        setStatus('error');
        return;
      }
    }

    cancelInFlight();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if (aggregateRegion) {
        const sources = aggregateRegion.sources;
        setQueueState({ status: 'pending', position: 0 });
        const results = await Promise.allSettled(
          sources.map((s) =>
            runQuery(
              settings.token,
              { ...apiPayload, sid: s.sid, page_num: pageNum },
              { signal: controller.signal, apiBase: settings.apiBase },
            ),
          ),
        );
        const allRecords = [];
        let totalAcross = 0;
        let cached = true;
        let failures = 0;
        for (const r of results) {
          if (r.status === 'fulfilled') {
            allRecords.push(...(r.value.result?.records || []));
            totalAcross += r.value.result?.total || 0;
            if (!r.value.cached) cached = false;
          } else {
            failures += 1;
          }
        }
        finalize(
          {
            total: totalAcross,
            records: dedupRecords(allRecords),
            took_ms: 0,
          },
          {
            aggregateNote:
              failures > 0
                ? `${sources.length - failures}/${sources.length} 个数据源成功`
                : null,
          },
        );
        setStatus(cached ? 'cached' : 'done');
      } else {
        const { result, cached } = await runQuery(
          settings.token,
          { ...apiPayload, sid: selectedSid, page_num: pageNum },
          {
            signal: controller.signal,
            onProgress: (state) => setQueueState(state),
            apiBase: settings.apiBase,
          },
        );
        finalize(result);
        setStatus(cached ? 'cached' : 'done');
      }
      setQueueState(null);
    } catch (e) {
      if (e?.message === 'aborted') return;
      let msg = e?.message || String(e);
      if (e instanceof ApiError) {
        if (e.code === 'math_captcha_blocking') {
          msg = `数学验证码触发，请人工到 ${e.captchaUrl} 解题后重试`;
        } else if (e.code === 'backlog_full') {
          msg = `队列已满（${e.message}），请等待当前任务完成后重试`;
        } else if (e.code === 'hourly_limit') {
          msg = '当前 token 每小时配额已用尽，请下个整点窗口重试';
        } else if (e.status === 401 || e.status === 403) {
          msg = 'Token 无效或未授权，请在「设置」里检查 API Token';
        }
      }
      setError(msg);
      setStatus('error');
      setQueueState(null);
    }
  };

  const onSubmit = (payload) => {
    setLastPayload(payload);
    setPage(1);
    setPageSize(payload.page_size);
    fetchPage(payload, 1);
  };

  const onPageChange = (newPage) => {
    if (!lastPayload) return;
    setPage(newPage);
    fetchPage(lastPayload, newPage);
  };

  const recordCount = data?.total || 0;

  return (
    <div className="h-screen flex flex-col">
      <Header
        mode={isDemoMode ? 'demo' : 'live'}
        recordCount={recordCount}
        onOpenSettings={() => setShowSettings(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <SourcesPanel
          selectedSid={selectedSid}
          onSelectSid={onSelectSid}
          onAggregateRegion={onAggregateRegion}
        />

        <main className="flex-1 flex flex-col bg-white min-w-0">
          <SearchForm
            sid={selectedSid}
            aggregateRegion={aggregateRegion}
            onSubmit={onSubmit}
            onCancelAggregate={() => setAggregateRegion(null)}
            busy={status === 'loading'}
          />

          {data?.aggregateNote && (
            <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-800">
              聚合结果：{data.aggregateNote}（已自动去重）
            </div>
          )}

          <ResultsTable
            data={data}
            status={status}
            error={error}
            queueState={queueState}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </main>

        <AnalysisPanel
          records={data?.records}
          keyword={lastPayload?.keyword || ''}
          llm={settings}
        />
      </div>

      <TokenSettings
        open={showSettings}
        onClose={() => setShowSettings(false)}
        value={settings}
        onSave={(v) => setSettings(v)}
      />
    </div>
  );
}
