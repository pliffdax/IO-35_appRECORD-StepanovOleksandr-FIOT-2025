/**
 * Завдання 4
 * Потрібно створити текст, блок-квадрат (div) та дві кнопки.
 * Кнопка "Зменшити" робить квадрат меншим на 15px при кожному натисканні.
 * Кнопка "Збільшити" робить квадрат більшим на 15px при кожному натисканні.
 *
 * У звітному документі потрібно відобразити скрін роботи та програмного коду.
 */
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("resizable-box");
    const btnDecrease = document.getElementById("btn-decrease");
    const btnIncrease = document.getElementById("btn-increase");

    if (!box || !btnDecrease || !btnIncrease) return;

    const STEP = 15;

    function getSize() {
        const width = box.offsetWidth;
        const height = box.offsetHeight;
        return { width, height };
    }

    btnDecrease.addEventListener("click", () => {
        const { width, height } = getSize();
        const newWidth = Math.max(15, width - STEP);
        const newHeight = Math.max(15, height - STEP);
        box.style.width = newWidth + "px";
        box.style.height = newHeight + "px";
    });

    btnIncrease.addEventListener("click", () => {
        const { width, height } = getSize();
        box.style.width = width + STEP + "px";
        box.style.height = height + STEP + "px";
    });
});
