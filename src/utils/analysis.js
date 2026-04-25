// 基于查询结果的轻量分析（无外部 LLM 也能用）

function num(v) {
  if (v == null || v === '') return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function frequency(records, key) {
  const counts = new Map();
  for (const r of records) {
    const v = r?.[key];
    if (!v) continue;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function summarizePrices(records) {
  const prices = records.map((r) => num(r.UnitPrice)).filter((n) => n > 0);
  if (prices.length === 0) return null;
  prices.sort((a, b) => a - b);
  const sum = prices.reduce((s, n) => s + n, 0);
  return {
    count: prices.length,
    min: prices[0],
    max: prices[prices.length - 1],
    mean: sum / prices.length,
    median: prices[Math.floor(prices.length / 2)],
  };
}

function summarizeQty(records) {
  const totals = records.map((r) => num(r.TotalPrice)).filter((n) => n > 0);
  if (totals.length === 0) return null;
  const sum = totals.reduce((s, n) => s + n, 0);
  return {
    count: totals.length,
    grandTotalUSD: sum,
    avgOrderUSD: sum / totals.length,
  };
}

function timeline(records) {
  const map = new Map();
  for (const r of records) {
    const m = r?.Months || (r?.Dates ? r.Dates.replace(/-/g, '').slice(0, 6) : null);
    if (!m) continue;
    map.set(m, (map.get(m) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export function analyzeRecords(records) {
  if (!records || records.length === 0) return null;

  const topImporters = frequency(records, 'Importer1').slice(0, 8);
  const topExporters = frequency(records, 'Exporter1').slice(0, 8);
  const topHs = frequency(records, 'HSCODE').slice(0, 8);
  const topPorts = frequency(records, 'LdPort').slice(0, 6);
  const priceStats = summarizePrices(records);
  const qtyStats = summarizeQty(records);
  const monthly = timeline(records);

  // 客户决策线索：高频进口商通常意味着稳定采购通道
  const leads = topImporters.slice(0, 5).map(([name, count]) => {
    const recs = records.filter((r) => r.Importer1 === name);
    const totalUSD = recs.reduce((s, r) => s + num(r.TotalPrice), 0);
    const exporters = new Set(recs.map((r) => r.Exporter1).filter(Boolean));
    const products = new Set(recs.map((r) => r.ProductDesc1?.split(/[\s,;]+/)[0]).filter(Boolean));
    return {
      importer: name,
      shipments: count,
      totalUSD,
      uniqueExporters: exporters.size,
      productSpread: products.size,
      score: count * 0.4 + Math.log10(totalUSD + 1) * 30 + exporters.size * 5,
    };
  }).sort((a, b) => b.score - a.score);

  return {
    sampleSize: records.length,
    topImporters,
    topExporters,
    topHs,
    topPorts,
    priceStats,
    qtyStats,
    monthly,
    leads,
  };
}

// 把分析结果转成结构化文本（便于丢给 LLM 或直接展示）
export function buildAnalysisPrompt(keyword, analysis) {
  if (!analysis) return '';

  const lines = [];
  lines.push(`## 海关数据样本分析 — 关键词「${keyword}」`);
  lines.push(`样本量：${analysis.sampleSize} 条记录`);
  lines.push('');

  if (analysis.qtyStats) {
    lines.push(`### 总览`);
    lines.push(`- 累计金额：USD ${analysis.qtyStats.grandTotalUSD.toFixed(2)}`);
    lines.push(`- 平均单笔：USD ${analysis.qtyStats.avgOrderUSD.toFixed(2)}`);
    lines.push('');
  }

  if (analysis.priceStats) {
    lines.push(`### 单价区间（USD）`);
    lines.push(`- 最低 / 中位 / 最高：${analysis.priceStats.min.toFixed(2)} / ${analysis.priceStats.median.toFixed(2)} / ${analysis.priceStats.max.toFixed(2)}`);
    lines.push(`- 均值：${analysis.priceStats.mean.toFixed(2)}`);
    lines.push('');
  }

  if (analysis.topImporters.length) {
    lines.push(`### Top 进口商（按出货次数）`);
    analysis.topImporters.forEach(([name, n], i) => lines.push(`${i + 1}. ${name} — ${n} 次`));
    lines.push('');
  }
  if (analysis.topExporters.length) {
    lines.push(`### Top 出口商`);
    analysis.topExporters.forEach(([name, n], i) => lines.push(`${i + 1}. ${name} — ${n} 次`));
    lines.push('');
  }
  if (analysis.topHs.length) {
    lines.push(`### Top HS 编码`);
    analysis.topHs.forEach(([code, n], i) => lines.push(`${i + 1}. ${code} — ${n} 次`));
    lines.push('');
  }
  if (analysis.leads.length) {
    lines.push(`### 优先客户线索（自动评分）`);
    analysis.leads.forEach((l, i) => {
      lines.push(`${i + 1}. **${l.importer}**`);
      lines.push(`   - 出货 ${l.shipments} 次，累计 USD ${l.totalUSD.toFixed(0)}`);
      lines.push(`   - 合作过 ${l.uniqueExporters} 家供应商，产品类别约 ${l.productSpread} 种`);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('请基于以上数据，输出：');
  lines.push('1. 这个市场的核心买家集中度判断');
  lines.push('2. 推荐优先接触的 3 家客户及其切入角度');
  lines.push('3. 价格定位建议（参考分位数）');
  lines.push('4. HS 编码维度的产品策略');

  return lines.join('\n');
}
