const content   = document.getElementById("content");
const buttons   = document.querySelectorAll("header nav button");
const tocRoot   = document.querySelector("#toc .toc-list");
const tocEl     = document.getElementById("toc");
const layoutEl  = document.querySelector(".layout");
const headerEl  = document.querySelector("header");

/* ========= 1) Высота header для якорей (scroll-margin-top) ========= */
function updateHeaderOffsetVar() {
  const headerH = headerEl?.offsetHeight || 0;
  document.documentElement.style.setProperty("--header-sticky-offset", `${headerH}px`);
}
window.addEventListener("resize", () => requestAnimationFrame(updateHeaderOffsetVar));
window.addEventListener("DOMContentLoaded", () => requestAnimationFrame(updateHeaderOffsetVar));

/* ========= 2) Утилиты ========= */
function showError(msg = "Немає контенту для цієї лабораторної.") {
  content.innerHTML = `<p class="error">${msg}</p>`;
  tocEl?.classList.add("is-hidden");
  layoutEl?.classList.add("layout--no-toc");
}
function setActiveButton(btn) {
  buttons.forEach((b) => b.classList.remove("active"));
  btn?.classList.add("active");
}
function ensureId(el) {
  if (!el.id) {
    el.id = el.textContent
      .trim()
      .toLowerCase()
      .replace(/[^\wа-яіїєґ\- ]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  return el.id;
}

/* ========= 3) Scroll-Spy ========= */
function getDynamicAnchorOffset() {
  const rect = headerEl?.getBoundingClientRect();
  const base = 20;
  return rect && rect.bottom > 0 ? Math.round(rect.bottom) + base : base;
}

let headingsCache = []; // [{ id, absTop }]
let ticking = false;
let programmaticScrollLock = false; // блокируем spy во время программного скролла

function computeHeadingPositions() {
  headingsCache = [...content.querySelectorAll("h2, h3, h4")].map(h => ({
    id: h.id,
    absTop: h.getBoundingClientRect().top + window.scrollY,
  }));
}

function onScrollSpy() {
  if (programmaticScrollLock || ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    if (!headingsCache.length) { ticking = false; return; }

    const yAdj = window.scrollY + getDynamicAnchorOffset();
    let current = headingsCache[0].id;

    for (const h of headingsCache) {
      if (yAdj >= h.absTop) current = h.id; else break;
    }

    // у самого низа страницы — последний пункт
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = headingsCache[headingsCache.length - 1].id;
    }

    tocRoot.querySelectorAll("a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`)
    );

    ticking = false;
  });
}
window.addEventListener("scroll", onScrollSpy, { passive: true });

/* ========= 4) Точный и БЫСТРЫЙ плавный скролл к заголовку ========= */
// желаемый отступ (если хедер виден — его низ + зазор; иначе берём зазор TOC/top)
function getDesiredScrollOffset() {
  const rect = headerEl?.getBoundingClientRect();
  if (rect && rect.bottom > 0) return Math.round(rect.bottom) + 20;
  const tocTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--toc-top")) || 0;
  return Math.max(20, tocTop);
}

// своя анимация скролла (контроль длительности)
function animateScrollTo(targetY, durationMs = 220) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || durationMs <= 0) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const startY = window.scrollY;
    const delta  = targetY - startY;
    const start  = performance.now();

    // лёгкое ускорение/замедление
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const y = startY + delta * easeOutCubic(t);
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

// плавный скролл к началу заголовка с учётом хедера; без мигания подсветки
async function scrollHeadingIntoViewSmooth(el, dur = 220) {
  if (!el) return;
  const offset  = getDesiredScrollOffset();
  let targetY   = el.getBoundingClientRect().top + window.scrollY - offset;

  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  if (targetY > maxY) targetY = maxY;
  if (targetY < 0)    targetY = 0;

  programmaticScrollLock = true;
  await animateScrollTo(targetY, dur);
  programmaticScrollLock = false;
  onScrollSpy(); // после завершения — синхронизируем подсветку
}

/* ========= 5) «Удлинитель» страницы, чтобы последний заголовок мог стать вверху ========= */
function ensureEndSpacer() {
  let spacer = content.querySelector("#scroll-extend-spacer");
  if (!spacer) {
    spacer = document.createElement("div");
    spacer.id = "scroll-extend-spacer";
    spacer.style.height = "0px";
    spacer.style.pointerEvents = "none";
    content.appendChild(spacer);
  }
  return spacer;
}
function updateLastHeadingSpacer() {
  const spacer = ensureEndSpacer();
  const heads = content.querySelectorAll("h2, h3, h4");
  if (!heads.length) { spacer.style.height = "0px"; return; }

  const last = heads[heads.length - 1];
  const lastAbsTop = last.getBoundingClientRect().top + window.scrollY;

  const tocTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--toc-top")) || 0;
  const desiredOffset = Math.max(20, tocTop);

  const yWant = lastAbsTop - desiredOffset;
  const vpH = window.innerHeight;
  const maxScrollNow = document.body.scrollHeight - vpH;

  let need = Math.ceil(yWant - maxScrollNow);
  if (need > 0) need += 16;
  spacer.style.height = `${Math.max(0, need)}px`;
}

/* ========= 6) TOC: генерация + клики ========= */
function buildTOC() {
  tocRoot.innerHTML = "";
  const headings = content.querySelectorAll("h2, h3, h4");

  if (!headings.length) {
    tocEl.classList.add("is-hidden");
    layoutEl.classList.add("layout--no-toc");
    headingsCache = [];
    ensureEndSpacer().style.height = "0px";
    return;
  }

  tocEl.classList.remove("is-hidden");
  layoutEl.classList.remove("layout--no-toc");

  headings.forEach((h) => {
    const id = ensureId(h);
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = h.textContent.trim();
    a.classList.add(`toc-${h.tagName.toLowerCase()}`);
    li.appendChild(a);
    tocRoot.appendChild(li);
  });

  // клик по TOC: мгновенная подсветка выбранного + быстрый плавный скролл
  tocRoot.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute("href").slice(1));
      if (!target) return;

      tocRoot.querySelectorAll("a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");

      scrollHeadingIntoViewSmooth(target, 220);
      history.replaceState(null, "", `#${target.id}`);
    });
  });

  computeHeadingPositions();
  updateLastHeadingSpacer();
  onScrollSpy();
}

/* ========= 7) Загрузка страниц ========= */
async function loadLab(urlLike) {
  content.innerHTML = `<p>Завантаження...</p>`;

  let url;
  try { url = new URL(urlLike, window.location.href).toString(); }
  catch { return showError("Некоректний шлях до файлу лабораторної."); }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { cache: "no-store", signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return showError(`Не вдалось завантажити (${res.status}).`);

    const html = (await res.text()).trim();
    if (!html) return showError();

    content.innerHTML = html;

    updateHeaderOffsetVar();
    buildTOC();

    // если есть hash — позиционируем быстро и плавно
    if (location.hash) {
      const target = content.querySelector(location.hash);
      if (target) await scrollHeadingIntoViewSmooth(target, 200);
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("[lab-load-error]", err, url);
    if (location.protocol === "file:") showError("Браузер блокує завантаження локальних файлів. Запусти локальний сервер.");
    else showError("Помилка мережі при завантаженні лабораторної.");
  }
}

/* ========= 8) Навигация + автозагрузка ========= */
buttons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const url = btn.dataset.lab;
    setActiveButton(btn);

    const labNum = url.match(/page(\d+)\.html$/)?.[1];
    const newUrl = new URL(location.href);
    if (labNum) newUrl.searchParams.set("lab", labNum);
    else newUrl.searchParams.delete("lab");
    history.replaceState(null, "", newUrl.toString());

    await loadLab(url);
  });
});

window.addEventListener("resize", () => {
  if (content.innerHTML.trim()) {
    computeHeadingPositions();
    updateLastHeadingSpacer();
    onScrollSpy();
  }
}, { passive: true });

window.addEventListener("DOMContentLoaded", () => {
  updateHeaderOffsetVar();

  const params = new URLSearchParams(location.search);
  const lab = params.get("lab") || "1";
  const targetBtn =
    Array.from(buttons).find((b) => (b.dataset.lab || "").endsWith(`page${lab}.html`)) ||
    buttons[0];

  setActiveButton(targetBtn);
  loadLab(targetBtn.dataset.lab);
});
