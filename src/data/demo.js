// 演示模式假数据（无 token 可用）

const SAMPLE_PRODUCTS = [
  'PAMASI S.A.S. - LED LIGHT STRIPS 5050 SMD WHITE',
  'SOLAR PANEL 450W MONOCRYSTALLINE PV MODULE',
  'STAINLESS STEEL KITCHEN SINK SUS304',
  'PORCELAIN FLOOR TILES 600X600 MATTE FINISH',
  'BLUETOOTH WIRELESS EARPHONES TWS PRO',
  'INDUSTRIAL AIR COMPRESSOR 7.5KW BELT DRIVEN',
  'COTTON KNITTED FABRIC 32S SINGLE JERSEY',
  'PVC PIPE FITTINGS DN50 PRESSURE 1.0MPA',
  'SMART PHONE TEMPERED GLASS SCREEN PROTECTOR',
  'AUTOMOTIVE LITHIUM BATTERY 100AH 12V',
  'STAINLESS STEEL THERMOS BOTTLE 500ML',
  'OUTDOOR LED FLOOD LIGHT 50W IP65',
  'CERAMIC SANITARY WARE TOILET BOWL',
  'HOME APPLIANCE CONTROL BOARD PCB ASSEMBLY',
  'MEN S COTTON T-SHIRT ROUND NECK 180GSM',
  'GARDEN TOOLS SET PRUNING SHEARS 8 INCH',
  'POLYESTER ZIPPER NO 5 CLOSE END',
  'WIRE HARNESS AUTOMOTIVE 8 PIN CONNECTOR',
  'POWER BANK 20000MAH FAST CHARGE PD20W',
  'RUBBER GASKET NBR O-RING SEAL',
];

const SAMPLE_IMPORTERS = [
  'GLOBAL SOURCING LLC',
  'PACIFIC TRADING INC',
  'NORTHERN LIGHT IMPORTS',
  'BLUE OCEAN INDUSTRIES',
  'EMERALD VALLEY DISTRIBUTORS',
  'SUMMIT TRADE CORP',
  'CRESCENT MOON IMPORTS',
  'SILVERLINE ENTERPRISES',
  'MERIDIAN GLOBAL TRADE',
  'COASTAL VENTURES INC',
  'STARLIGHT COMMERCE GROUP',
  'PINNACLE IMPORTS USA',
  'HORIZON DISTRIBUTION CO',
  'CASCADE TRADING PARTNERS',
  'EAGLE EYE IMPORTS LLC',
];

const SAMPLE_EXPORTERS = [
  'JIANGSU YONGGAO TRADING CO LTD',
  'SHENZHEN BRIGHT FUTURE TECHNOLOGY',
  'NINGBO PACIFIC INDUSTRIAL CO',
  'GUANGZHOU MAYFLOWER MANUFACTURING',
  'ZHEJIANG SUMMIT EXPORT INC',
  'FUJIAN GOLDEN COAST TRADE LTD',
  'XIAMEN OCEAN BRIDGE COMPANY',
  'YIWU EVERGREEN IMP & EXP',
  'WENZHOU HARMONY GROUP CO',
  'QINGDAO BLUE WHALE TRADING',
];

const HSCODES = ['9405409980', '8541409032', '8517620090', '7323930000', '6912001000',
                 '8504401400', '6203420000', '4016939090', '8528729200', '8421390090'];

function pad(n, w = 2) { return String(n).padStart(w, '0'); }

function randomDate(yearStart = 2024, yearEnd = 2026) {
  const y = yearStart + Math.floor(Math.random() * (yearEnd - yearStart));
  const m = 1 + Math.floor(Math.random() * 12);
  const d = 1 + Math.floor(Math.random() * 28);
  return `${y}-${pad(m)}-${pad(d)}`;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(min + Math.random() * (max - min)); }

function buildRecord(seed) {
  const total = rand(2000, 80000);
  const qty = rand(100, 5000);
  const wt = (qty * (0.3 + Math.random())).toFixed(2);
  const date = randomDate();
  return {
    BID: `B${Date.now().toString(36)}${seed.toString(36)}`,
    Dates: date,
    Months: date.substring(0, 7).replace('-', ''),
    ParDate: date.substring(0, 7).replace('-', ''),
    SID: '100',
    Importer1: pick(SAMPLE_IMPORTERS),
    Exporter1: pick(SAMPLE_EXPORTERS),
    ProductDesc1: pick(SAMPLE_PRODUCTS),
    HSCODE: pick(HSCODES).substring(0, 6),
    HSCODE8: pick(HSCODES).substring(0, 8),
    QTY: qty,
    UNIT: pick(['PCS', 'KG', 'CTN', 'SET']),
    WT: wt,
    TotalPrice: total.toFixed(2),
    UnitPrice: (total / qty).toFixed(2),
    OrgCountry: 'CHINA',
    DesCountry: 'UNITED STATES',
    LdPort: pick(['SHANGHAI', 'NINGBO', 'SHENZHEN', 'XIAMEN', 'QINGDAO']),
    DesPort: pick(['LOS ANGELES', 'NEW YORK', 'LONG BEACH', 'SAVANNAH', 'HOUSTON']),
  };
}

export function buildDemoResult({ keyword = '', pageSize = 10, pageNum = 1 } = {}) {
  const total = 12347;
  const records = Array.from({ length: pageSize }, (_, i) => {
    const r = buildRecord(pageNum * 1000 + i);
    if (keyword && Math.random() > 0.4) {
      r.ProductDesc1 = `${keyword.toUpperCase()} - ${r.ProductDesc1}`;
    }
    return r;
  });
  return { total, records, took_ms: 0 };
}
