/**
 * Завдання 7
 * Дано список категорій: ul#categories.
 *
 * Потрібно створити скрипт, який:
 * 1) Порахує та виведе в консоль кількість категорій (кількість li.item).
 * 2) Для кожного елементa li.item знайде та виведе:
 *    - текст заголовка <h2>,
 *    - кількість вкладених <li>.
 *
 * Для виконання необхідно використовувати метод forEach()
 * та властивості навігації DOM.
 *
 * У звітному документі необхідно відобразити скрін програмного коду.
 */
document.addEventListener("DOMContentLoaded", () => {
    const categoriesList = document.getElementById("categories");
    if (!categoriesList) return;

    const items = categoriesList.querySelectorAll(".item");
    console.log("Завдання 7:");
    console.log("Number of categories:", items.length);

    items.forEach(item => {
        const titleElement = item.querySelector("h2");
        const innerItems = item.querySelectorAll("ul li");
        const title = titleElement ? titleElement.textContent.trim() : "(без назви)";
        console.log("Category:", title);
        console.log("Elements:", innerItems.length);
    });
});
