/**
 * Додаткове завдання — Делегування подій
 *
 * Потрібно створити колекцію товарів (карток).
 * При натисканні на будь-яку картку повинно відкриватися модальне вікно,
 * яке містить детальний опис товару:
 *    - назва,
 *    - опис,
 *    - ціна.
 *
 * Вимоги:
 * - Делегування подій: один обробник подій на <ul>.
 * - Виявлення елемента через event.target.closest(".product-card").
 * - Реалізувати відкриття та закриття модального вікна:
 *      - по кліку на хрестик,
 *      - по кліку на затемнений фон (overlay),
 *      - по натисканні Escape.
 *
 * У звітному документі додати скрін роботи і скрін коду.
 */
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("product-list");
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("modal-overlay");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalClose = document.getElementById("modal-close");

    if (!list || !modal || !overlay || !modalTitle || !modalDescription || !modalPrice || !modalClose) {
        return;
    }

    function openModal(title, description, price) {
        modalTitle.textContent = title || "";
        modalDescription.textContent = description || "";
        modalPrice.textContent = price || "";
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

    function closeModal() {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    list.addEventListener("click", event => {
        const card = event.target.closest(".product-card");
        if (!card || !list.contains(card)) {
            return;
        }

        const title = card.dataset.title || card.querySelector("h3")?.textContent || "";
        const description = card.dataset.description || "";
        const price = card.dataset.price || "";

        openModal(title, description, price);
    });

    modalClose.addEventListener("click", () => {
        closeModal();
    });

    overlay.addEventListener("click", () => {
        closeModal();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});
