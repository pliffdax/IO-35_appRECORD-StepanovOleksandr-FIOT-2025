const content = document.getElementById("content");

document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", async () => {
    const url = btn.dataset.lab;
    content.innerHTML = `<p>Завантаження...</p>`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      content.innerHTML = html;
    } catch (err) {
      content.innerHTML = `<p>Немає контенту для цієї лабораторної.</p>`;
    }
  });
});
