/* =====================================
   个人主页 · 交互脚本
   功能：1) 中英双语切换  2) 预设回复聊天
   ===================================== */

/* ---------- 1. 双语切换 ---------- */

// 所有需要翻译的文本，key 对应 HTML 里的 data-i18n="key" 或 data-q="key"
const translations = {
  // 导航
  nav_about:       { zh: "关于我",     en: "About" },
  nav_study:       { zh: "学习经历",   en: "Study" },
  nav_projects:    { zh: "项目",       en: "Projects" },
  nav_papers:      { zh: "论文",       en: "Papers" },
  nav_awards:      { zh: "奖项",       en: "Awards" },
  nav_skills:      { zh: "特长与兴趣", en: "Skills" },
  nav_signature:   { zh: "个性签名",   en: "Signature" },

  // Hero
  hero_name:       { zh: "黄文轩",     en: "Huang Wenxuan" },
  hero_tagline:    { zh: "一个努力对学业、工作和生活都负责的人", en: "Someone who strives to be responsible for studies, work, and life." },
  hero_btn1:       { zh: "了解更多",   en: "Learn More" },
  hero_btn2:       { zh: "联系我",     en: "Contact" },

  // 关于
  about_title:     { zh: "关于我",     en: "About Me" },
  about_1_label:   { zh: "姓名",       en: "Name" },
  about_1_value:   { zh: "黄文轩",     en: "Huang Wenxuan" },
  about_2_label:   { zh: "学校 / 专业", en: "School / Major" },
  about_2_value:   { zh: "天津大学香港理工深圳未来技术学院 · 计算机科学与技术", en: "Tianjin University–HKUST Shenzhen Future Technology Institute · Computer Science and Technology" },
  about_3_label:   { zh: "MBTI",       en: "MBTI" },
  about_3_value:   { zh: "ENTJ-A",     en: "ENTJ-A" },

  // 学习经历 / 项目 / 论文 / 奖项（待补充）
  study_title:     { zh: "学习经历",   en: "Study Experience" },
  study_empty:     { zh: "内容待补充 · 敬请期待", en: "Content coming soon" },
  projects_title:  { zh: "项目",       en: "Projects" },
  projects_empty:  { zh: "内容待补充 · 敬请期待", en: "Content coming soon" },
  papers_title:    { zh: "论文",       en: "Papers" },
  papers_empty:    { zh: "内容待补充 · 敬请期待", en: "Content coming soon" },
  awards_title:    { zh: "奖项",       en: "Awards" },
  awards_empty:    { zh: "内容待补充 · 敬请期待", en: "Content coming soon" },

  // 特长
  skills_title:    { zh: "特长与兴趣", en: "Skills & Interests" },
  skill_1:         { zh: "📷 摄影 · 作品集", en: "📷 Photo · Portfolio" },
  skill_2:         { zh: "💃 拉丁",    en: "💃 Latin Dance" },
  skill_3:         { zh: "✈️ 旅游 · 世界地图", en: "✈️ Travel · World Map" },
  skill_4:         { zh: "🚴 骑行",    en: "🚴 Cycling" },
  skill_5:         { zh: "📚 阅读 · 人文社科", en: "📚 Reading · Humanities" },

  // 个性签名
  sig_title:       { zh: "个性签名",   en: "Signature" },
  sig_quote:       { zh: "\"我所停留的地方，都埋葬着部分我。\"", en: "\"Every place I linger holds a buried part of me.\"" },

  // 联系
  contact_title:   { zh: "联系我",     en: "Contact" },
  contact_email_label: { zh: "邮箱",   en: "Email" },
  contact_qq_label: { zh: "QQ",        en: "QQ" },

  // 页脚
  footer_text:     { zh: "© 2025 黄文轩 · 用 Vibe Coding 制作", en: "© 2025 Huang Wenxuan · Built with Vibe Coding" },

  // 用户反馈
  hero_btn3:        { zh: "留言反馈",  en: "Feedback" },
  feedback_fab:     { zh: "✍️ 反馈",  en: "✍️ Feedback" },
  feedback_title:   { zh: "用户反馈",  en: "Feedback" },
  feedback_desc:    { zh: "留下你的想法和建议，我会认真阅读每一条留言。", en: "Leave your thoughts and suggestions — I read every message carefully." },
  feedback_guide:   { zh: "💡 哪里不方便、哪里不好找、哪里看不懂？都可以写在这里，也可以说点别的想说的话。", en: "💡 Anything hard to find or confusing? Write it here — or just say anything." },
  feedback_id:      { zh: "你的 ID / 怎么称呼你", en: "Your ID / What to call you" },
  feedback_id_ph:   { zh: "QQ 昵称 / 微信名 / 其他，也可以匿名", en: "QQ nickname / WeChat name / anything — anonymous is fine" },
  feedback_rel:     { zh: "与我的关系", en: "How do you know me" },
  feedback_rel_classmate: { zh: "同学", en: "Classmate" },
  feedback_rel_friend:    { zh: "朋友", en: "Friend" },
  feedback_rel_family:    { zh: "家人", en: "Family" },
  feedback_rel_netizen:   { zh: "网友", en: "Netizen" },
  feedback_rel_stranger:  { zh: "路人 / 初次来访", en: "Passerby / First visit" },
  feedback_rel_other:     { zh: "其他", en: "Other" },
  feedback_msg:     { zh: "留言内容",  en: "Your Message" },
  feedback_msg_ph:  { zh: "写下想说的话……", en: "Write something..." },
  feedback_submit:  { zh: "提交留言",  en: "Submit" },
  feedback_success: { zh: "✓ 留言已提交，感谢你的反馈！", en: "✓ Message submitted. Thank you!" },
  feedback_error:   { zh: "请填写留言内容", en: "Please write a message" },
  feedback_count:   { zh: "已有 %n 条留言", en: "%n message(s) so far" },
  fb_admin_title:   { zh: "💬 留言后台", en: "💬 Messages Admin" },
  fb_admin_empty:   { zh: "暂无留言",   en: "No messages yet" },
  fb_admin_clear:   { zh: "清空全部",  en: "Clear All" },
  fb_admin_hint:    { zh: "Ctrl + Shift + A 呼出 / Esc 关闭", en: "Ctrl + Shift + A to open / Esc to close" },

  // 作品集弹窗
  gallery_title:   { zh: "📷 摄影作品集", en: "📷 Photo Portfolio" },
  gallery_hint:    { zh: "点击任意照片放大查看", en: "Click any photo to enlarge" },
  gallery_close:   { zh: "×",          en: "×" },

  // 世界足迹弹窗
  globe_title:     { zh: "🌍 我的足迹 · 世界", en: "🌍 My Footprints · World" },
  globe_tip:       { zh: "拖动可旋转 · 点击紫色的中国查看省份足迹", en: "Drag to rotate · Click the purple China for province footprints" },
  globe_error:     { zh: "加载 3D 组件失败，请稍后再试", en: "Failed to load 3D. Please retry." },

  // 中国足迹弹窗
  china_title:     { zh: "🇨🇳 中国足迹", en: "🇨🇳 China Footprints" },
  china_legend:    { zh: "◈ 青蓝棱 = 我去过的地方", en: "◈ Cyan pyramid = places I've been" },

  // 设置面板
  settings_title:     { zh: "⚙️ 设置",     en: "⚙️ Settings" },
  settings_theme:     { zh: "主题",         en: "Theme" },
  settings_light:     { zh: "浅色",         en: "Light" },
  settings_dark:      { zh: "深色",         en: "Dark" },
  settings_lang:      { zh: "语言",         en: "Language" },
  settings_zh:        { zh: "中文",         en: "中文" },
  settings_en:        { zh: "English",      en: "English" },
  settings_font:      { zh: "字号",         en: "Text Size" },
  settings_font_s:    { zh: "小",           en: "Small" },
  settings_font_n:    { zh: "标准",         en: "Normal" },
  settings_font_l:    { zh: "大",           en: "Large" },
  settings_motion:    { zh: "动画效果",     en: "Motion" },
  settings_motion_on: { zh: "开启",         en: "On" },
  settings_motion_off:{ zh: "减弱",         en: "Reduced" },
  settings_reset:     { zh: "恢复默认",     en: "Reset to default" },

  // 聊天
  chat_title:      { zh: "数字分身 · 文轩", en: "Wenxuan · Digital Twin" },
  chat_close:      { zh: "×",          en: "×" },
  chat_placeholder:{ zh: "输入问题或点上面快捷问题……", en: "Type a question or tap a quick question..." },
  chat_send:       { zh: "发送",       en: "Send" },
  chat_open:       { zh: "💬",         en: "💬" },

  // 快捷问题
  q_who:           { zh: "你是谁？",   en: "Who are you?" },
  q_contact:       { zh: "怎么联系你？", en: "How to contact you?" },
  q_study:         { zh: "你在学什么？", en: "What are you studying?" },
  q_mbti:          { zh: "你的 MBTI？", en: "Your MBTI?" },
  q_character:     { zh: "你的性格？", en: "Your personality?" },
  q_work:          { zh: "看看你的作品？", en: "Show me your photos?" },
  q_travel:        { zh: "看到的世界？", en: "Your travels?" },
};

let currentLang = "zh"; // 默认中文

function applyLang(lang) {
  currentLang = lang;

  // 遍历所有带 data-i18n 的元素，替换文本
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const entry = translations[key];
    if (entry && entry[lang] !== undefined) {
      el.textContent = entry[lang];
    }
  });

  // 更新语言切换按钮文字（showing the OTHER language to switch to）
  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "zh" ? "English" : "中文";
  }

  // 切换 html 语言属性
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  // 重建作品集（更新每张照片的标题语言）
  renderGallery();
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "zh" ? "en" : "zh");
});

// ========== 数字分身聊天（真实AI版） ==========
const PROXY_URL = "https://1492105424-egykbvhem5.ap-guangzhou.tencentscf.com";
let chatHistory = [];
let isGenerating = false;

// 打开/关闭聊天面板
document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chat-panel').classList.toggle('open');
});
document.getElementById('chat-close').addEventListener('click', () => {
  document.getElementById('chat-panel').classList.remove('open');
});

// 发送消息
async function sendMessage(text) {
  if (isGenerating || !text.trim()) return;
  
  const chatBody = document.getElementById('chat-body');
  const input = document.getElementById('chat-input');
  
  // 用户消息
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);
  chatHistory.push({ role: 'user', content: text });
  
  // AI占位消息
  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-msg ai';
  aiMsg.textContent = '正在输入…';
  chatBody.appendChild(aiMsg);
  
  chatBody.scrollTop = chatBody.scrollHeight;
  isGenerating = true;
  input.value = '';

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatHistory,
        stream: true
      })
    });

    if (!response.ok) throw new Error('服务暂时不可用');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    aiMsg.textContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content || '';
            if (delta) {
              fullText += delta;
              aiMsg.textContent = fullText;
              chatBody.scrollTop = chatBody.scrollHeight;
            }
          } catch (e) { /* 忽略不完整分片 */ }
        }
      }
    }
    
    chatHistory.push({ role: 'assistant', content: fullText });
    
  } catch (err) {
    aiMsg.textContent = '抱歉，我现在有点累，稍后再试吧。';
    console.error(err);
  } finally {
    isGenerating = false;
  }
}

// 回车发送
document.getElementById('chat-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(e.target.value);
  }
});

// 快捷问题按钮
document.querySelectorAll('.chat-quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.dataset.question);
  });
});


/* ---------- 3. 摄影作品集 Gallery ---------- */

// 作品数据：图片 + 中英双语标题
const photos = [
  { src: "photos/volcano.jpg",   cap_zh: "🌋",                    cap_en: "Volcano" },
  { src: "photos/agrigento.jpg", cap_zh: "阿格里真托",            cap_en: "Agrigento" },
  { src: "photos/bolzano.jpg",   cap_zh: "博尔扎诺",              cap_en: "Bolzano" },
  { src: "photos/plitvice.jpg",  cap_zh: "十六湖",                cap_en: "Plitvice Lakes" },
  { src: "photos/bali.jpg",      cap_zh: "印尼",                  cap_en: "Indonesia" },
];

const galleryModal = document.getElementById("galleryModal");
const galleryCloseBtn = document.getElementById("galleryClose");
const galleryGrid = document.getElementById("galleryGrid");
const galleryButton = document.getElementById("openGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
let lightboxIndex = 0;

// 生成作品集网格
function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  photos.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.dataset.index = i;
    item.innerHTML =
      '<img src="' + p.src + '" alt="' + p.cap_zh + '" loading="lazy" />' +
      '<span class="gallery-cap">' + (currentLang === "zh" ? p.cap_zh : p.cap_en) + "</span>";
    item.addEventListener("click", () => openLightbox(i));
    galleryGrid.appendChild(item);
  });
}

// 作品集弹窗
function openGallery() {
  if (!galleryModal) return;
  renderGallery();
  galleryModal.classList.remove("hidden");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  galleryModal.classList.add("hidden");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// 灯箱
function updateLightbox() {
  const p = photos[lightboxIndex];
  lightboxImg.src = p.src;
  lightboxImg.alt = p.cap_zh;
  const title = currentLang === "zh" ? p.cap_zh : p.cap_en;
  lightboxCaption.textContent = title + "  ·  " + (lightboxIndex + 1) + " / " + photos.length;
}

function openLightbox(i) {
  lightboxIndex = i;
  updateLightbox();
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
}

function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + photos.length) % photos.length;
  updateLightbox();
}

// 事件绑定
if (galleryButton) {
  galleryButton.addEventListener("click", openGallery);
}
if (galleryCloseBtn) {
  galleryCloseBtn.addEventListener("click", closeGallery);
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", (e) => {
  e.stopPropagation();
  lightboxStep(-1);
});
document.getElementById("lightboxNext").addEventListener("click", (e) => {
  e.stopPropagation();
  lightboxStep(1);
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// 键盘支持：Esc 关闭，左右切换
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") lightboxStep(-1);
    else if (e.key === "ArrowRight") lightboxStep(1);
  } else if (!galleryModal.classList.contains("hidden") && e.key === "Escape") {
    closeGallery();
  }
});

/* ---------- 4. 设置面板 Settings ---------- */

// 默认设置
const DEFAULT_SETTINGS = { theme: "light", lang: "zh", font: "normal", motion: "on" };
const SETTINGS_KEY = "homepage_settings";
let settings = Object.assign({}, DEFAULT_SETTINGS);

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) settings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
  } catch (e) { /* 隐私模式等场景忽略 */ }
}

function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* ignore */ }
}

function applyTheme(t) { document.body.classList.toggle("dark", t === "dark"); }
function applyFont(f) {
  const h = document.documentElement;
  h.classList.toggle("font-small", f === "small");
  h.classList.toggle("font-large", f === "large");
}
function applyMotion(m) { document.body.classList.toggle("reduce-motion", m === "off"); }

// 刷新设置面板里各选项的高亮状态
function applySettingsUI() {
  const groups = {
    setTheme: settings.theme,
    setLang: settings.lang,
    setFont: settings.font,
    setMotion: settings.motion,
  };
  Object.keys(groups).forEach((id) => {
    const g = document.getElementById(id);
    if (!g) return;
    g.querySelectorAll(".set-opt").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-value") === groups[id]);
    });
  });
}

function applyAllSettings() {
  applyTheme(settings.theme);
  applyFont(settings.font);
  applyMotion(settings.motion);
  applyLang(settings.lang);
  applySettingsUI();
}

const settingsModal = document.getElementById("settingsModal");
const settingsOpenBtn = document.getElementById("openSettings");
const settingsCloseBtn = document.getElementById("settingsClose");
const settingsResetBtn = document.getElementById("settingsReset");

function openSettings() {
  if (!settingsModal) return;
  settingsModal.classList.remove("hidden");
  settingsModal.setAttribute("aria-hidden", "false");
}
function closeSettings() {
  if (!settingsModal) return;
  settingsModal.classList.add("hidden");
  settingsModal.setAttribute("aria-hidden", "true");
}

if (settingsOpenBtn) settingsOpenBtn.addEventListener("click", openSettings);
if (settingsCloseBtn) settingsCloseBtn.addEventListener("click", closeSettings);
if (settingsResetBtn) settingsResetBtn.addEventListener("click", () => {
  settings = Object.assign({}, DEFAULT_SETTINGS);
  saveSettings();
  applyAllSettings();
});
if (settingsModal) {
  settingsModal.addEventListener("click", (e) => { if (e.target === settingsModal) closeSettings(); });
}

// 选项点击切换
[["setTheme", "theme"], ["setLang", "lang"], ["setFont", "font"], ["setMotion", "motion"]]
  .forEach(([id, key]) => {
    const g = document.getElementById(id);
    if (!g) return;
    g.addEventListener("click", (e) => {
      const btn = e.target.closest(".set-opt");
      if (!btn) return;
      settings[key] = btn.getAttribute("data-value");
      saveSettings();
      applyAllSettings();
    });
  });

// Esc 关闭设置面板
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && settingsModal && !settingsModal.classList.contains("hidden")) {
    closeSettings();
  }
});

// 初始化：读取本地设置并应用（含语言，覆盖下方默认中文）
loadSettings();
applyAllSettings();

/* ---------- 6. 留言反馈（Supabase） ---------- */

// 项目连接信息（anon key 是公开的，只允许"写入"，不允许"读取"）
const FEEDBACK_URL = "https://oucwkozhpdjjarfdqkqc.supabase.co";
const FEEDBACK_ANON_KEY = "sb_publishable_85qyXzAk9u7yjv1bc-5RAg_C-oiJpJJ";

// 判断 Supabase 客户端库是否加载成功（index.html 里通过 CDN 引入）
const fbClient = (typeof supabase !== "undefined" && typeof supabase.createClient === "function")
  ? supabase.createClient(FEEDBACK_URL, FEEDBACK_ANON_KEY)
  : null;

const fbForm = document.getElementById("feedbackForm");
const fbHint = document.getElementById("fbHintSec");
const fbCount = document.getElementById("fbCountSec");

function setFbHint(text, isError) {
  if (!fbHint) return;
  fbHint.textContent = text || "";
  fbHint.style.color = isError ? "#c0392b" : "#2e7d32";
}

// 提交留言
if (fbForm) {
  fbForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idInput = document.getElementById("fbIdSec");
    const relSelect = document.getElementById("fbRelSec");
    const msgInput = document.getElementById("fbMsgSec");

    const nameVal = (idInput ? idInput.value : "").trim();
    const relVal = relSelect ? relSelect.value : "other";
    const msgVal = (msgInput ? msgInput.value : "").trim();

    if (!msgVal) {
      setFbHint(translations.feedback_error[settings.lang] || "请填写留言内容", true);
      return;
    }

    if (!fbClient) {
      setFbHint("Supabase 客户端加载失败，请检查网络后重试。", true);
      return;
    }

    const submitBtn = fbForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const { error } = await fbClient.from("feedback").insert({
      name: nameVal || "匿名访客",
      relation: relVal,
      message: msgVal,
    });

    if (submitBtn) submitBtn.disabled = false;

    if (error) {
      console.error("反馈提交失败：", error.message);
      setFbHint("提交失败，请稍后再试。", true);
      return;
    }

    // 成功：清空表单 + 提示
    if (idInput) idInput.value = "";
    if (msgInput) msgInput.value = "";
    setFbHint(translations.feedback_success[settings.lang] || "✓ 留言已提交，感谢你的反馈！", false);

    // 尝试读取留言数（RLS 禁止查询时会失败，此时静默隐藏计数，不影响主流程）
    try {
      const { count } = await fbClient
        .from("feedback")
        .select("*", { count: "exact", head: true });
      if (typeof count === "number" && fbCount) {
        fbCount.textContent = (translations.feedback_count[settings.lang] || "已有 %n 条留言").replace("%n", count);
      }
    } catch (err) {
      if (fbCount) fbCount.textContent = "";
    }
  });
}

// 右下角「反馈」悬浮按钮：滚动到反馈表单区
const fbFab = document.getElementById("feedbackFab");
if (fbFab) {
  fbFab.addEventListener("click", () => {
    const sec = document.getElementById("feedback");
    if (!sec) return;
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
    const firstInput = sec.querySelector("input, textarea");
    if (firstInput) setTimeout(() => firstInput.focus({ preventScroll: true }), 500);
  });
}
