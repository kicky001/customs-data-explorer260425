import { useState } from 'react';
import { Search, Plus, X, Calendar, Filter } from 'lucide-react';
import { SOURCE_BY_SID } from '../data/sources.js';

const SEARCH_FIELDS = [
  { value: 'ProductDesc1', label: '产品描述' },
  { value: 'Importer1', label: '进口商' },
  { value: 'Exporter1', label: '出口商' },
  { value: 'HSCODE', label: 'HS 编码' },
  { value: 'LdPort', label: '装运港' },
  { value: 'DesPort', label: '目的港' },
];

const FILTER_FIELDS = [
  { value: 'ProductDesc1', label: '产品描述' },
  { value: 'Importer1', label: '进口商' },
  { value: 'Exporter1', label: '出口商' },
  { value: 'HSCODE', label: 'HS 编码' },
  { value: 'LdPort', label: '装运港' },
  { value: 'DesPort', label: '目的港' },
  { value: 'OrgCountry', label: '原产国' },
  { value: 'DesCountry', label: '目的国' },
];

const SEARCH_TYPES = [
  { value: 0, label: '包含' },
  { value: 1, label: '精确' },
  { value: 2, label: '前缀' },
  { value: 3, label: '模糊' },
];

const PAGE_SIZES = [10, 20, 30];

function defaultDates() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const start = new Date(now.getFullYear(), now.getMonth() - 13, 1);
  const fmt = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
  return { start: fmt(start), end: fmt(last) };
}

export default function SearchForm({ sid, aggregateRegion, onSubmit, onCancelAggregate, busy }) {
  const [keyword, setKeyword] = useState('PAMASI S.A.S.');
  const [field, setField] = useState('ProductDesc1');
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState([]);
  const [{ start, end }, setDates] = useState(defaultDates);

  const source = SOURCE_BY_SID[sid];

  const addFilter = () => setFilters((arr) => [...arr, { field: 'Importer1', value: '', search_type: 0 }]);
  const updateFilter = (i, patch) =>
    setFilters((arr) => arr.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  const removeFilter = (i) => setFilters((arr) => arr.filter((_, idx) => idx !== i));

  const submit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    const validFilters = filters.filter((f) => f.value.trim());
    onSubmit({
      keyword: keyword.trim(),
      field,
      page_size: pageSize,
      page_num: 1,
      date_start: start,
      date_end: end,
      filters: validFilters.length ? validFilters : undefined,
    });
  };

  return (
    <form onSubmit={submit} className="bg-white border-b border-slate-200">
      <div className="px-5 py-3">
        <div className="flex items-center gap-2 text-xs mb-2">
          {aggregateRegion ? (
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                聚合搜索：{aggregateRegion.region}（{aggregateRegion.sources.length} 个数据源）
              </span>
              <button
                type="button"
                onClick={onCancelAggregate}
                className="text-slate-500 hover:text-slate-800"
                title="切回单数据源模式"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="text-slate-600">
              当前数据源：
              <span className="font-mono text-emerald-700 ml-1">{sid}</span>
              <span className="ml-1.5 font-medium text-slate-800">{source?.name || '—'}</span>
              {source && (
                <span className="ml-2 text-slate-500">
                  · {source.type} · {source.transport} · {source.range}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="flex-1 min-w-[260px]">
            <label className="text-xs text-slate-500 mb-0.5 block">关键词</label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="例如：LED light / PAMASI / 9405409980"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-0.5 block">搜索字段</label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            >
              {SEARCH_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-0.5 block">每页</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="text-sm border border-slate-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={busy || !keyword.trim()}
            className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
          >
            {busy ? '查询中…' : '搜索'}
          </button>
        </div>

        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1.5 select-none">
            <Filter size={13} />
            高级选项（日期范围 / 辅助过滤）
            {filters.length > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 rounded">
                {filters.length}
              </span>
            )}
          </summary>
          <div className="mt-3 space-y-3 pl-2 border-l-2 border-emerald-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500">日期范围（YYYYMM）：</span>
              <input
                value={start}
                onChange={(e) => setDates((d) => ({ ...d, start: e.target.value }))}
                placeholder="202504"
                className="w-24 text-sm border border-slate-300 rounded px-2 py-1 font-mono"
              />
              <span className="text-slate-400">→</span>
              <input
                value={end}
                onChange={(e) => setDates((d) => ({ ...d, end: e.target.value }))}
                placeholder="202603"
                className="w-24 text-sm border border-slate-300 rounded px-2 py-1 font-mono"
              />
              <span className="text-xs text-slate-400">最大跨度 35 个月</span>
            </div>

            <div className="space-y-2">
              {filters.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={f.field}
                    onChange={(e) => updateFilter(i, { field: e.target.value })}
                    className="text-xs border border-slate-300 rounded px-1.5 py-1 bg-white"
                  >
                    {FILTER_FIELDS.map((ff) => (
                      <option key={ff.value} value={ff.value}>
                        {ff.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={f.search_type}
                    onChange={(e) => updateFilter(i, { search_type: Number(e.target.value) })}
                    className="text-xs border border-slate-300 rounded px-1.5 py-1 bg-white"
                  >
                    {SEARCH_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <input
                    value={f.value}
                    onChange={(e) => updateFilter(i, { value: e.target.value })}
                    placeholder="过滤值"
                    className="flex-1 text-xs border border-slate-300 rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeFilter(i)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFilter}
                className="text-xs inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900"
              >
                <Plus size={13} />
                添加过滤条件
              </button>
            </div>
          </div>
        </details>
      </div>
    </form>
  );
}
