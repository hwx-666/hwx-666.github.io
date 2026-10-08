/* =====================================
   个人主页 · 世界足迹 3D 地球 + 中国足迹地图
   -------------------------------------
   - 旅游按钮点击 -> 全屏 3D 地球（缓慢自转，可拖动手动旋转）
   - 去过国家 = 淡薰衣草紫；未去过 = 60% 灰黑；边界 = 深紫
   - 点击中国 -> 中国省份地图，去过省份打黄星
   ===================================== */

/* ---------- 数据：去过的地方 ---------- */
const VISITED_COUNTRIES = ["China", "Italy", "Australia", "Croatia", "Indonesia"];
const VISITED_PROVINCES = [
  "黑龙江", "江苏", "浙江", "上海", "福建", "湖北", "湖南", "广东",
  "四川", "云南", "陕西", "内蒙古", "西藏", "新疆", "北京", "重庆", "香港",
];

/* ---------- 配色 ---------- */
const COLOR = {
  // 浅色点缀色已按「85% 原色 + 15% 绿 RGB(216,228,128)」混绿（V2.0 浅色模式要求）
  visitedCountry: "#cfbfde",            // 去过国家：淡薰衣草紫（混绿）
  unvisitedCountry: "rgba(26,28,36,0.62)", // 未去过：60% 透明度灰黑（科幻深色，保持）
  border: "#6e3eae",                    // 边界：深紫（混绿）
  chinaVisited: "#cdbfde",              // 去过省份（混绿）
  chinaVisitedStroke: "#8a73ba",        // 去过省份描边（混绿）
  chinaUnvisited: "#e6e6e1",            // 未去过省份（混绿）
  chinaUnvisitedStroke: "#c3bacf",      // 未去过省份描边（混绿）
  pin: "#70F3FF",                       // 省份标记：青蓝色（倒置四棱锥 + 光圈，用户指定，保持）
};

/* ---------- DOM ---------- */
const globeModal = document.getElementById("globeModal");
const globeCloseBtn = document.getElementById("globeClose");
const globeContainer = document.getElementById("globeContainer");
const openTravelBtn = document.getElementById("openTravel");
const chinaModal = document.getElementById("chinaModal");
const chinaCloseBtn = document.getElementById("chinaClose");
const chinaMap = document.getElementById("chinaMap");

/* ---------- 状态 ---------- */
let globeInstance = null;
let globeCreated = false;
let worldData = null;
let chinaData = null;
let chinaRendered = false;
let mapResourcesFailed = false;

/* ---------- 通用：显隐 ---------- */
function setHidden(el, on) {
  if (!el) return;
  el.classList.toggle("hidden", on);
  el.setAttribute("aria-hidden", on ? "true" : "false");
}

function toggleBodyOverflow() {
  const anyOpen = !globeModal.classList.contains("hidden") ||
                  !chinaModal.classList.contains("hidden");
  document.body.style.overflow = anyOpen ? "hidden" : "";
}

/* ---------- 地球 ---------- */
function openGlobe() {
  setHidden(globeModal, false);
  initGlobe();
  resizeGlobe();
  if (globeInstance && globeInstance.resumeAnimation) globeInstance.resumeAnimation();
  toggleBodyOverflow();
}

function closeGlobe() {
  setHidden(globeModal, true);
  toggleBodyOverflow();
  if (globeInstance && globeInstance.pauseAnimation) globeInstance.pauseAnimation();
}

function initGlobe() {
  if (globeCreated) return;
  globeCreated = true;

  if (typeof Globe === "undefined") {
    globeContainer.innerHTML = '<p class="globe-err" data-i18n="globe_error">加载 3D 组件失败，请稍后再试</p>';
    if (typeof applyLang === "function") applyLang(currentLang);
    return;
  }

  // 透明画布 + 蓝色光效大气
  globeInstance = new Globe(globeContainer, { animateIn: true, rendererConfig: { antialias: true, alpha: true } })
    .atmosphereColor("#4c7bff")
    .atmosphereAltitude(0.28);

  // 地球本体：深蓝科幻金属感 + 蓝色反光
  const mat = globeInstance.globeMaterial();
  if (mat.color) mat.color.set("#0a1638");
  if (mat.emissive) mat.emissive.set("#16295e");
  if ("emissiveIntensity" in mat) mat.emissiveIntensity = 0.55;
  if ("shininess" in mat) mat.shininess = 34;
  if (mat.specular) mat.specular.set("#5b8cff");
  if ("metalness" in mat) mat.metalness = 0.4;
  if ("roughness" in mat) mat.roughness = 0.55;

  // 控制器：缓慢自转 + 手动拖动旋转
  try {
    const ctl = globeInstance.controls();
    ctl.autoRotate = true;
    ctl.autoRotateSpeed = 0.6;
    ctl.enableZoom = true;
    ctl.enablePan = false;
    ctl.enableDamping = true;
    ctl.dampingFactor = 0.08;
    ctl.minDistance = 180;
    ctl.maxDistance = 480;
  } catch (e) { console.warn("controls", e); }

  globeInstance.onPolygonHover((polygon) => {
    if (globeContainer) globeContainer.style.cursor = polygon ? "pointer" : "grab";
  });

  loadWorldData()
    .then((geo) => {
      globeInstance
        .showGraticules(true)
        .hexPolygonsData(geo.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .hexPolygonColor(() => "rgba(58,104,208,0.85)")
        .hexPolygonAltitude(0.0006)
        .polygonsData(geo.features)
        .polygonCapColor((f) => (isVisitedCountry(f) ? COLOR.visitedCountry : COLOR.unvisitedCountry))
        .polygonSideColor(() => "rgba(0,0,0,0)")
        .polygonStrokeColor(() => COLOR.border)
        .polygonAltitude(0.012)
        .polygonCapCurvatureResolution(3)
        .polygonsTransitionDuration(600)
        .onPolygonClick((f) => { if (isChina(f)) openChina(); });
    })
    .catch((err) => {
      console.error("world data load failed", err);
      mapResourcesFailed = true;
    });
}

function resizeGlobe() {
  if (!globeInstance || !globeContainer) return;
  const w = globeContainer.clientWidth || 800;
  const h = globeContainer.clientHeight || 500;
  try {
    globeInstance.width(w);
    globeInstance.height(h);
  } catch (e) { /* 方法差异不影响 */ }
}

function loadWorldData() {
  if (worldData) return Promise.resolve(worldData);
  return fetch("data/world-countries.json")
    .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then((d) => { worldData = d; return d; });
}

function countryName(f) {
  const p = f.properties || {};
  return p.ADMIN || p.NAME || p.name || p.admin || "";
}
function isVisitedCountry(f) { return VISITED_COUNTRIES.indexOf(countryName(f)) !== -1; }
function isChina(f) { return /china/i.test(countryName(f)); }

/* ---------- 中国足迹地图 ---------- */
let chinaThemeDark = null;   // 记录上次绘制时的主题，主题切换后自动重绘

function openChina() {
  setHidden(chinaModal, false);
  toggleBodyOverflow();
  const dark = document.body.classList.contains("dark");
  if (!chinaRendered || chinaThemeDark !== dark) {
    chinaThemeDark = dark;
    chinaRendered = false;
    renderChinaMap();
  }
}

function closeChina() {
  setHidden(chinaModal, true);
  toggleBodyOverflow();
}

function loadChinaData() {
  if (chinaData) return Promise.resolve(chinaData);
  return fetch("data/china-provinces.json")
    .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then((d) => { chinaData = d; return d; });
}

function renderChinaMap() {
  chinaRendered = true;
  chinaMap.innerHTML =
    '<p class="china-loading">' + (currentLang === "zh" ? "加载中国地图…" : "Loading China…") + "</p>";
  loadChinaData()
    .then(drawChinaMap)
    .catch((err) => {
      console.error("china data load failed", err);
      chinaMap.innerHTML =
        '<p class="china-loading">' + (currentLang === "zh" ? "地图数据加载失败" : "Failed to load map data") + "</p>";
    });
}

function drawChinaMap(data) {
  // 深色主题下：去过省份粉紫点缀、未去省份融入深色背景（配合 5 色点缀体系）
  const isDark = document.body.classList.contains("dark");
  const colVisited = isDark ? "#d1a4be" : COLOR.chinaVisited;
  const colVisitedStroke = isDark ? "#a0b0ff" : COLOR.chinaVisitedStroke;
  const colUnvisited = isDark ? "#1a2a44" : COLOR.chinaUnvisited;
  const colUnvisitedStroke = isDark ? "#3a5077" : COLOR.chinaUnvisitedStroke;

  // 只保留大陆省份（去掉南海诸岛这条，避免把地图撑到很南边）
  const features = (data.features || []).filter((f) => {
    const ad = f.properties && f.properties.adcode;
    const s = String(ad);
    return f.geometry && f.geometry.type && s !== "100000_JD" && s !== "100000";
  });

  const coordsOf = (geom) => {
    const out = [];
    if (!geom) return out;
    const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
    if (!polys) return out;
    polys.forEach((p) => (p || []).forEach((r) => (r || []).forEach((c) => out.push(c))));
    return out;
  };

  // 计算大陆范围的包围盒
  const b = { minLng: Infinity, maxLng: -Infinity, minLat: Infinity, maxLat: -Infinity };
  features.forEach((f) => coordsOf(f.geometry).forEach((c) => {
    if (!c || c.length < 2) return;
    const lon = c[0], lat = c[1];
    if (lon < b.minLng) b.minLng = lon;
    if (lon > b.maxLng) b.maxLng = lon;
    if (lat < b.minLat) b.minLat = lat;
    if (lat > b.maxLat) b.maxLat = lat;
  }));
  if (b.minLng === Infinity) { chinaMap.innerHTML = ""; return; }

  // 等距圆柱投影 + 纬度余弦校正（更接近中国地图的真实比例）
  const midLat = ((b.minLat + b.maxLat) / 2) * Math.PI / 180;
  const cosMid = Math.abs(Math.cos(midLat)) || 0.5;
  const W = 1000;
  const H = W * (b.maxLat - b.minLat) / ((b.maxLng - b.minLng) * cosMid);
  const scaleX = W / (b.maxLng - b.minLng);
  const scaleY = H / (b.maxLat - b.minLat);
  const proj = (lon, lat) => [(lon - b.minLng) * scaleX, (b.maxLat - lat) * scaleY];

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("xmlns", NS);
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("fill-rule", "evenodd");
  chinaMap.innerHTML = "";
  chinaMap.appendChild(svg);

  function polyToPath(geom) {
    const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
    if (!polys) return "";
    let d = "";
    polys.forEach((poly) => (poly || []).forEach((ring) => {
      if (!ring || ring.length < 3) return;
      for (let j = 0; j < ring.length; j++) {
        const c = ring[j];
        if (!c || c.length < 2) continue;
        const [x, y] = proj(c[0], c[1]);
        d += (j === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      }
      d += "Z";
    }));
    return d;
  }

  // 四棱锥主体（中心在 0,0，尖端朝下，透明青蓝）
  const pyramidD = "M-6.5,-9 L6.5,-9 L0,10 Z";

  features.forEach((f) => {
    const name = (f.properties && f.properties.name) || "";
    const visited = VISITED_PROVINCES.some((p) => name.indexOf(p) !== -1);
    const d = polyToPath(f.geometry);
    if (!d) return;

    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", visited ? colVisited : colUnvisited);
    path.setAttribute("stroke", visited ? colVisitedStroke : colUnvisitedStroke);
    path.setAttribute("stroke-width", "0.9");
    path.setAttribute("fill-rule", "evenodd");
    if (visited) path.classList.add("visited");
    path.classList.add("prov");
    svg.appendChild(path);

    if (visited) {
      // 标记位置：优先用数据里的 centroid，否则用多边形质心
      const cen = f.properties && f.properties.centroid;
      let cx, cy;
      if (cen && cen.length === 2) {
        [cx, cy] = proj(cen[0], cen[1]);
      } else {
        const pts = coordsOf(f.geometry);
        let sl = 0, sa = 0;
        pts.forEach((p) => { sl += p[0]; sa += p[1]; });
        [cx, cy] = proj(sl / pts.length, sa / pts.length);
      }

      // 倒置小四棱锥 + 同色扩散光圈
      const pin = document.createElementNS(NS, "g");
      pin.setAttribute("class", "prov-pin");
      pin.setAttribute("transform", "translate(" + cx.toFixed(1) + "," + cy.toFixed(1) + ")");

      // 透明倒置四棱锥主体（尖朝下）
      const body = document.createElementNS(NS, "path");
      body.setAttribute("d", pyramidD);
      body.setAttribute("fill", COLOR.pin);
      body.setAttribute("fill-opacity", "0.35");
      body.setAttribute("stroke", COLOR.pin);
      body.setAttribute("stroke-width", "1.2");
      body.setAttribute("stroke-linejoin", "round");
      pin.appendChild(body);

      // 中央棱线（表现四棱锥的棱）
      const ridge = document.createElementNS(NS, "line");
      ridge.setAttribute("x1", "0"); ridge.setAttribute("y1", "-9");
      ridge.setAttribute("x2", "0"); ridge.setAttribute("y2", "10");
      ridge.setAttribute("stroke", COLOR.pin);
      ridge.setAttribute("stroke-width", "0.8");
      ridge.setAttribute("opacity", "0.6");
      pin.appendChild(ridge);

      // 中心发光点
      const core = document.createElementNS(NS, "circle");
      core.setAttribute("cx", "0"); core.setAttribute("cy", "1");
      core.setAttribute("r", "2");
      core.setAttribute("fill", COLOR.pin);
      core.setAttribute("opacity", "0.9");
      pin.appendChild(core);

      // 两道同色扩散光圈（错开节奏循环发散）
      for (let i = 0; i < 2; i++) {
        const ring = document.createElementNS(NS, "circle");
        ring.setAttribute("cx", "0"); ring.setAttribute("cy", "1");
        ring.setAttribute("r", "8.5");
        ring.setAttribute("class", "prov-ring" + (i === 1 ? " prov-ring-2" : ""));
        pin.appendChild(ring);
      }

      svg.appendChild(pin);
    }
  });
}

/* ---------- 事件绑定 ---------- */
if (openTravelBtn) openTravelBtn.addEventListener("click", openGlobe);
if (globeCloseBtn) globeCloseBtn.addEventListener("click", closeGlobe);
if (chinaCloseBtn) chinaCloseBtn.addEventListener("click", closeChina);

globeModal.addEventListener("click", (e) => { if (e.target === globeModal) closeGlobe(); });
chinaModal.addEventListener("click", (e) => { if (e.target === chinaModal) closeChina(); });

window.addEventListener("resize", () => {
  if (!globeModal.classList.contains("hidden")) resizeGlobe();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!chinaModal.classList.contains("hidden")) closeChina();
  else if (!globeModal.classList.contains("hidden")) closeGlobe();
});
