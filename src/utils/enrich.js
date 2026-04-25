// 客户情报增强：Hunter（邮箱）/ Google Maps（电话+地址）/ Grok（综合情报）
//
// CORS 说明：
// - Hunter API 浏览器直连可用
// - Google Maps Places API (New) 浏览器直连可用（需 API Key 设置 referrer 限制）
// - xAI Grok 几乎肯定不开 CORS，必须走 Worker 代理（worker.js 已加 /grok/* 路由）

function trimSlash(s) {
  return (s || '').replace(/\/+$/, '');
}

// =============== Hunter ===============

export async function hunterDomainSearch({ apiKey, company, domain, limit = 10 }) {
  if (!apiKey) throw new Error('未配置 Hunter API Key');
  const params = new URLSearchParams({ api_key: apiKey, limit: String(limit) });
  if (domain) params.set('domain', domain);
  else if (company) params.set('company', company);
  else throw new Error('需要 company 或 domain');

  const res = await fetch(`https://api.hunter.io/v2/domain-search?${params.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Hunter ${res.status}: ${data?.errors?.[0]?.details || JSON.stringify(data)}`);
  }
  return data.data || {};
}

// =============== Google Maps Places (New API) ===============

export async function googleMapsTextSearch({ apiKey, query, max = 5 }) {
  if (!apiKey) throw new Error('未配置 Google Maps API Key');
  if (!query) throw new Error('查询关键词为空');

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.internationalPhoneNumber',
        'places.nationalPhoneNumber',
        'places.websiteUri',
        'places.googleMapsUri',
        'places.types',
        'places.businessStatus',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query, pageSize: max }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Google Maps ${res.status}: ${data?.error?.message || JSON.stringify(data)}`);
  }
  return data.places || [];
}

// =============== xAI Grok (OpenAI-compatible) ===============

export async function grokAnalyze({ apiKey, prompt, apiBase, model = 'grok-2-latest' }) {
  if (!apiKey) throw new Error('未配置 Grok API Key');

  // 优先用 Worker 代理（避开 CORS）；没设代理则直连（多半会 CORS 失败）
  const endpoint = apiBase
    ? `${trimSlash(apiBase)}/grok/v1/chat/completions`
    : 'https://api.x.ai/v1/chat/completions';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            '你是一名外贸客户开发顾问。基于客户名称、海关交易记录、邮箱信息、地理位置等多源情报，给出可落地的客户洞察：公司背景、采购规律、决策人推断、切入策略。回答用中文，结构化输出。',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.4,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Grok ${res.status}: ${data?.error?.message || JSON.stringify(data)}`);
  }
  return data.choices?.[0]?.message?.content || '(empty)';
}

// =============== 综合分析提示词构造 ===============

export function buildEnrichmentPrompt(lead, sampleRecords, hunterData, mapsData) {
  const lines = [];
  lines.push(`# 客户情报综合分析`);
  lines.push(`目标公司：**${lead.importer}**`);
  lines.push('');
  lines.push(`## 海关交易概览`);
  lines.push(`- 出货记录：${lead.shipments} 笔`);
  lines.push(`- 累计金额：USD ${Math.round(lead.totalUSD).toLocaleString()}`);
  lines.push(`- 合作过的供应商：${lead.uniqueExporters} 家`);
  lines.push(`- 涉及产品类别：约 ${lead.productSpread} 种`);
  lines.push('');

  if (sampleRecords?.length) {
    lines.push(`## 近期出货样本（${sampleRecords.length} 条）`);
    sampleRecords.slice(0, 5).forEach((r) => {
      lines.push(
        `- ${r.Dates || '—'} · 出口商 ${r.Exporter1 || '—'} · ${r.ProductDesc1 || '—'} · USD ${r.TotalPrice || '—'}`,
      );
    });
    lines.push('');
  }

  if (hunterData?.organization || hunterData?.emails?.length) {
    lines.push(`## Hunter 邮箱情报`);
    if (hunterData.organization) lines.push(`- 公司：${hunterData.organization}`);
    if (hunterData.domain) lines.push(`- 域名：${hunterData.domain}`);
    if (hunterData.industry) lines.push(`- 行业：${hunterData.industry}`);
    if (hunterData.country) lines.push(`- 国家：${hunterData.country}`);
    if (hunterData.emails?.length) {
      lines.push(`- 关键联系人（Top ${Math.min(5, hunterData.emails.length)}）：`);
      hunterData.emails.slice(0, 5).forEach((e) => {
        const name = [e.first_name, e.last_name].filter(Boolean).join(' ') || '(no name)';
        const pos = e.position || '(no title)';
        lines.push(`  - ${name} | ${pos} | ${e.value} | confidence ${e.confidence}%`);
      });
    }
    lines.push('');
  }

  if (mapsData?.length) {
    lines.push(`## Google Maps 地理情报`);
    mapsData.slice(0, 3).forEach((p) => {
      lines.push(`- **${p.displayName?.text || '(no name)'}**`);
      if (p.formattedAddress) lines.push(`  - 地址：${p.formattedAddress}`);
      if (p.internationalPhoneNumber) lines.push(`  - 电话：${p.internationalPhoneNumber}`);
      if (p.websiteUri) lines.push(`  - 网站：${p.websiteUri}`);
      if (p.businessStatus) lines.push(`  - 状态：${p.businessStatus}`);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('请基于以上多源情报输出：');
  lines.push('1. **公司画像**：规模、行业定位、采购特征（从交易频次和金额推断）');
  lines.push('2. **决策链推测**：根据 Hunter 邮箱里的职位，标出最可能拍板的 1-3 人');
  lines.push('3. **切入策略**：基于他们的供应商分布和产品组合，给出具体的开发话术或产品组合建议');
  lines.push('4. **风险提示**：是否有信号表明账期长、退单多、采购冻结等');
  lines.push('5. **下一步行动**：3 条具体的 To-Do（电话/邮件/见面/调研）');

  return lines.join('\n');
}
