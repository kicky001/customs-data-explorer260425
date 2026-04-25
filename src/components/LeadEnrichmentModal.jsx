import { useEffect, useMemo, useState } from 'react';
import {
  X,
  Mail,
  MapPin,
  Phone,
  Globe,
  Sparkles,
  Loader2,
  ExternalLink,
  AlertCircle,
  Building2,
  Wand2,
  RefreshCw,
} from 'lucide-react';
import {
  hunterDomainSearch,
  googleMapsTextSearch,
  grokAnalyze,
  buildEnrichmentPrompt,
} from '../utils/enrich.js';

function fmtUSD(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function SectionState({ status, error, empty, children }) {
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500 py-3">
        <Loader2 size={14} className="animate-spin text-emerald-600" />
        加载中…
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded p-2 text-xs text-rose-700">
        <AlertCircle size={14} className="shrink-0 mt-0.5" />
        <div className="break-words">{error}</div>
      </div>
    );
  }
  if (status === 'idle') return <div className="text-xs text-slate-400 italic py-2">未启动</div>;
  if (empty) return <div className="text-xs text-slate-400 italic py-2">无返回数据</div>;
  return children;
}

function HunterSection({ data, status, error }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
        <Mail size={14} className="text-emerald-600" />
        邮箱情报 · Hunter
      </h3>
      <SectionState status={status} error={error} empty={!data || (!data.organization && !data.emails?.length)}>
        {data && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {data.organization && <Field label="公司" value={data.organization} />}
              {data.domain && <Field label="域名" value={data.domain} />}
              {data.industry && <Field label="行业" value={data.industry} />}
              {data.country && <Field label="国家" value={data.country} />}
              {data.headcount && <Field label="规模" value={data.headcount} />}
            </div>
            {data.emails?.length > 0 && (
              <div className="border-t border-slate-100 pt-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                  联系人邮箱（{data.emails.length}）
                </div>
                <ul className="space-y-1.5">
                  {data.emails.map((e) => (
                    <li key={e.value} className="text-xs flex flex-wrap gap-x-2 items-center">
                      <span className="font-medium text-slate-800">
                        {[e.first_name, e.last_name].filter(Boolean).join(' ') || '(姓名未公开)'}
                      </span>
                      {e.position && <span className="text-slate-500">· {e.position}</span>}
                      <a
                        href={`mailto:${e.value}`}
                        className="text-emerald-700 hover:underline font-mono"
                      >
                        {e.value}
                      </a>
                      <span className="text-[10px] text-slate-400">
                        {e.confidence}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </SectionState>
    </div>
  );
}

function MapsSection({ data, status, error }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
        <MapPin size={14} className="text-emerald-600" />
        电话 / 地址 · Google Maps
      </h3>
      <SectionState status={status} error={error} empty={!data?.length}>
        <ul className="space-y-2">
          {data?.map((p) => (
            <li key={p.id || p.formattedAddress} className="border-t border-slate-100 pt-2 first:border-0 first:pt-0">
              <div className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
                <Building2 size={13} className="text-slate-400" />
                {p.displayName?.text || '(no name)'}
              </div>
              {p.formattedAddress && (
                <div className="flex items-start gap-1.5 mt-1 text-xs text-slate-700">
                  <MapPin size={11} className="shrink-0 mt-0.5 text-slate-400" />
                  <span>{p.formattedAddress}</span>
                </div>
              )}
              {(p.internationalPhoneNumber || p.nationalPhoneNumber) && (
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <Phone size={11} className="text-slate-400" />
                  <a
                    href={`tel:${p.internationalPhoneNumber || p.nationalPhoneNumber}`}
                    className="text-emerald-700 hover:underline font-mono"
                  >
                    {p.internationalPhoneNumber || p.nationalPhoneNumber}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 mt-1 text-xs">
                {p.websiteUri && (
                  <a
                    href={p.websiteUri}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    <Globe size={11} />
                    网站
                    <ExternalLink size={9} />
                  </a>
                )}
                {p.googleMapsUri && (
                  <a
                    href={p.googleMapsUri}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-slate-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    <MapPin size={11} />
                    地图
                    <ExternalLink size={9} />
                  </a>
                )}
                {p.businessStatus && (
                  <span className="text-[10px] text-slate-500 ml-auto">{p.businessStatus}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionState>
    </div>
  );
}

function GrokSection({ data, status, error, onRun, ready }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-lg border border-emerald-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-emerald-900">
          <Sparkles size={14} />
          综合情报 · Grok
        </h3>
        <button
          onClick={onRun}
          disabled={status === 'loading' || !ready}
          className="text-xs px-2 py-1 bg-emerald-600 text-white rounded inline-flex items-center gap-1 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          title={!ready ? '等 Hunter / Maps 加载完再启动 Grok 综合分析效果更好' : '运行 Grok 分析'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={11} className="animate-spin" />
              生成中
            </>
          ) : (
            <>
              {data ? <RefreshCw size={11} /> : <Wand2 size={11} />}
              {data ? '重新生成' : '运行 Grok'}
            </>
          )}
        </button>
      </div>
      <SectionState status={status} error={error} empty={!data}>
        {data && (
          <pre className="whitespace-pre-wrap text-xs text-slate-800 leading-relaxed font-sans">
            {data}
          </pre>
        )}
      </SectionState>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-slate-800 break-words">{value}</div>
    </div>
  );
}

export default function LeadEnrichmentModal({ lead, records, settings, onClose }) {
  const [hunter, setHunter] = useState({ status: 'idle', data: null, error: null });
  const [maps, setMaps] = useState({ status: 'idle', data: null, error: null });
  const [grok, setGrok] = useState({ status: 'idle', data: null, error: null });

  // 这家进口商的所有出货记录（取样供 Grok 用）
  const ownRecords = useMemo(
    () => (records || []).filter((r) => r.Importer1 === lead.importer),
    [records, lead.importer],
  );

  // 从样本里推一个国家用于 Maps 查询，提高定位精度
  const guessedCountry = useMemo(() => {
    const counts = {};
    for (const r of ownRecords) {
      const c = r.DesCountry || r.OrgCountry;
      if (c) counts[c] = (counts[c] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  }, [ownRecords]);

  // 自动并行触发 Hunter 和 Maps（如果有 key）
  useEffect(() => {
    let cancelled = false;
    if (settings?.hunterKey) {
      setHunter({ status: 'loading', data: null, error: null });
      hunterDomainSearch({ apiKey: settings.hunterKey, company: lead.importer })
        .then((d) => !cancelled && setHunter({ status: 'done', data: d, error: null }))
        .catch((e) => !cancelled && setHunter({ status: 'error', data: null, error: e.message }));
    }
    if (settings?.gmapsKey) {
      setMaps({ status: 'loading', data: null, error: null });
      const q = guessedCountry ? `${lead.importer} ${guessedCountry}` : lead.importer;
      googleMapsTextSearch({ apiKey: settings.gmapsKey, query: q })
        .then((d) => !cancelled && setMaps({ status: 'done', data: d, error: null }))
        .catch((e) => !cancelled && setMaps({ status: 'error', data: null, error: e.message }));
    }
    return () => {
      cancelled = true;
    };
  }, [lead.importer, settings?.hunterKey, settings?.gmapsKey, guessedCountry]);

  const runGrok = async () => {
    if (!settings?.grokKey) {
      setGrok({ status: 'error', data: null, error: '未配置 Grok / xAI API Key（在「设置」中填入）' });
      return;
    }
    setGrok({ status: 'loading', data: null, error: null });
    try {
      const prompt = buildEnrichmentPrompt(
        lead,
        ownRecords.slice(0, 8),
        hunter.data,
        maps.data,
      );
      const text = await grokAnalyze({
        apiKey: settings.grokKey,
        apiBase: settings.apiBase,
        model: settings.grokModel || 'grok-2-latest',
        prompt,
      });
      setGrok({ status: 'done', data: text, error: null });
    } catch (e) {
      setGrok({ status: 'error', data: null, error: e.message });
    }
  };

  const grokReady = hunter.status !== 'loading' && maps.status !== 'loading';

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-start justify-between border-b border-slate-200 bg-white rounded-t-xl px-5 py-3 sticky top-0 z-10">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">客户情报</div>
            <h2 className="font-bold text-lg text-slate-900 truncate">{lead.importer}</h2>
            <div className="text-xs text-slate-600 mt-0.5">
              {lead.shipments} 次出货 · 累计 {fmtUSD(lead.totalUSD)} · {lead.uniqueExporters} 家供应商
              {guessedCountry && ` · 主要目的国 ${guessedCountry}`}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 ml-3 shrink-0">
            <X size={22} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {!settings?.hunterKey && !settings?.gmapsKey && !settings?.grokKey && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
              还没配置情报 API Key。在右上角「设置」里填入 Hunter / Google Maps / Grok 的 Key。
            </div>
          )}

          {settings?.hunterKey ? (
            <HunterSection data={hunter.data} status={hunter.status} error={hunter.error} />
          ) : (
            <div className="bg-white rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-400">
              <Mail size={14} className="inline mr-1.5" />
              邮箱情报（未配置 Hunter Key，跳过）
            </div>
          )}

          {settings?.gmapsKey ? (
            <MapsSection data={maps.data} status={maps.status} error={maps.error} />
          ) : (
            <div className="bg-white rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-400">
              <MapPin size={14} className="inline mr-1.5" />
              电话/地址（未配置 Google Maps Key，跳过）
            </div>
          )}

          <GrokSection data={grok.data} status={grok.status} error={grok.error} onRun={runGrok} ready={grokReady} />
        </div>
      </div>
    </div>
  );
}
