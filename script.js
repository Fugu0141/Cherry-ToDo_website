const header = document.querySelector('[data-header]');
const revealTargets = document.querySelectorAll('.reveal');
const langButtons = document.querySelectorAll('[data-lang-button]');

const translations = {
  ja: {
    navHow: '使い方',
    navFeatures: '特徴',
    navBeta: 'β版',
    tryBeta: 'Try beta',
    eyebrow: 'β版 · オープンソース',
    heroTitle: 'タスクを、<br />流れで組み立てる。',
    heroLead: 'Cherryは、付箋のようなタスクを線でつなげて整理するToDoアプリです。リストだけでは見えにくい作業の順番、分岐、関係をそのまま画面で把握できます。',
    pointRoot: 'ルートを作る',
    pointLine: '線を伸ばす',
    pointEdit: 'あとから直す',
    openBeta: 'Open beta',
    viewGitHub: 'View GitHub',
    appTagline: 'タスクの流れを、ブロックで育てる。',
    taskLaunch: 'Launch Cherry v1.0',
    taskReview: '進捗を確認',
    taskDesign: 'デザイン',
    taskColors: 'UIカラー',
    taskIcon: 'アイコン',
    taskDev: '開発',
    taskBugs: 'マップの修正',
    taskDocs: 'ドキュメント',
    taskJaDocs: '日本語Docs',
    howEyebrow: 'How it works',
    howTitle: '操作は3つだけ。',
    step1Title: 'ルートタスクを作る',
    step1Text: 'まずはプロジェクトや大きな作業を、1つのルートタスクとして置きます。',
    step2Title: '線を引っ張る',
    step2Text: '次にやることは、線を伸ばして子タスクとして追加。流れのまま分解できます。',
    step3Title: 'あとから簡単編集',
    step3Text: '名前、日付、位置はあとから調整できます。予定変更にもすぐ対応できます。',
    featuresEyebrow: 'Why Cherry',
    featuresTitle: 'リストでは見えない「つながり」を見る。',
    featureVisual: '親子関係や分岐を、付箋と線で直感的に把握できます。',
    featureSimple: 'ボタンとドラッグ操作を中心に、覚えることを少なくしています。',
    featureFlexible: '作ったあとも並び替えや編集がしやすく、流れを壊さず調整できます。',
    statusEyebrow: 'Current status',
    betaTitle: 'Cherry is currently in beta.',
    betaText: '基本の考え方と操作感は試せますが、UI、モバイル体験、スケジュール機能はまだ改善中です。正式版に向けて、これからもっと磨いていきます。',
    tryCherryBeta: 'Try Cherry beta',
    footer: 'Cherry · フロー型ToDoアプリ · β版',
  },
  en: {
    navHow: 'How it works',
    navFeatures: 'Features',
    navBeta: 'Beta',
    tryBeta: 'Try beta',
    eyebrow: 'Beta version · open-source',
    heroTitle: 'Build tasks<br />as a flow.',
    heroLead: 'Cherry is a flow-based todo app that connects sticky-note-like task blocks with lines. You can see order, branches, and relationships that are hard to understand from a flat list.',
    pointRoot: 'Create a root task',
    pointLine: 'Pull a line',
    pointEdit: 'Edit anytime',
    openBeta: 'Open beta',
    viewGitHub: 'View GitHub',
    appTagline: 'Grow your task flow with blocks.',
    taskLaunch: 'Launch Cherry v1.0',
    taskReview: 'Review progress',
    taskDesign: 'Design',
    taskColors: 'UI colors',
    taskIcon: 'App icon',
    taskDev: 'Development',
    taskBugs: 'Mapping bugs',
    taskDocs: 'Documentation',
    taskJaDocs: 'Japanese docs',
    howEyebrow: 'How it works',
    howTitle: 'Three steps. That’s it.',
    step1Title: 'Create a root task',
    step1Text: 'Start with a root task for a project, topic, or large piece of work.',
    step2Title: 'Pull a line',
    step2Text: 'Add the next action as a child task by extending the flow from the current block.',
    step3Title: 'Edit anytime',
    step3Text: 'Adjust names, dates, and positions later without breaking the flow.',
    featuresEyebrow: 'Why Cherry',
    featuresTitle: 'See connections, not just a list.',
    featureVisual: 'Understand parent-child relationships and branches with notes and lines.',
    featureSimple: 'Cherry keeps the interaction focused around buttons and drag gestures.',
    featureFlexible: 'Move and edit tasks after creating them, while keeping the overall flow readable.',
    statusEyebrow: 'Current status',
    betaTitle: 'Cherry is currently in beta.',
    betaText: 'The core idea and interaction model are usable today, but the UI, mobile experience, and scheduling features are still evolving toward a stable release.',
    tryCherryBeta: 'Try Cherry beta',
    footer: 'Cherry · Flow based Todo app · Beta version',
  },
};

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};

const applyLanguage = (language) => {
  const selected = translations[language] ? language : 'ja';
  document.documentElement.lang = selected;
  document.documentElement.dataset.lang = selected;
  localStorage.setItem('cherry-site-language', selected);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[selected][key]) element.textContent = translations[selected][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (translations[selected][key]) element.innerHTML = translations[selected][key];
  });

  langButtons.forEach((button) => {
    const active = button.dataset.langButton === selected;
    button.setAttribute('aria-pressed', String(active));
  });
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

langButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.langButton));
});

const savedLanguage = localStorage.getItem('cherry-site-language');
const browserLanguage = navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
applyLanguage(savedLanguage || browserLanguage);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
