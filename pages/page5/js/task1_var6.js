/**
 * Завдання 6
 * Створити текст та маркирований список із числовими значеннями.
 * При натисканні кнопки "Подвоїти" потрібно збільшити значення
 * у кожному елементі списку у два рази.
 * Повторне натискання кнопки знову подвоює всі значення.
 *
 * У звітному документі потрібно відобразити скрін роботи та програмного коду.
 */
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("numbers-list");
    const btnDouble = document.getElementById("btn-double");

    if (!list || !btnDouble) return;

    btnDouble.addEventListener("click", () => {
        const items = list.querySelectorAll("li");
        items.forEach(li => {
            const value = Number(li.textContent.trim());
            if (!Number.isNaN(value)) {
                li.textContent = String(value * 2);
            }
        });
    });
});
