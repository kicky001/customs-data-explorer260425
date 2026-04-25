import { Leaf, Settings, Database, Wifi, WifiOff } from 'lucide-react';

export default function Header({ mode, recordCount, onOpenSettings }) {
  return (
    <header className="brand-grad text-white shadow-md">
      <div className="px-5 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 rounded-lg p-1.5">
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">海关数据查询系统</h1>
            <p className="text-xs text-white/80 leading-tight">287 个数据源 · 聚合搜索 · AI 客户挖掘</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-md">
            <Database size={14} />
            287 个数据源
          </span>
          {mode === 'demo' ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/90 px-2.5 py-1 rounded-md font-medium">
              <WifiOff size={14} />
              演示模式
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-emerald-300/30 px-2.5 py-1 rounded-md font-medium">
              <Wifi size={14} />
              已连接
            </span>
          )}
          {typeof recordCount === 'number' && recordCount > 0 && (
            <span className="text-white/85 hidden md:inline">
              本次结果 {recordCount.toLocaleString()} 条
            </span>
          )}
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition px-3 py-1.5 rounded-md"
            title="设置 API Token"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">设置</span>
          </button>
        </div>
      </div>
    </header>
  );
}
