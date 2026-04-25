import { useEffect, useState } from 'react';
import { X, Key, Sparkles, ShieldCheck } from 'lucide-react';

export default function TokenSettings({ open, onClose, value, onSave }) {
  const [token, setToken] = useState(value?.token || '');
  const [llmKey, setLlmKey] = useState(value?.llmKey || '');
  const [llmEndpoint, setLlmEndpoint] = useState(value?.llmEndpoint || 'https://api.openai.com/v1/chat/completions');
  const [llmModel, setLlmModel] = useState(value?.llmModel || 'gpt-4o-mini');

  useEffect(() => {
    if (open) {
      setToken(value?.token || '');
      setLlmKey(value?.llmKey || '');
      setLlmEndpoint(value?.llmEndpoint || 'https://api.openai.com/v1/chat/completions');
      setLlmModel(value?.llmModel || 'gpt-4o-mini');
    }
  }, [open, value]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSave({
      token: token.trim(),
      llmKey: llmKey.trim(),
      llmEndpoint: llmEndpoint.trim(),
      llmModel: llmModel.trim(),
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
              <Sparkles size={15} className="text-emerald-600" />
              LLM API（可选 · 用于 AI 深度分析）
            </label>
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
              留空则只用本地规则分析。注意：浏览器直调 LLM 可能受 CORS 限制，建议用 OpenAI 兼容代理。
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <p className="font-semibold mb-1">关于 CORS：</p>
            <p>
              如浏览器控制台报 CORS 错误，说明 cd.210k.cc 没开放跨域。可以临时用浏览器
              CORS 插件，或部署一个 Cloudflare Workers 代理。
            </p>
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
