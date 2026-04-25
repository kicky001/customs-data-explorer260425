import { useMemo, useState } from 'react';
import { Sparkles, TrendingUp, Users, BarChart3, Copy, Check, Wand2, Loader2 } from 'lucide-react';
import { analyzeRecords, buildAnalysisPrompt } from '../utils/analysis.js';

function fmtUSD(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function StatBlock({ label, value, hint }) {
  return (
    <div className="bg-white rounded-md border border-slate-200 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-900 tabular-nums">{value}</div>
      {hint && <div className="text-[10px] text-slate-500 mt-0.5">{hint}</div>}
    </div>
  );
}

function RankList({ title, items, formatter, icon: Icon }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
        {Icon && <Icon size={12} className="text-emerald-600" />}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map(([k, v], i) => (
          <li key={k} className="flex items-center gap-2 text-xs">
            <span className="w-4 text-slate-400 font-mono">{i + 1}</span>
            <span className="flex-1 truncate text-slate-700" title={k}>
              {k}
            </span>
            <span className="text-slate-500 tabular-nums">{formatter ? formatter(v) : v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeadCard({ lead, idx }) {
  return (
    <div className="bg-white rounded-md border border-emerald-200/70 p-2.5 space-y-1">
      <div className="flex items-start gap-2">
        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
          {idx + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-900 truncate" title={lead.importer}>
            {lead.importer}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lead.shipments} 次出货 · {lead.uniqueExporters} 家供应商 · {lead.productSpread} 类产品
          </div>
        </div>
      </div>
      <div className="text-[11px] text-emerald-700 font-medium pl-7">
        累计 {fmtUSD(lead.totalUSD)}
      </div>
    </div>
  );
}

async function callLLM({ endpoint, key, model, prompt }) {
  const isAnthropic = endpoint.includes('anthropic.com');

  if (isAnthropic) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`LLM ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.content?.[0]?.text || '(empty)';
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是一名外贸客户开发顾问，基于海关数据给出业务洞察。' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '(empty)';
}

export default function AnalysisPanel({ records, keyword, llm }) {
  const analysis = useMemo(() => analyzeRecords(records || []), [records]);
  const [copied, setCopied] = useState(false);
  const [llmAnswer, setLlmAnswer] = useState('');
  const [llmBusy, setLlmBusy] = useState(false);
  const [llmError, setLlmError] = useState(null);

  const promptText = useMemo(() => buildAnalysisPrompt(keyword, analysis), [keyword, analysis]);

  const onCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onCallLLM = async () => {
    if (!llm?.llmKey) return;
    setLlmBusy(true);
    setLlmError(null);
    setLlmAnswer('');
    try {
      const text = await callLLM({
        endpoint: llm.llmEndpoint,
        key: llm.llmKey,
        model: llm.llmModel,
        prompt: promptText,
      });
      setLlmAnswer(text);
    } catch (e) {
      setLlmError(e.message);
    } finally {
      setLlmBusy(false);
    }
  };

  if (!analysis) {
    return (
      <aside className="w-80 shrink-0 bg-slate-50/60 border-l border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <Sparkles size={15} className="text-emerald-600" />
            AI 客户分析
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-center px-6 text-xs text-slate-500">
          <p>查询返回结果后，<br />这里会自动汇总买家集中度、价格分布、客户线索等。</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 shrink-0 bg-slate-50/60 border-l border-slate-200 flex flex-col">
      <div className="p-3 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Sparkles size={15} className="text-emerald-600" />
          AI 客户分析
        </h2>
        <span className="text-[10px] text-slate-500">样本 {analysis.sampleSize} 条</span>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-3 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {analysis.qtyStats && (
            <>
              <StatBlock
                label="累计金额"
                value={fmtUSD(analysis.qtyStats.grandTotalUSD)}
                hint={`${analysis.qtyStats.count} 笔`}
              />
              <StatBlock label="单笔均值" value={fmtUSD(analysis.qtyStats.avgOrderUSD)} />
            </>
          )}
          {analysis.priceStats && (
            <>
              <StatBlock
                label="单价中位"
                value={`$${analysis.priceStats.median.toFixed(2)}`}
                hint={`min $${analysis.priceStats.min.toFixed(2)} · max $${analysis.priceStats.max.toFixed(2)}`}
              />
              <StatBlock label="单价均值" value={`$${analysis.priceStats.mean.toFixed(2)}`} />
            </>
          )}
        </div>

        {analysis.leads.length > 0 && (
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <Users size={12} className="text-emerald-600" />
              优先客户线索（自动评分）
            </h4>
            <div className="space-y-1.5">
              {analysis.leads.map((l, i) => (
                <LeadCard key={l.importer} lead={l} idx={i} />
              ))}
            </div>
          </div>
        )}

        <RankList title="Top 进口商" items={analysis.topImporters} formatter={(v) => `${v}`} icon={Users} />
        <RankList title="Top 出口商" items={analysis.topExporters} formatter={(v) => `${v}`} icon={Users} />
        <RankList title="Top HS 编码" items={analysis.topHs} formatter={(v) => `${v}`} icon={BarChart3} />
        <RankList title="Top 装运港" items={analysis.topPorts} formatter={(v) => `${v}`} icon={TrendingUp} />

        <div className="pt-3 border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              {copied ? '已复制' : '复制分析提示词'}
            </button>
            {llm?.llmKey && (
              <button
                onClick={onCallLLM}
                disabled={llmBusy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-slate-400"
              >
                {llmBusy ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                {llmBusy ? '生成中…' : 'AI 深度分析'}
              </button>
            )}
          </div>
          {!llm?.llmKey && (
            <p className="text-[10px] text-slate-500">
              在「设置」里配置 LLM API Key 后，可一键调用 AI 给出深度分析。
            </p>
          )}
        </div>

        {llmError && (
          <div className="bg-rose-50 border border-rose-200 rounded p-2 text-xs text-rose-700">
            <strong>LLM 调用失败：</strong>{llmError}
          </div>
        )}

        {llmAnswer && (
          <div className="pt-3 border-t border-slate-200">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-2">
              <Wand2 size={12} />
              AI 深度分析
            </h4>
            <pre className="whitespace-pre-wrap text-xs text-slate-800 bg-white border border-emerald-200 rounded p-3 leading-relaxed font-sans">
              {llmAnswer}
            </pre>
          </div>
        )}
      </div>
    </aside>
  );
}
