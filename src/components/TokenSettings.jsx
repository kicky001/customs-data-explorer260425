import { useEffect, useState } from 'react';
import { X, Key, Sparkles, ShieldCheck, Globe, Mail, MapPin, Search } from 'lucide-react';

const DEFAULT_LLM_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_LLM_MODEL = 'gpt-4o-mini';
const DEFAULT_GROK_MODEL = 'grok-2-latest';

export default function TokenSettings({ open, onClose, value, onSave }) {
  const [token, setToken] = useState(value?.token || '');
  const [apiBase, setApiBase] = useState(value?.apiBase || '');
  const [llmKey, setLlmKey] = useState(value?.llmKey || '');
  const [llmEndpoint, setLlmEndpoint] = useState(value?.llmEndpoint || DEFAULT_LLM_ENDPOINT);
  const [llmModel, setLlmModel] = useState(value?.llmModel || DEFAULT_LLM_MODEL);
  const [hunterKey, setHunterKey] = useState(value?.hunterKey || '');
  const [gmapsKey, setGmapsKey] = useState(value?.gmapsKey || '');
  const [grokKey, setGrokKey] = useState(value?.grokKey || '');
  const [grokModel, setGrokModel] = useState(value?.grokModel || DEFAULT_GROK_MODEL);

  useEffect(() => {
    if (open) {
      setToken(value?.token || '');
      setApiBase(value?.apiBase || '');
      setLlmKey(value?.llmKey || '');
      setLlmEndpoint(value?.llmEndpoint || DEFAULT_LLM_ENDPOINT);
      setLlmModel(value?.llmModel || DEFAULT_LLM_MODEL);
      setHunterKey(value?.hunterKey || '');
      setGmapsKey(value?.gmapsKey || '');
      setGrokKey(value?.grokKey || '');
      setGrokModel(value?.grokModel || DEFAULT_GROK_MODEL);
    }
  }, [open, value]);

  if (!open) return null;

  const useClaudePreset = () => {
    setLlmEndpoint('https://api.anthropic.com/v1/messages');
    setLlmModel('claude-sonnet-4-6');
  };
  const useOpenAIPreset = () => {
    setLlmEndpoint(DEFAULT_LLM_ENDPOINT);
    setLlmModel(DEFAULT_LLM_MODEL);
  };

  const submit = (e) => {
    e.preventDefault();
    onSave({
      token: token.trim(),
      apiBase: apiBase.trim(),
      llmKey: llmKey.trim(),
      llmEndpoint: llmEndpoint.trim(),
      llmModel: llmModel.trim(),
      hunterKey: hunterKey.trim(),
      gmapsKey: gmapsKey.trim(),
      grokKey: grokKey.trim(),
      grokModel: grokModel.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scroll-thin"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h2 className="font-semibold text-slate-900">设置</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <section>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
              <Key size={15} className="text-emerald-600" />
              海关数据 API Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="粘贴你的 Bearer Token"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              autoComplete="off"
            />
            <p className="text-xs text-slate-500 mt-1.5 flex items-start gap-1.5">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>仅保存在本地浏览器。不填则使用演示模式（假数据）。</span>
            </p>
          </section>

          <section>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
              <Globe size={15} className="text-emerald-600" />
              API 代理（可选，解决 CORS）
            </label>
            <input
              type="text"
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              placeholder="https://customs-data-proxy.your-name.workers.dev"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              autoComplete="off"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              留空则直接调用 cd.210k.cc（浏览器多半被 CORS 挡）。部署 Cloudflare Worker 代理后填它的 URL —— 见仓库 worker/README.md。
            </p>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                <Sparkles size={15} className="text-emerald-600" />
                LLM API（可选 · 用于 AI 深度分析）
              </label>
              <div className="flex gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={useClaudePreset}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded"
                >
                  Claude
                </button>
                <button
                  type="button"
                  onClick={useOpenAIPreset}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded"
                >
                  OpenAI
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="password"
                value={llmKey}
                onChange={(e) => setLlmKey(e.target.value)}
                placeholder="OpenAI / Anthropic / 兼容 API Key"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                autoComplete="off"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={llmEndpoint}
                  onChange={(e) => setLlmEndpoint(e.target.value)}
                  placeholder="API Endpoint"
                  className="border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <input
                  type="text"
                  value={llmModel}
                  onChange={(e) => setLlmModel(e.target.value)}
                  placeholder="模型 ID"
                  className="border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              留空则只用本地规则分析。Anthropic 浏览器直连需要服务方在 CORS 头里返回 <code className="bg-slate-100 px-1 rounded">anthropic-dangerous-direct-browser-access</code>，否则用同一个 Worker 转发。
            </p>
          </section>

          <section className="border-t border-slate-200 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Search size={15} className="text-emerald-600" />
              客户情报增强（点客户线索卡上的「情报」按钮触发）
            </h3>

            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                  <Mail size={13} className="text-emerald-600" />
                  Hunter API Key（邮箱情报）
                </label>
                <input
                  type="password"
                  value={hunterKey}
                  onChange={(e) => setHunterKey(e.target.value)}
                  placeholder="hunter.io 申请 · 25 次/月免费"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                  <MapPin size={13} className="text-emerald-600" />
                  Google Maps API Key（电话/地址）
                </label>
                <input
                  type="password"
                  value={gmapsKey}
                  onChange={(e) => setGmapsKey(e.target.value)}
                  placeholder="启用 Places API (New) · 200 美元/月免额"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  autoComplete="off"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Google Cloud Console 启用 <strong>Places API (New)</strong> 并创建 API Key；建议加 HTTP referrer 限制到 kicky001.github.io。
                </p>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                  <Sparkles size={13} className="text-emerald-600" />
                  xAI Grok API Key（综合情报分析）
                </label>
                <input
                  type="password"
                  value={grokKey}
                  onChange={(e) => setGrokKey(e.target.value)}
                  placeholder="x.ai/api 申请"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  autoComplete="off"
                />
                <input
                  type="text"
                  value={grokModel}
                  onChange={(e) => setGrokModel(e.target.value)}
                  placeholder="grok-2-latest / grok-beta"
                  className="mt-1.5 w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  ⚠️ Grok 不支持浏览器直连，<strong>必须配「API 代理」</strong>（前面那个 Worker URL），调用会自动走 Worker 的 <code className="bg-slate-100 px-1 rounded">/grok/*</code> 路由。
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-slate-200 px-5 py-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm bg-emerald-600 text-white hover:bg-emerald-700 font-medium"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
