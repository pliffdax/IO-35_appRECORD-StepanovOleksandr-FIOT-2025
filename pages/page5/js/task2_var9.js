/**
 * Завдання 9
 * Потрібно реалізувати зміну кольору фону елемента <body> при натисканні кнопки.
 *
 * Вимоги:
 * - Кнопка .change-color повинна по кліку:
 *     1) Генерувати випадковий hex-колір (через функцію getRandomHexColor()).
 *     2) Змінювати фон <body> на цей колір.
 *     3) Записувати значення кольору у <span class="color">.
 *
 * У звітному документі необхідно відобразити скрін програмного коду.
 */
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".change-color");
    const spanColor = document.querySelector(".color");

    if (!button || !spanColor) return;

    button.addEventListener("click", () => {
        const newColor = getRandomHexColor();
        document.body.style.backgroundColor = newColor;
        spanColor.textContent = newColor;
        console.log("Завдання 9: новий колір фону:", newColor);
    });
});
