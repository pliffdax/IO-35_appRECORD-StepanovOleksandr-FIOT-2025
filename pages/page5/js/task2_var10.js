/**
 * Завдання 10
 * Реалізувати створення й очищення колекції елементів.
 *
 * Умова:
 * - Поле input приймає число від 1 до 100.
 * - Кнопка Create створює колекцію кольорових <div>, кількість = значення input.
 * - Кнопка Destroy очищає колекцію.
 *
 * Вимоги до створення колекції:
 * - Перший <div> має розміри 30×30 px.
 * - Кожен наступний більший на 10px.
 * - Колір фону кожного елемента випадковий.
 *
 * Функції:
 * - createBoxes(amount) — створює колекцію блоків.
 * - destroyBoxes() — очищає div#boxes.
 *
 * У звітному документі потрібно відобразити скрін програми та коду.
 */
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("boxes-amount");
    const btnCreate = document.querySelector("[data-create]");
    const btnDestroy = document.querySelector("[data-destroy]");
    const boxesContainer = document.getElementById("boxes");

    if (!input || !btnCreate || !btnDestroy || !boxesContainer) return;

    function createBoxes(amount) {
        const baseSize = 30;
        const fragments = document.createDocumentFragment();

        for (let i = 0; i < amount; i += 1) {
            const size = baseSize + i * 10;
            const box = document.createElement("div");
            box.style.width = `${size}px`;
            box.style.height = `${size}px`;
            box.style.backgroundColor = getRandomHexColor();
            box.style.borderRadius = "4px";
            box.style.border = "1px solid rgba(0,0,0,0.1)";
            fragments.appendChild(box);
        }

        boxesContainer.innerHTML = "";
        boxesContainer.appendChild(fragments);
    }

    function destroyBoxes() {
        boxesContainer.innerHTML = "";
    }

    btnCreate.addEventListener("click", () => {
        const value = Number(input.value);
        if (Number.isNaN(value) || value < 1 || value > 100) {
            alert("Будь ласка, введіть число від 1 до 100.");
            return;
        }
        createBoxes(value);
        input.value = "";
    });

    btnDestroy.addEventListener("click", () => {
        destroyBoxes();
    });
});
