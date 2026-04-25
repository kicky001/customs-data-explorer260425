// 287 个数据源，来源：https://cd.210k.cc/doc
// 字段：sid / name / type / transport / freq / range
// 分组：region (国家/地区) / cluster (大洲)

export const REGION_CLUSTERS = {
  '全球': '全球',
  '美国': '北美洲',
  '加拿大': '北美洲',
  '墨西哥': '北美洲',
  '波多黎各': '北美洲',
  '巴拿马': '中美洲',
  '哥斯达黎加': '中美洲',
  '危地马拉': '中美洲',
  '萨尔瓦多': '中美洲',
  '尼加拉瓜': '中美洲',
  '多米尼加': '中美洲',
  '中美洲': '中美洲',
  '阿根廷': '南美洲',
  '秘鲁': '南美洲',
  '玻利维亚': '南美洲',
  '智利': '南美洲',
  '巴西': '南美洲',
  '巴拉圭': '南美洲',
  '委内瑞拉': '南美洲',
  '圭亚那': '南美洲',
  '哥伦比亚': '南美洲',
  '厄瓜多尔': '南美洲',
  '乌拉圭': '南美洲',
  '中国': '亚洲',
  '印度': '亚洲',
  '越南': '亚洲',
  '巴基斯坦': '亚洲',
  '印度尼西亚': '亚洲',
  '泰国': '亚洲',
  '马来西亚': '亚洲',
  '菲律宾': '亚洲',
  '韩国': '亚洲',
  '孟加拉国': '亚洲',
  '乌兹别克斯坦': '亚洲',
  '哈萨克斯坦': '亚洲',
  '斯里兰卡': '亚洲',
  '日本': '亚洲',
  '阿富汗': '亚洲',
  '亚美尼亚': '亚洲',
  '蒙古国': '亚洲',
  '伊朗': '亚洲',
  '巴勒斯坦': '亚洲',
  '新加坡': '亚洲',
  '马尔代夫': '亚洲',
  '欧亚经济联盟': '欧亚',
  '俄罗斯': '欧亚',
  '土耳其': '欧亚',
  '独联体': '欧亚',
  '乌克兰': '欧洲',
  '西班牙': '欧洲',
  '欧盟': '欧洲',
  '摩尔多瓦': '欧洲',
  '英国': '欧洲',
  '科索沃': '欧洲',
  '马拉维': '非洲',
  '赞比亚': '非洲',
  '莱索托': '非洲',
  '肯尼亚': '非洲',
  '纳米比亚': '非洲',
  '科特迪瓦': '非洲',
  '津巴布韦': '非洲',
  '布隆迪': '非洲',
  '尼日尔': '非洲',
  '尼日利亚': '非洲',
  '安哥拉': '非洲',
  '塞内加尔': '非洲',
  '埃塞俄比亚': '非洲',
  '坦桑尼亚': '非洲',
  '圣多美和普林西比': '非洲',
  '喀麦隆': '非洲',
  '卢旺达': '非洲',
  '博茨瓦纳': '非洲',
  '南非': '非洲',
  '加纳': '非洲',
  '利比里亚': '非洲',
  '乍得': '非洲',
  '乌干达': '非洲',
  '刚果(金)': '非洲',
  '非洲自贸区': '非洲',
  '澳大利亚': '大洋洲',
  '新西兰': '大洋洲',
  '斐济': '大洋洲',
  '危险品提单': '专题',
  '环球海运': '专题',
};

export const DATA_SOURCES = [
  // 全球
  { sid: '994', name: '全球统计进口(年度)', type: '统计数据', transport: '全运输', freq: '按周更新', range: '1962-2025', region: '全球' },
  { sid: '996', name: '全球统计进口(月度)', type: '统计数据', transport: '全运输', freq: '按周更新', range: '202001-202602', region: '全球' },
  { sid: '995', name: '全球统计出口(年度)', type: '统计数据', transport: '全运输', freq: '按周更新', range: '1962-2025', region: '全球' },
  { sid: '997', name: '全球统计出口(月度)', type: '统计数据', transport: '全运输', freq: '按周更新', range: '202001-202602', region: '全球' },
  // 美国
  { sid: '100', name: '美国', type: '提单数据', transport: '海运', freq: '按天更新', range: '201401-202603', region: '美国' },
  { sid: '101', name: '美国新版', type: '名录数据', transport: '全运输', freq: '按月更新', range: '201201-202602', region: '美国' },
  { sid: '107', name: '美国进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '美国' },
  { sid: '102', name: '美国船东提单', type: '提单数据', transport: '海运', freq: '按天更新', range: '202301-202603', region: '美国' },
  { sid: '103', name: '美国出口', type: '提单数据', transport: '海运', freq: '按月更新', range: '201401-202601', region: '美国' },
  { sid: '105', name: '美国出口新版', type: '提单数据', transport: '海运', freq: '一次性提供', range: '201601-202306', region: '美国' },
  { sid: '109', name: '美国出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '美国' },
  // 墨西哥
  { sid: '501', name: '墨西哥', type: '关单数据', transport: '全运输', freq: '每月更新两次', range: '202401-202603', region: '墨西哥' },
  { sid: '495', name: '墨西哥新版', type: '关单数据', transport: '全运输', freq: '一次性更新', range: '201601-202409', region: '墨西哥' },
  { sid: '498', name: '墨西哥海运', type: '关单数据', transport: '海运', freq: '按月更新', range: '201201-202601', region: '墨西哥' },
  { sid: '492', name: '墨西哥空运', type: '关单数据', transport: '空运', freq: '一次性更新', range: '202301-202412', region: '墨西哥' },
  { sid: '491', name: '墨西哥旧版', type: '关单数据', transport: '全运输', freq: '一次性更新', range: '201201-202409', region: '墨西哥' },
  { sid: '497', name: '墨西哥补充版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201601-201711', region: '墨西哥' },
  { sid: '502', name: '墨西哥发票', type: '关单发票数据', transport: '全运输', freq: '按月更新', range: '202401-202603', region: '墨西哥' },
  { sid: '503', name: '墨西哥出口', type: '关单数据', transport: '全运输', freq: '每月更新两次', range: '202401-202603', region: '墨西哥' },
  { sid: '499', name: '墨西哥海运出口', type: '关单数据', transport: '海运', freq: '按月更新', range: '201201-202601', region: '墨西哥' },
  { sid: '494', name: '墨西哥空运出口', type: '关单数据', transport: '空运', freq: '一次性更新', range: '202301-202412', region: '墨西哥' },
  { sid: '493', name: '墨西哥旧版出口', type: '关单数据', transport: '全运输', freq: '一次性更新', range: '201201-202409', region: '墨西哥' },
  { sid: '504', name: '墨西哥发票出口', type: '关单发票数据', transport: '全运输', freq: '按月更新', range: '202401-202603', region: '墨西哥' },
  // 加拿大
  { sid: '361', name: '加拿大进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202512', region: '加拿大' },
  { sid: '360', name: '加拿大', type: '名录数据', transport: '全运输', freq: '年度更新', range: '2015-2021', region: '加拿大' },
  { sid: '363', name: '加拿大出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202512', region: '加拿大' },
  // 澳大利亚
  { sid: '151', name: '澳大利亚进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '202101-202601', region: '澳大利亚' },
  { sid: '153', name: '澳大利亚出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '202101-202601', region: '澳大利亚' },
  // 新西兰
  { sid: '811', name: '新西兰进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201501-202602', region: '新西兰' },
  { sid: '813', name: '新西兰出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201501-202602', region: '新西兰' },
  // 巴拿马
  { sid: '161', name: '科隆自贸区进口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '巴拿马' },
  { sid: '250', name: '巴拿马', type: '关单数据', transport: '全运输', freq: '按周更新', range: '200901-202602', region: '巴拿马' },
  { sid: '251', name: '巴拿马旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202505', region: '巴拿马' },
  { sid: '252', name: '巴拿马海运提单', type: '提单数据', transport: '海运', freq: '按月更新', range: '201501-202602', region: '巴拿马' },
  { sid: '163', name: '科隆自贸区出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '巴拿马' },
  { sid: '253', name: '巴拿马出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201401-202602', region: '巴拿马' },
  { sid: '255', name: '巴拿马出口旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202505', region: '巴拿马' },
  { sid: '254', name: '巴拿马海运提单出口', type: '提单数据', transport: '海运', freq: '按月更新', range: '201501-202602', region: '巴拿马' },
  // 哥斯达黎加
  { sid: '560', name: '哥斯达黎加', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201401-202603', region: '哥斯达黎加' },
  { sid: '561', name: '哥斯达黎加旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-201709', region: '哥斯达黎加' },
  { sid: '565', name: '哥斯达黎加转口旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-201709', region: '哥斯达黎加' },
  { sid: '567', name: '哥斯达黎加出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201501-202603', region: '哥斯达黎加' },
  { sid: '563', name: '哥斯达黎加出口旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-201709', region: '哥斯达黎加' },
  // 危地马拉
  { sid: '711', name: '危地马拉进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '危地马拉' },
  { sid: '710', name: '危地马拉', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201801-202602', region: '危地马拉' },
  { sid: '714', name: '危地马拉出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '危地马拉' },
  { sid: '713', name: '危地马拉出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-201909', region: '危地马拉' },
  // 萨尔瓦多
  { sid: '450', name: '萨尔瓦多', type: '关单数据', transport: '全运输', freq: '工作日按天更新', range: '200801-202603', region: '萨尔瓦多' },
  // 斐济
  { sid: '891', name: '斐济', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202110', region: '斐济' },
  { sid: '893', name: '斐济出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202110', region: '斐济' },
  // 尼加拉瓜
  { sid: '786', name: '尼加拉瓜新版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202101-202603', region: '尼加拉瓜' },
  { sid: '785', name: '尼加拉瓜', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202101-202403', region: '尼加拉瓜' },
  { sid: '788', name: '尼加拉瓜新版出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202101-202603', region: '尼加拉瓜' },
  { sid: '787', name: '尼加拉瓜出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202101-202403', region: '尼加拉瓜' },
  // 波多黎各
  { sid: '941', name: '波多黎各进口统计', type: '统计数据', transport: '全运输', freq: '按季度更新', range: '200207-202510', region: '波多黎各' },
  { sid: '943', name: '波多黎各出口统计', type: '统计数据', transport: '全运输', freq: '按季度更新', range: '200207-202510', region: '波多黎各' },
  // 多米尼加
  { sid: '201', name: '多米尼加', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202101-202602', region: '多米尼加' },
  { sid: '203', name: '多米尼加出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202101-202602', region: '多米尼加' },
  // 阿根廷
  { sid: '540', name: '阿根廷', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201001-202601', region: '阿根廷' },
  { sid: '542', name: '阿根廷快版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202001-202602', region: '阿根廷' },
  { sid: '543', name: '阿根廷出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '阿根廷' },
  // 秘鲁
  { sid: '550', name: '秘鲁', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201101-202603', region: '秘鲁' },
  { sid: '556', name: '秘鲁快版', type: '关单数据', transport: '全运输', freq: '按天更新', range: '201401-202603', region: '秘鲁' },
  { sid: '557', name: '秘鲁空运提单', type: '提单数据', transport: '空运', freq: '一次性提供', range: '201801-201912', region: '秘鲁' },
  { sid: '559', name: '秘鲁海运提单', type: '提单数据', transport: '海运', freq: '一次性提供', range: '201801-201910', region: '秘鲁' },
  { sid: '553', name: '秘鲁出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201501-202602', region: '秘鲁' },
  // 玻利维亚
  { sid: '485', name: '玻利维亚快版', type: '关单数据', transport: '全运输', freq: '半周更新', range: '201401-202603', region: '玻利维亚' },
  { sid: '482', name: '玻利维亚新版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202501-202603', region: '玻利维亚' },
  { sid: '486', name: '玻利维亚进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201001-202512', region: '玻利维亚' },
  { sid: '481', name: '玻利维亚旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-201808', region: '玻利维亚' },
  { sid: '483', name: '玻利维亚快版出口', type: '关单数据', transport: '全运输', freq: '按天更新', range: '201401-202603', region: '玻利维亚' },
  { sid: '484', name: '玻利维亚新版出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202501-202603', region: '玻利维亚' },
  { sid: '487', name: '玻利维亚出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201001-202512', region: '玻利维亚' },
  // 智利
  { sid: '211', name: '智利新版', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '202401-202603', region: '智利' },
  { sid: '212', name: '智利空运', type: '关单数据', transport: '空运', freq: '不定期更新', range: '202504-202603', region: '智利' },
  { sid: '210', name: '智利', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200801-202601', region: '智利' },
  { sid: '213', name: '智利出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '智利' },
  // 巴西
  { sid: '294', name: '巴西', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202203-202511', region: '巴西' },
  { sid: '301', name: '巴西空运提单', type: '提单数据', transport: '空运', freq: '一次性提供', range: '202401-202510', region: '巴西' },
  { sid: '291', name: '巴西进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '巴西' },
  { sid: '298', name: '巴西提单', type: '提单数据', transport: '海运', freq: '一次性提供', range: '201901-202512', region: '巴西' },
  { sid: '297', name: '巴西旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201601-202111', region: '巴西' },
  { sid: '290', name: '巴西2009', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '200901-200912', region: '巴西' },
  { sid: '292', name: '巴西零售', type: '', transport: '', freq: '', range: '202112-202410', region: '巴西' },
  { sid: '293', name: '巴西出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '巴西' },
  { sid: '295', name: '巴西旧版出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201601-202110', region: '巴西' },
  { sid: '299', name: '巴西提单出口', type: '提单数据', transport: '海运', freq: '一次性提供', range: '201901-202511', region: '巴西' },
  { sid: '296', name: '巴西出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202201-202510', region: '巴西' },
  // 巴拉圭
  { sid: '115', name: '巴拉圭新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202201-202602', region: '巴拉圭' },
  { sid: '111', name: '巴拉圭', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202208', region: '巴拉圭' },
  { sid: '117', name: '巴拉圭出口新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202201-202602', region: '巴拉圭' },
  { sid: '113', name: '巴拉圭出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202208', region: '巴拉圭' },
  // 委内瑞拉
  { sid: '414', name: '委内瑞拉提单', type: '提单数据', transport: '海运、空运', freq: '按月更新', range: '201901-202508', region: '委内瑞拉' },
  { sid: '410', name: '委内瑞拉', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '200901-202408', region: '委内瑞拉' },
  { sid: '417', name: '委内瑞拉提单出口', type: '提单数据', transport: '海运、空运', freq: '按月更新', range: '201901-202508', region: '委内瑞拉' },
  { sid: '413', name: '委内瑞拉出口', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201401-202408', region: '委内瑞拉' },
  // 圭亚那
  { sid: '935', name: '圭亚那', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202210', region: '圭亚那' },
  { sid: '937', name: '圭亚那出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201905-202210', region: '圭亚那' },
  // 哥伦比亚
  { sid: '238', name: '哥伦比亚新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202401-202601', region: '哥伦比亚' },
  { sid: '230', name: '哥伦比亚', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '200801-202404', region: '哥伦比亚' },
  { sid: '235', name: '哥伦比亚旧版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200801-202211', region: '哥伦比亚' },
  { sid: '237', name: '哥伦比亚出口旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '200601-202212', region: '哥伦比亚' },
  { sid: '233', name: '哥伦比亚出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-201806', region: '哥伦比亚' },
  // 厄瓜多尔
  { sid: '530', name: '厄瓜多尔', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200801-202603', region: '厄瓜多尔' },
  { sid: '532', name: '厄瓜多尔进口快版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202201-202603', region: '厄瓜多尔' },
  { sid: '535', name: '厄瓜多尔空运提单', type: '提单数据', transport: '空运', freq: '一次性提供', range: '202001-202112', region: '厄瓜多尔' },
  { sid: '538', name: '厄瓜多尔海运提单', type: '海运提单', transport: '海运', freq: '一次性提供', range: '202001-202112', region: '厄瓜多尔' },
  { sid: '534', name: '厄瓜多尔出口快版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202201-202603', region: '厄瓜多尔' },
  { sid: '533', name: '厄瓜多尔出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '厄瓜多尔' },
  { sid: '536', name: '厄瓜多尔空运提单出口', type: '提单数据', transport: '空运', freq: '一次性提供', range: '202001-202112', region: '厄瓜多尔' },
  { sid: '539', name: '厄瓜多尔海运提单出口', type: '提单数据', transport: '海运', freq: '一次性提供', range: '202001-202112', region: '厄瓜多尔' },
  // 乌拉圭
  { sid: '281', name: '乌拉圭', type: '关单数据', transport: '全运输', freq: '按天更新', range: '201401-202603', region: '乌拉圭' },
  { sid: '285', name: '乌拉圭转口', type: '关单数据', transport: '全运输', freq: '按天更新', range: '201401-202603', region: '乌拉圭' },
  { sid: '282', name: '乌拉圭进口提单', type: '提单数据', transport: '全运输', freq: '一次性提供', range: '201501-202405', region: '乌拉圭' },
  { sid: '283', name: '乌拉圭出口', type: '关单数据', transport: '全运输', freq: '按天更新', range: '201401-202603', region: '乌拉圭' },
  { sid: '284', name: '乌拉圭出口提单', type: '提单数据', transport: '全运输', freq: '一次性提供', range: '201501-202405', region: '乌拉圭' },
  // 中国
  { sid: '601', name: '中国进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '中国' },
  { sid: '465', name: '中国台湾进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202512', region: '中国' },
  { sid: '460', name: '中国台湾', type: '名录数据', transport: '全运输', freq: '一次性提供', range: '', region: '中国' },
  { sid: '405', name: '中越双边进口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201701-202012', region: '中国' },
  { sid: '603', name: '中国出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '中国' },
  { sid: '467', name: '中国台湾出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201901-202512', region: '中国' },
  { sid: '463', name: '中国台湾出口', type: '名录数据', transport: '全运输', freq: '一次性提供', range: '', region: '中国' },
  { sid: '407', name: '中越双边出口', type: '详细关单', transport: '全运输', freq: '一次性提供', range: '201801-202102', region: '中国' },
  // 印度
  { sid: '421', name: '印度', type: '关单数据', transport: '全运输', freq: '每十天更新', range: '201401-202603', region: '印度' },
  { sid: '431', name: '印度快版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201901-202603', region: '印度' },
  { sid: '423', name: '印度空运', type: '特殊数据', transport: '空运', freq: '按月更新', range: '202201-202512', region: '印度' },
  { sid: '435', name: '印度经济特区', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201901-202602', region: '印度' },
  { sid: '510', name: '印度出口', type: '关单数据', transport: '全运输', freq: '每十天更新', range: '201401-202603', region: '印度' },
  { sid: '433', name: '印度快版出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201901-202603', region: '印度' },
  { sid: '425', name: '印度空运出口', type: '特殊数据', transport: '空运', freq: '按月更新', range: '201601-202509', region: '印度' },
  { sid: '437', name: '印度经济特区出口', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '202101-202602', region: '印度' },
  // 越南
  { sid: '401', name: '越南', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201601-202602', region: '越南' },
  { sid: '403', name: '越南出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201601-202602', region: '越南' },
  // 巴基斯坦
  { sid: '520', name: '巴基斯坦关单', type: '关单数据', transport: '全运输', freq: '每月两更', range: '201401-202603', region: '巴基斯坦' },
  { sid: '130', name: '巴基斯坦海运提单', type: '提单数据', transport: '海运', freq: '按月更新', range: '200801-202512', region: '巴基斯坦' },
  { sid: '311', name: '巴基斯坦空运提单', type: '提单数据', transport: '空运', freq: '不定期更新', range: '202212-202305', region: '巴基斯坦' },
  { sid: '310', name: '巴基斯坦提单', type: '提单数据', transport: '海运、空运', freq: '一次性提供', range: '200801-202108', region: '巴基斯坦' },
  { sid: '523', name: '巴基斯坦关单出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '巴基斯坦' },
  { sid: '527', name: '巴基斯坦出口新版', type: '提单数据', transport: '海运、空运', freq: '一次性提供', range: '202202-202407', region: '巴基斯坦' },
  // 印度尼西亚
  { sid: '722', name: '印度尼西亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '印度尼西亚' },
  { sid: '725', name: '印度尼西亚新版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202301-202407', region: '印度尼西亚' },
  { sid: '720', name: '印度尼西亚旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201807-202109', region: '印度尼西亚' },
  { sid: '721', name: '印尼零售', type: '', transport: '', freq: '', range: '202310-202310', region: '印度尼西亚' },
  { sid: '724', name: '印度尼西亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202101-202602', region: '印度尼西亚' },
  { sid: '727', name: '印度尼西亚新版出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202301-202407', region: '印度尼西亚' },
  { sid: '723', name: '印度尼西亚旧版出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201807-202109', region: '印度尼西亚' },
  // 泰国
  { sid: '862', name: '泰国进口关单', type: '关单数据', transport: '全运输', freq: '每月两更', range: '202101-202505', region: '泰国' },
  { sid: '865', name: '泰国进口海运提单', type: '提单', transport: '海运', freq: '每月两更', range: '201911-202505', region: '泰国' },
  { sid: '861', name: '泰国进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '202001-202412', region: '泰国' },
  { sid: '864', name: '泰国出口关单', type: '关单数据', transport: '全运输', freq: '每月两更', range: '202105-202505', region: '泰国' },
  { sid: '867', name: '泰国出口海运提单', type: '提单数据', transport: '海运', freq: '每月两更', range: '201911-202505', region: '泰国' },
  { sid: '868', name: '泰国出口新版', type: '特殊数据', transport: '全运输', freq: '按天更新', range: '202301-202603', region: '泰国' },
  { sid: '863', name: '泰国出口统计', type: '统计数据+名录', transport: '全运输', freq: '按月更新', range: '202012-202412', region: '泰国' },
  // 土耳其
  { sid: '932', name: '土耳其新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202511', region: '土耳其' },
  { sid: '936', name: '土耳其保税区', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202408-202409', region: '土耳其' },
  { sid: '931', name: '土耳其', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202511', region: '土耳其' },
  { sid: '934', name: '土耳其新版出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200101-202511', region: '土耳其' },
  { sid: '933', name: '土耳其出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202001-202511', region: '土耳其' },
  { sid: '672', name: '土耳其过境', type: '过境数据', transport: '陆运', freq: '按月更新', range: '202301-202602', region: '土耳其' },
  // 马来西亚
  { sid: '331', name: '马来西亚', type: '关单数据', transport: '全运输', freq: '每月两次', range: '202301-202602', region: '马来西亚' },
  { sid: '333', name: '马来西亚出口', type: '关单数据', transport: '全运输', freq: '每月两次', range: '202301-202602', region: '马来西亚' },
  // 菲律宾
  { sid: '571', name: '菲律宾新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202603', region: '菲律宾' },
  { sid: '570', name: '菲律宾', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201501-202601', region: '菲律宾' },
  { sid: '573', name: '菲律宾出口新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202603', region: '菲律宾' },
  { sid: '572', name: '菲律宾出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202201-202601', region: '菲律宾' },
  // 韩国
  { sid: '170', name: '韩国', type: '名录数据+卫生数据', transport: '全运输', freq: '一次性+按周更新', range: '200901-202603', region: '韩国' },
  { sid: '871', name: '韩国进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '200401-202408', region: '韩国' },
  { sid: '873', name: '韩国出口统计', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200401-202408', region: '韩国' },
  // 孟加拉国
  { sid: '831', name: '孟加拉', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '孟加拉国' },
  { sid: '833', name: '孟加拉出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '孟加拉国' },
  // 乌兹别克斯坦
  { sid: '631', name: '乌兹别克斯坦新版', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '202401-202602', region: '乌兹别克斯坦' },
  { sid: '630', name: '乌兹别克斯坦', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202312', region: '乌兹别克斯坦' },
  { sid: '632', name: '乌兹别克斯坦出口新版', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '202401-202602', region: '乌兹别克斯坦' },
  { sid: '633', name: '乌兹别克斯坦出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202210', region: '乌兹别克斯坦' },
  // 哈萨克斯坦
  { sid: '640', name: '哈萨克斯坦', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201401-202603', region: '哈萨克斯坦' },
  { sid: '643', name: '哈萨克斯坦出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '201401-202603', region: '哈萨克斯坦' },
  // 斯里兰卡
  { sid: '660', name: '斯里兰卡', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '斯里兰卡' },
  { sid: '661', name: '斯里兰卡2', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202503-202506', region: '斯里兰卡' },
  { sid: '663', name: '斯里兰卡出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '斯里兰卡' },
  { sid: '662', name: '斯里兰卡2出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202503-202506', region: '斯里兰卡' },
  // 日本
  { sid: '761', name: '日本进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '日本' },
  { sid: '764', name: '日本空运进口统计', type: '统计数据', transport: '空运', freq: '按月更新', range: '201401-202602', region: '日本' },
  { sid: '766', name: '日本海运进口统计', type: '统计数据', transport: '海运', freq: '按月更新', range: '201401-202602', region: '日本' },
  { sid: '763', name: '日本出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '日本' },
  { sid: '765', name: '日本空运出口统计', type: '统计数据', transport: '空运', freq: '按月更新', range: '201401-202602', region: '日本' },
  { sid: '767', name: '日本海运出口统计', type: '统计数据', transport: '海运', freq: '按月更新', range: '201401-202602', region: '日本' },
  // 阿富汗
  { sid: '300', name: '阿富汗', type: '提单数据', transport: '海运（含转陆运）', freq: '按月更新', range: '200801-202512', region: '阿富汗' },
  // 欧亚经济联盟
  { sid: '342', name: '欧亚经济联盟新版', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202401-202602', region: '欧亚经济联盟' },
  { sid: '341', name: '欧亚经济联盟', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202201-202307', region: '欧亚经济联盟' },
  { sid: '344', name: '欧亚经济联盟新版出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202401-202602', region: '欧亚经济联盟' },
  { sid: '343', name: '欧亚经济联盟出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202201-202307', region: '欧亚经济联盟' },
  // 亚美尼亚
  { sid: '951', name: '亚美尼亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201705-202602', region: '亚美尼亚' },
  { sid: '953', name: '亚美尼亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201705-202602', region: '亚美尼亚' },
  // 蒙古国
  { sid: '371', name: '蒙古国', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202501-202602', region: '蒙古国' },
  { sid: '373', name: '蒙古国出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202501-202602', region: '蒙古国' },
  // 伊朗
  { sid: '381', name: '伊朗', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202501-202601', region: '伊朗' },
  { sid: '383', name: '伊朗出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202501-202601', region: '伊朗' },
  // 巴勒斯坦
  { sid: '391', name: '巴勒斯坦', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201501-202602', region: '巴勒斯坦' },
  // 新加坡
  { sid: '471', name: '新加坡', type: '关单数据', transport: '全运输', freq: '一次性更新', range: '201901-201912', region: '新加坡' },
  { sid: '473', name: '新加坡出口', type: '关单数据', transport: '全运输', freq: '一次性更新', range: '201901-201912', region: '新加坡' },
  // 马尔代夫
  { sid: '131', name: '马尔代夫', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202101-202602', region: '马尔代夫' },
  { sid: '133', name: '马尔代夫出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202101-202602', region: '马尔代夫' },
  // 俄罗斯
  { sid: '126', name: '俄罗斯', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202101-202504', region: '俄罗斯', recommended: true },
  { sid: '125', name: '俄罗斯铁路', type: '铁路数据', transport: '铁路运输', freq: '按周更新', range: '201901-202603', region: '俄罗斯', recommended: true },
  { sid: '128', name: '俄罗斯新版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202301-202312', region: '俄罗斯', recommended: true },
  { sid: '121', name: '俄罗斯旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202312', region: '俄罗斯' },
  { sid: '127', name: '俄罗斯出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202101-202503', region: '俄罗斯' },
  { sid: '129', name: '俄罗斯出口新版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202301-202312', region: '俄罗斯' },
  { sid: '123', name: '俄罗斯旧版出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201401-202312', region: '俄罗斯' },
  // 乌克兰
  { sid: '140', name: '乌克兰', type: '关单数据', transport: '全运输', freq: '按月更新', range: '200801-202602', region: '乌克兰' },
  { sid: '143', name: '乌克兰出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201501-202602', region: '乌克兰' },
  // 西班牙
  { sid: '351', name: '西班牙', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '西班牙' },
  { sid: '353', name: '西班牙出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '西班牙' },
  // 欧盟
  { sid: '650', name: '欧盟进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '欧盟' },
  { sid: '653', name: '欧盟出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '欧盟' },
  // 摩尔多瓦
  { sid: '321', name: '摩尔多瓦', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201801-202303', region: '摩尔多瓦' },
  { sid: '320', name: '摩尔多瓦2010', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '200901-201012', region: '摩尔多瓦' },
  { sid: '323', name: '摩尔多瓦出口', type: '关单数据', transport: '全运输', freq: '不定期更新', range: '201801-202303', region: '摩尔多瓦' },
  // 英国
  { sid: '180', name: '英国', type: '名录数据', transport: '全运输', freq: '按月更新', range: '200801-202601', region: '英国' },
  { sid: '181', name: '英国进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '202201-202601', region: '英国' },
  { sid: '183', name: '英国出口', type: '名录数据', transport: '全运输', freq: '按月更新', range: '201601-202601', region: '英国' },
  { sid: '182', name: '英国出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '202201-202601', region: '英国' },
  // 科索沃
  { sid: '441', name: '科索沃', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201512-202209', region: '科索沃' },
  { sid: '443', name: '科索沃出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201807-202209', region: '科索沃' },
  // 马拉维
  { sid: '591', name: '马拉维', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '马拉维' },
  { sid: '593', name: '马拉维出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '马拉维' },
  // 赞比亚
  { sid: '911', name: '赞比亚', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202312', region: '赞比亚' },
  { sid: '913', name: '赞比亚出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202312', region: '赞比亚' },
  // 莱索托
  { sid: '821', name: '莱索托', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '莱索托' },
  { sid: '823', name: '莱索托出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '莱索托' },
  // 肯尼亚
  { sid: '742', name: '肯尼亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '肯尼亚' },
  { sid: '744', name: '肯尼亚过境', type: '过境数据', transport: '陆运', freq: '按月更新', range: '202201-202602', region: '肯尼亚' },
  { sid: '741', name: '肯尼亚旧版', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202205', region: '肯尼亚' },
  { sid: '743', name: '肯尼亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202201-202602', region: '肯尼亚' },
  // 纳米比亚
  { sid: '901', name: '纳米比亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '纳米比亚' },
  { sid: '903', name: '纳米比亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '纳米比亚' },
  // 科特迪瓦
  { sid: '921', name: '科特迪瓦', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '科特迪瓦' },
  { sid: '923', name: '科特迪瓦出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '科特迪瓦' },
  // 津巴布韦
  { sid: '881', name: '津巴布韦', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202307', region: '津巴布韦' },
  { sid: '883', name: '津巴布韦出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '202001-202307', region: '津巴布韦' },
  // 布隆迪
  { sid: '775', name: '布隆迪', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '布隆迪' },
  { sid: '777', name: '布隆迪出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202211', region: '布隆迪' },
  // 尼日尔
  { sid: '261', name: '尼日尔', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202211', region: '尼日尔' },
  { sid: '263', name: '尼日尔出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202211', region: '尼日尔' },
  // 尼日利亚
  { sid: '801', name: '尼日利亚', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202509', region: '尼日利亚' },
  { sid: '803', name: '尼日利亚出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201901-202509', region: '尼日利亚' },
  // 安哥拉
  { sid: '225', name: '安哥拉海运进口', type: '提单数据', transport: '海运', freq: '按月更新', range: '202101-202602', region: '安哥拉' },
  { sid: '221', name: '安哥拉进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201501-202504', region: '安哥拉' },
  { sid: '227', name: '安哥拉海运出口', type: '提单数据', transport: '海运', freq: '按月更新', range: '202101-202602', region: '安哥拉' },
  { sid: '223', name: '安哥拉出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201501-202504', region: '安哥拉' },
  // 塞内加尔
  { sid: '271', name: '塞内加尔', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202312', region: '塞内加尔' },
  { sid: '273', name: '塞内加尔出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202312', region: '塞内加尔' },
  // 埃塞俄比亚
  { sid: '690', name: '埃塞俄比亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201401-202602', region: '埃塞俄比亚' },
  { sid: '693', name: '埃塞俄比亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201701-202602', region: '埃塞俄比亚' },
  // 坦桑尼亚
  { sid: '752', name: '坦桑尼亚新版', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202201-202602', region: '坦桑尼亚' },
  { sid: '755', name: '坦桑尼亚新版过境', type: '过境数据', transport: '全运输', freq: '按周更新', range: '202201-202602', region: '坦桑尼亚' },
  { sid: '751', name: '坦桑尼亚', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202305', region: '坦桑尼亚' },
  { sid: '754', name: '坦桑尼亚新版出口', type: '关单数据', transport: '全运输', freq: '按周更新', range: '202201-202602', region: '坦桑尼亚' },
  { sid: '753', name: '坦桑尼亚出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202305', region: '坦桑尼亚' },
  // 圣多美和普林西比
  { sid: '581', name: '圣多美和普林西比', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '圣多美和普林西比' },
  { sid: '583', name: '圣多美和普林西比出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '圣多美和普林西比' },
  // 喀麦隆
  { sid: '191', name: '喀麦隆', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '喀麦隆' },
  { sid: '193', name: '喀麦隆出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201901-202602', region: '喀麦隆' },
  // 卢旺达
  { sid: '961', name: '卢旺达', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202201-202602', region: '卢旺达' },
  // 博茨瓦纳
  { sid: '791', name: '博茨瓦纳', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202511', region: '博茨瓦纳' },
  { sid: '793', name: '博茨瓦纳出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202511', region: '博茨瓦纳' },
  // 南非
  { sid: '851', name: '南非进口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '南非' },
  { sid: '853', name: '南非出口统计', type: '统计数据', transport: '全运输', freq: '按月更新', range: '201401-202601', region: '南非' },
  // 加纳
  { sid: '781', name: '加纳', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '加纳' },
  { sid: '783', name: '加纳出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202602', region: '加纳' },
  // 利比里亚
  { sid: '771', name: '利比里亚', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202601', region: '利比里亚' },
  { sid: '773', name: '利比里亚出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202601', region: '利比里亚' },
  // 乍得
  { sid: '241', name: '乍得', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202206', region: '乍得' },
  { sid: '243', name: '乍得出口', type: '关单数据', transport: '全运输', freq: '一次性提供', range: '201801-202206', region: '乍得' },
  // 乌干达
  { sid: '731', name: '乌干达', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201601-202601', region: '乌干达' },
  { sid: '735', name: '乌干达转口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201801-202601', region: '乌干达' },
  { sid: '733', name: '乌干达出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201601-202601', region: '乌干达' },
  // 刚果(金)
  { sid: '971', name: '刚果(金)', type: '关单数据', transport: '全运输', freq: '按月更新', range: '201601-202602', region: '刚果(金)' },
  { sid: '973', name: '刚果(金)出口', type: '关单数据', transport: '全运输', freq: '按月更新', range: '202501-202602', region: '刚果(金)' },
  // 非洲自贸区
  { sid: '981', name: '非洲自贸区', type: '关单数据', transport: '陆运', freq: '按月更新', range: '201901-202602', region: '非洲自贸区' },
  // 中美洲
  { sid: '621', name: '中美洲新版', type: '过境数据', transport: '陆运', freq: '不定期更新', range: '202201-202603', region: '中美洲' },
  { sid: '620', name: '中美洲', type: '过境数据', transport: '陆运', freq: '一次性提供', range: '201601-202101', region: '中美洲' },
  // 危险品提单
  { sid: '704', name: '危险品提单', type: '提单数据', transport: '海运', freq: '不定期更新', range: '202202-202603', region: '危险品提单' },
  // 环球海运
  { sid: '700', name: '环球海运', type: '海运提单', transport: '海运', freq: '不定期更新', range: '201601-202603', region: '环球海运' },
  { sid: '670', name: '欧亚航线', type: '提单数据', transport: '海运', freq: '一次性提供', range: '201501-202012', region: '环球海运' },
  // 独联体
  { sid: '680', name: '独联体', type: '过境数据', transport: '陆运', freq: '不定期更新', range: '201601-202411', region: '独联体' },
];

export function groupByRegion(sources) {
  const map = new Map();
  for (const s of sources) {
    if (!map.has(s.region)) map.set(s.region, []);
    map.get(s.region).push(s);
  }
  return map;
}

export function groupByCluster(sources) {
  const map = new Map();
  for (const s of sources) {
    const cluster = REGION_CLUSTERS[s.region] ?? '其他';
    if (!map.has(cluster)) map.set(cluster, new Map());
    const regionMap = map.get(cluster);
    if (!regionMap.has(s.region)) regionMap.set(s.region, []);
    regionMap.get(s.region).push(s);
  }
  return map;
}

export const SOURCE_BY_SID = Object.fromEntries(DATA_SOURCES.map((s) => [s.sid, s]));
