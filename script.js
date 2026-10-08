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

/* ---------- 2. 预设回复聊天 ---------- */

// 预设回复表：每条含关键词 keywords（用来匹配输入），以及中英文回复
// 语料基于《黄文轩人物档案》：保留理性、思辨、克制的核心，语气温和化（50% 特质版）
const replies = [
  {
    keyword: ["你是谁", "who are you", "who", "介绍", "关于你", "自我介绍", "介绍一下"],
    zh: "我是黄文轩的数字分身——一个温和版的他。理性、目标导向、有点慢热，喜欢把问题拆开看，也尊重每个人的边界。你可以随便问我：性格、爱好、经历、对事情的看法，我用他的方式回答。",
    en: "I'm Wenxuan's digital twin — a gentler version of him. Rational, goal-oriented, a bit slow to warm up, likes breaking questions apart and respects everyone's boundaries. Ask me anything — personality, hobbies, travels, opinions — I'll answer in his way."
  },
  {
    keyword: ["联系", "contact", "邮箱", "email", "微信", "怎么找你", "qq", "联系方式"],
    zh: "想联系他的话：邮箱 hwx2160606@outlook.com，QQ 3942961627。不过我更建议在页面下方留言，他说他会认真读每一条。",
    en: "To reach him: hwx2160606@outlook.com, or QQ 3942961627. Though I'd suggest leaving a message at the bottom of the page — he reads every single one."
  },
  {
    keyword: ["最近", "在忙", "干嘛", "项目", "vibecoding", "主页", "正在做", "最近怎么样"],
    zh: "最近他在用 vibe coding 做这个个人主页——从零搭页面、接反馈、上线，边做边学。你能看到这一页，就是它的成果。",
    en: "Lately he's been vibe-coding this very homepage — building it from scratch, wiring up feedback, deploying it, learning as he goes. You're looking at the result."
  },
  {
    keyword: ["学什么", "在学", "study", "专业", "学习", "coding", "大学", "学校", "读什么"],
    zh: "他在深圳读计算机科学与技术（天津大学香港理工深圳未来技术学院），现在在学 Python。选这个专业不是因为多喜欢，而是不想逃避自己恐惧的东西——而且他说，搞懂计算逻辑本身挺有乐趣。",
    en: "He's studying Computer Science at Tianjin University–HKUST Shenzhen Future Technology Institute, currently learning Python. He picked it not out of passion, but because he refuses to run from what scares him — and he genuinely enjoys figuring out how computation works."
  },
  {
    keyword: ["mbti", "人格", "性格测试", "entj", "intj", "infj", "enfp"],
    zh: "他现在测出来是 ENTJ-A，不过四个维度都在临界值上，他自己也承认人格不太稳定。轨迹是 ENFP-A → INFJ-T → ENFJ-T → ENTJ-A，每一次转变都对应一段经历——高考、独自处理旅行突发状况。",
    en: "He tests as ENTJ-A right now, but all four dimensions sit at the boundary — he admits his personality isn't exactly stable. The path: ENFP-A → INFJ-T → ENFJ-T → ENTJ-A, each shift tied to a real experience — gaokao, handling a crisis alone abroad."
  },
  {
    keyword: ["性格", "什么性格", "personality", "character", "特质", "是怎样的人", "怎么样的人"],
    zh: "核心是四件事：慕强、理性、重情、包容。目标导向、慢热；状态好的时候才愿意社交，生气或低落时习惯自己消化，不喜欢麻烦别人。他信奉课题分离——尊重大于关爱，也会克制对在意之人的控制欲。",
    en: "Four things define him: admires strength, stays rational, values loyalty, stays open-minded. Goal-oriented and slow to warm up; he socializes when he's in a good state, and processes upset alone. He believes in separating your issue from mine — respect over care, and keeping his urge to control in check."
  },
  {
    keyword: ["课题分离", "哲学", "原则", "底线", "信条", "人生信条", "观点", "怎么看", "边界"],
    zh: "他常挂在嘴边的几个思路：课题分离——分清别人的课题和自己的课题；控制与责任是一体两面；尊重大于关爱。底线只有一条：无法忍受不守承诺的人。",
    en: "His usual frameworks: separating your problem from my problem, control and responsibility as two sides of one coin, and respect over care. One hard line: he can't stand people who break their promises."
  },
  {
    keyword: ["家乡", "老家", "厦门", "hometown", "出生", "哪里人"],
    zh: "厦门岛内人。他说厦门小而精、绿化好，三角梅到处都开。不过他在厦门没什么浓烈的乡愁——岛内闽南语的使用氛围其实挺弱的。",
    en: "From Xiamen island. He describes it as compact and well-kept, with bougainvillea everywhere. But he doesn't carry heavy nostalgia for it — Hokkien is barely spoken on the island these days."
  },
  {
    keyword: ["家庭", "家人", "妹妹", "爸妈", "父母", "family", "双胞胎", "几口人", "家里"],
    zh: "他有个双胞胎妹妹，父母陪伴很多。高考后全家去意大利旅行，他爸意外受伤先回国，剩下他和妹妹在地陪、司机、翻译陪同下走完二十多天行程——沟通、伤情跟进、各种协调，都是他一个人扛下来的。",
    en: "He has a twin sister, and their parents are very present. After gaokao the family went to Italy; his dad got injured and flew home early, leaving him and his sister to finish twenty-plus days with a local guide, driver and interpreter — he handled the communication, hospital follow-ups and coordination alone."
  },
  {
    keyword: ["高中", "高考", "自学", "642", "考了多少", "gaokao", "高考分数"],
    zh: "他高中阶段社交适应得不太好；高考前在家自学了两个月，最后考了 642 分。他说那段独自备考的时间，很大程度上重塑了他的自我价值感。",
    en: "High school was rough socially. Before gaokao he self-studied at home for two months and scored 642. He says that solitary prep period reshaped his sense of self-worth."
  },
  {
    keyword: ["意大利", "italy", "西西里", "罗马", "旅行事故", "atv", "骨折"],
    zh: "那次意大利之行很特别：他爸开 ATV 翻车横突骨折。他当时心里全是恐惧和窘迫，但还是把后续都处理好了——伤情跟进、学校事务、各种协调。二十多天的行程里，他快速学会了独当一面。",
    en: "That Italy trip was something else: his dad flipped an ATV and fractured his spine. He was terrified and embarrassed at the time, but still handled everything — hospital follow-ups, school affairs, all the coordination. Twenty-plus days on the road made him grow up fast."
  },
  {
    keyword: ["克罗地亚", "十六湖", "漂流", "croatia", "plitvice"],
    zh: "克罗地亚的十六湖是他很喜欢的摄影题材之一。不过漂流那段回忆有点狼狈——湿冷的救生衣、语言不通，他差点崩溃，但为了不扫同行人的兴，还是撑完了全程。",
    en: "Plitvice Lakes in Croatia is one of his favorite photo subjects. The rafting part was rougher — a cold wet life jacket, no shared language; he nearly broke down, but held it together so he wouldn't spoil the trip for the group."
  },
  {
    keyword: ["旅游", "旅行", "去过", "世界", "地球", "地图", "travel", "world", "globe", "map", "去过哪", "footprint", "国家"],
    zh: "目前去过中国、意大利、澳大利亚、克罗地亚和印尼。页面上「✈️ 旅游 · 世界地图」可以拖动看地球，点击中国还能看到他去的省份。他喜欢旅行里那种不期而遇的感觉。",
    en: "So far: China, Italy, Australia, Croatia and Indonesia. Open \"✈️ Travel · World Map\" to spin the globe — click China to see the provinces he's visited. What he loves about travel is the serendipity."
  },
  {
    keyword: ["摄影", "照片", "作品", "portfolio", "photo", "gallery", "拍照", "相机", "a7r5", "扫街"],
    zh: "他喜欢扫街——捕捉不期而遇的画面，而不是蹲守精心布置的瞬间；他说自己不擅长长时间等待一个场景。页面「📷 摄影 · 作品集」里是他旅行时拍的一些照片。",
    en: "He's a street photographer at heart — catching serendipitous moments rather than waiting hours for the perfect setup; patience isn't his strength. Check \"📷 Photo · Portfolio\" for shots from his travels."
  },
  {
    keyword: ["游泳", "泳池", "swim", "swimming"],
    zh: "游泳是他最放松的时刻之一：选个人少、水质好的酒店泳池，一头扎进去，大脑就放空了。",
    en: "Swimming is his reset button: a quiet, clean hotel pool, and his mind goes blank the moment he dives in."
  },
  {
    keyword: ["拉丁", "拉丁舞", "舞蹈", "dance", "latin"],
    zh: "他跳拉丁舞，喜欢的是那种克制与控制交织的张力——不是放开，而是「收着跳」的感觉。",
    en: "He does Latin dance. What he loves is the tension between restraint and control — not letting go, but dancing with held-back precision."
  },
  {
    keyword: ["匹克球", "pickleball"],
    zh: "匹克球对他来说就是纯粹的对抗乐趣。他常和他爸打，虽然自认不太擅长，但很享受那种你来我往的兴奋感。",
    en: "Pickleball is pure competitive fun for him. He plays with his dad a lot — admits he's not great at it, but loves the back-and-forth thrill."
  },
  {
    keyword: ["梦想", "南极", "非洲", "想去", "dream", "大迁徙", "目标"],
    zh: "他的愿望清单上排着南极和非洲动物大迁徙。不过他说自己不执着于遥远宏大的目标——更愿意先把每一天过好。",
    en: "Antarctica and the Great Migration in Africa sit on his wishlist. But he doesn't chase grand distant goals — he prefers getting each day right first."
  },
  {
    keyword: ["变强", "strong", "自律", "狠", "不够强", "对自己"],
    zh: "他对自己挺狠的，常用「你不够强」提醒自己。他定义的变强是：拥有应对变数的能力、接纳世界的灰度、内核稳定——也达成世俗层面的成功。",
    en: "He's hard on himself and often reminds himself: \"You're not strong enough.\" To him, becoming strong means handling uncertainty, accepting the gray areas of the world, staying steady inside — and reaching worldly success too."
  },
  {
    keyword: ["喜欢", "爱好", "兴趣", "hobby", "喜欢什么"],
    zh: "他的爱好挺杂：扫街摄影、游泳、拉丁舞、匹克球、徒步、骑行，偶尔读书。真要排序的话，摄影和游泳排最前。",
    en: "His interests are all over the place: street photography, swimming, Latin dance, pickleball, hiking, cycling, some reading. If forced to rank — photography and swimming take the top two."
  },
  {
    keyword: ["你好", "hi", "hello", "哈喽", "嗨", "在吗"],
    zh: "你好呀。我是文轩的数字分身，随时可以聊。",
    en: "Hey. I'm Wenxuan's digital twin — always up for a chat."
  },
  {
    keyword: ["谢谢", "thank", "thanks", "感谢", "辛苦"],
    zh: "不客气。有想了解他的，随时来问。",
    en: "Anytime. Come back if you want to know more about him."
  },
];

// 没有匹配到关键词时的兜底回复
const fallback = {
  zh: "这个问题我还没学会回答。不过你可以问问：你是谁？你的 MBTI？你学什么？你去过哪些地方？或者你的底线是什么？",
  en: "Haven't learned to answer that one yet. Try: Who are you? What's your MBTI? What are you studying? Where have you been? Or what's your line in the sand?"
};

const chatPanel = document.getElementById("chatPanel");
const chatToggle = document.getElementById("chatToggle");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// 打开 / 关闭聊天窗口
chatToggle.addEventListener("click", () => {
  chatPanel.classList.toggle("hidden");
  if (!chatPanel.classList.contains("hidden") && chatMessages.children.length === 0) {
    addMessage("bot", greetings());
  }
});

chatClose.addEventListener("click", () => {
  chatPanel.classList.add("hidden");
});

// 发送消息
chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// 快捷问题按钮
document.querySelectorAll(".quick").forEach((btn) => {
  btn.addEventListener("click", () => {
    const q = btn.getAttribute("data-q");
    const label = btn.textContent;
    addMessage("user", label);
    if (q === "work") {
      // 「看看你的作品」：直接打开摄影作品集
      setTimeout(() => openGallery(), 400);
      return;
    }
    if (q === "travel") {
      // 「看到的世界」：直接打开 3D 地球
      setTimeout(() => window.openGlobe && openGlobe(), 400);
      return;
    }
    const answer = getAnswer(q);
    setTimeout(() => addMessage("bot", answer), 400); // 模拟一点延迟
  });
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage("user", text);
  chatInput.value = "";
  const answer = getAnswer(text);
  setTimeout(() => addMessage("bot", answer), 400);
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 根据问题匹配回复
function getAnswer(q) {
  const lower = q.toLowerCase();
  for (const r of replies) {
    if (r.keyword.some((k) => lower.includes(k.toLowerCase()))) {
      return r[currentLang];
    }
  }
  return fallback[currentLang];
}

function greetings() {
  return currentLang === "zh"
    ? "嗨，我是黄文轩的数字分身——一个温和版的他。理性、慕强、慢热，喜欢把问题拆开看。你可以问我性格、爱好、旅行、原则，我会用他的方式回答。"
    : "Hi, I'm Wenxuan's digital twin — a gentler version of him. Rational, admires strength, slow to warm up, likes breaking questions apart. Ask me about his personality, hobbies, travels, or principles — I'll answer in his way.";
}

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
