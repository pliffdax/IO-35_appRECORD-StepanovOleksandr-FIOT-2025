const content = document.getElementById("content");
const buttons = document.querySelectorAll("header nav button");
const tocRoot = document.querySelector("#toc .toc-list");
const tocEl = document.getElementById("toc");
const layoutEl = document.querySelector(".layout");

function showError(msg = "Немає контенту для цієї лабораторної.") {
  content.innerHTML = `<p class="error">${msg}</p>`;
  // При помилці — ховаємо TOC і робимо один стовпець
  if (tocEl && layoutEl) {
    tocEl.classList.add("is-hidden");
    layoutEl.classList.add("layout--no-toc");
  }
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

let spyObserver;
function initScrollSpy(headings) {
  if (spyObserver) spyObserver.disconnect();
  const options = { root: null, rootMargin: "0px 0px -65% 0px", threshold: 0 };
  spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = tocRoot.querySelector(`a[href="#${CSS.escape(id)}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        tocRoot.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, options);
  headings.forEach((h) => spyObserver.observe(h));
}

// === Головне: будуємо TOC і керуємо його видимістю ===
function buildTOC() {
  tocRoot.innerHTML = "";
  const headings = content.querySelectorAll("h2, h3, h4");

  if (!headings.length) {
    // Немає заголовків → ховаємо TOC і один стовпець
    tocEl.classList.add("is-hidden");
    layoutEl.classList.add("layout--no-toc");
    if (spyObserver) spyObserver.disconnect();
    return;
  }

  // Є заголовки → показуємо TOC і дві колонки
  tocEl.classList.remove("is-hidden");
  layoutEl.classList.remove("layout--no-toc");

  headings.forEach((h) => {
    const id = ensureId(h);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = h.textContent.trim();
    a.classList.add(`toc-${h.tagName.toLowerCase()}`);
    li.appendChild(a);
    tocRoot.appendChild(li);
  });

  tocRoot.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute("href").slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${target.id}`);
      }
    });
  });

  initScrollSpy(headings);
}

async function loadLab(url) {
  content.innerHTML = `<p>Завантаження...</p>`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { cache: "no-store", signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return showError();

    const html = (await res.text()).trim();
    if (!html) return showError();

    content.innerHTML = html;

    // Після вставки — будуємо TOC (він сам вирішить: показати чи сховати)
    buildTOC();

    if (location.hash) {
      const target = content.querySelector(location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (err) {
    clearTimeout(timeoutId);
    showError();
    console.error("[lab-load-error]", err);
  }
}

// Обробники кліків + автозавантаження як і раніше
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

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const lab = params.get("lab") || "1";
  const targetBtn =
    Array.from(buttons).find((b) => (b.dataset.lab || "").endsWith(`page${lab}.html`)) ||
    buttons[0];

  setActiveButton(targetBtn);
  loadLab(targetBtn.dataset.lab);
});
