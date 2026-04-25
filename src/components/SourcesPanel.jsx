import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Layers, Search, Star } from 'lucide-react';
import { DATA_SOURCES, REGION_CLUSTERS } from '../data/sources.js';

export default function SourcesPanel({ selectedSid, onSelectSid, onAggregateRegion }) {
  const [filter, setFilter] = useState('');
  const [openClusters, setOpenClusters] = useState(() => new Set(['北美洲', '欧亚']));
  const [openRegions, setOpenRegions] = useState(() => new Set(['美国', '俄罗斯']));

  const grouped = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const filtered = f
      ? DATA_SOURCES.filter(
          (s) =>
            s.sid.includes(f) ||
            s.name.toLowerCase().includes(f) ||
            s.region.toLowerCase().includes(f),
        )
      : DATA_SOURCES;

    const clusters = new Map();
    for (const s of filtered) {
      const cluster = REGION_CLUSTERS[s.region] || '其他';
      if (!clusters.has(cluster)) clusters.set(cluster, new Map());
      const regionMap = clusters.get(cluster);
      if (!regionMap.has(s.region)) regionMap.set(s.region, []);
      regionMap.get(s.region).push(s);
    }
    return clusters;
  }, [filter]);

  const toggleCluster = (c) => {
    setOpenClusters((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };
  const toggleRegion = (r) => {
    setOpenRegions((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  };

  const showFiltered = filter.trim().length > 0;

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="border-b border-slate-200 p-3">
        <h2 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
          <Layers size={15} className="text-emerald-600" />
          数据源（{DATA_SOURCES.length}）
        </h2>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="搜索 SID / 名称 / 国家"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin">
        {[...grouped.entries()].map(([cluster, regionMap]) => {
          const open = showFiltered || openClusters.has(cluster);
          const total = [...regionMap.values()].reduce((s, arr) => s + arr.length, 0);
          return (
            <div key={cluster} className="border-b border-slate-100">
              <button
                onClick={() => !showFiltered && toggleCluster(cluster)}
                className="w-full flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50"
              >
                {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                <span>{cluster}</span>
                <span className="text-slate-400 font-normal ml-1">{total}</span>
              </button>
              {open &&
                [...regionMap.entries()].map(([region, sources]) => {
                  const regOpen = showFiltered || openRegions.has(region);
                  return (
                    <div key={region}>
                      <div className="flex items-center gap-1 pl-4 pr-2 text-sm hover:bg-emerald-50/40">
                        <button
                          onClick={() => !showFiltered && toggleRegion(region)}
                          className="flex-1 flex items-center gap-1 py-1.5 text-slate-700"
                        >
                          {regOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          <span>{region}</span>
                          <span className="text-slate-400 text-xs ml-1">{sources.length}</span>
                        </button>
                        {sources.length > 1 && (
                          <button
                            onClick={() => onAggregateRegion?.(region, sources)}
                            className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded transition"
                            title={`并行查询 ${region} 全部 ${sources.length} 个数据源`}
                          >
                            全部
                          </button>
                        )}
                      </div>
                      {regOpen &&
                        sources.map((s) => {
                          const active = s.sid === selectedSid;
                          return (
                            <button
                              key={s.sid}
                              onClick={() => onSelectSid(s.sid)}
                              className={`w-full text-left pl-9 pr-2 py-1 text-xs flex items-center gap-1.5 group ${
                                active
                                  ? 'bg-emerald-100 text-emerald-900 font-medium'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                              title={`${s.type}・${s.transport}・${s.freq}・${s.range}`}
                            >
                              <span className={`font-mono ${active ? 'text-emerald-700' : 'text-slate-400'}`}>
                                {s.sid}
                              </span>
                              <span className="truncate flex-1">{s.name}</span>
                              {s.recommended && (
                                <Star size={10} className="text-amber-500 shrink-0" fill="currentColor" />
                              )}
                            </button>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          );
        })}
        {grouped.size === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">无匹配数据源</div>
        )}
      </div>
    </aside>
  );
}
