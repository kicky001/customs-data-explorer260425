import { useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Zap, Loader2, AlertCircle, Inbox } from 'lucide-react';

const COLUMNS = [
  { key: 'Dates', label: '日期', width: '90px' },
  { key: 'Importer1', label: '进口商', width: '180px' },
  { key: 'Exporter1', label: '出口商', width: '180px' },
  { key: 'ProductDesc1', label: '产品描述', width: '320px' },
  { key: 'HSCODE', label: 'HS', width: '90px' },
  { key: 'QTY', label: '数量', width: '70px', align: 'right' },
  { key: 'UNIT', label: '单位', width: '60px' },
  { key: 'TotalPrice', label: '总价 USD', width: '100px', align: 'right' },
  { key: 'UnitPrice', label: '单价 USD', width: '90px', align: 'right' },
];

function formatNum(v, decimals = 0) {
  if (v == null || v === '') return '—';
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

function Cell({ rec, col }) {
  const v = rec[col.key];
  if (v == null || v === '') return <span className="text-slate-300">—</span>;
  if (col.key === 'TotalPrice' || col.key === 'UnitPrice') return formatNum(v, 2);
  if (col.key === 'QTY' || col.key === 'WT') return formatNum(v, 0);
  if (col.key === 'ProductDesc1') return <span className="text-slate-700">{v}</span>;
  return v;
}

function Row({ rec, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => setOpen((o) => !o)}
        className={`cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-emerald-50/60 border-b border-slate-100`}
      >
        <td className="w-6 px-2 text-slate-400">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </td>
        {COLUMNS.map((c) => (
          <td
            key={c.key}
            className={`px-2 py-1.5 text-xs text-slate-700 ${c.align === 'right' ? 'text-right tabular-nums' : ''} truncate`}
            style={{ maxWidth: c.width }}
          >
            <Cell rec={rec} col={c} />
          </td>
        ))}
      </tr>
      {open && (
        <tr className="bg-emerald-50/30 border-b border-emerald-100">
          <td colSpan={COLUMNS.length + 1} className="px-6 py-3 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1.5">
              {Object.entries(rec).map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider">{k}</span>
                  <span className="text-slate-800 break-words">{v == null || v === '' ? '—' : String(v)}</span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatusBanner({ status, queueState }) {
  if (status === 'idle') return null;
  if (status === 'cached') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800">
        <Zap size={13} className="text-emerald-600" />
        <span>缓存命中，瞬时返回</span>
      </div>
    );
  }
  if (status === 'pending' || status === 'processing') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-800">
        <Loader2 size={13} className="animate-spin" />
        <span>
          {status === 'pending' ? '排队中' : '查询执行中'}
          {queueState?.position != null && queueState.position > 0 && `（前面还有 ${queueState.position} 个任务）`}
        </span>
      </div>
    );
  }
  if (status === 'error') {
    return null;
  }
  return null;
}

export default function ResultsTable({ data, status, error, queueState, onPageChange, pageSize = 10, page = 1 }) {
  const records = data?.records || [];
  const total = data?.total || 0;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));

  if (status === 'loading' && records.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
        <Loader2 size={24} className="animate-spin text-emerald-600 mb-2" />
        <p className="text-sm">
          {queueState?.status === 'pending' ? '排队中…' : queueState?.status === 'processing' ? '执行中…' : '提交查询…'}
          {queueState?.position != null && queueState.position > 0 && (
            <span className="ml-2 text-slate-400">前面还有 {queueState.position} 个任务</span>
          )}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AlertCircle size={32} className="text-rose-500 mb-3" />
        <p className="text-slate-800 font-medium mb-1">查询失败</p>
        <p className="text-sm text-slate-600 max-w-md">{error}</p>
      </div>
    );
  }

  if (records.length === 0 && status === 'idle') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center text-slate-500">
        <Inbox size={32} className="mb-2 text-slate-300" />
        <p className="text-sm">输入关键词后点搜索</p>
        <p className="text-xs mt-1">默认演示模式可直接试用，配置 Token 后可查询真实数据</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center text-slate-500">
        <Inbox size={32} className="mb-2 text-slate-300" />
        <p className="text-sm">没有找到匹配的记录</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <StatusBanner status={status === 'loading' ? queueState?.status || 'pending' : status} queueState={queueState} />

      <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex items-center gap-3">
        <span>
          共 <span className="font-semibold text-slate-900">{total.toLocaleString()}</span> 条
        </span>
        <span className="text-slate-300">|</span>
        <span>
          第 <span className="font-mono">{page}</span> / <span className="font-mono">{maxPage}</span> 页
        </span>
        {data?.took_ms != null && (
          <>
            <span className="text-slate-300">|</span>
            <span>耗时 {data.took_ms} ms</span>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto scroll-thin">
        <table className="text-xs w-full" style={{ minWidth: '1200px' }}>
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr>
              <th className="w-6"></th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={`px-2 py-2 font-semibold text-slate-700 text-[11px] uppercase tracking-wider border-b border-slate-200 ${c.align === 'right' ? 'text-right' : 'text-left'}`}
                  style={{ width: c.width }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <Row key={r.BID || `${page}-${i}`} rec={r} idx={i} />
            ))}
          </tbody>
        </table>
      </div>

      {maxPage > 1 && (
        <div className="border-t border-slate-200 px-3 py-2 flex items-center justify-center gap-1.5 bg-slate-50 text-sm">
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={15} />
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="px-3 text-xs text-slate-600 font-mono">
            {page} / {maxPage}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= maxPage}
            className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => onPageChange(maxPage)}
            disabled={page >= maxPage}
            className="p-1 rounded text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
