/**
 * Завдання 8
 * Потрібно реалізувати управління формою логіна.
 *
 * Вимоги:
 * - Обробка форми відбувається по події submit.
 * - Сторінка не повинна перезавантажуватися.
 * - Якщо хоча б одне поле порожнє — вивести alert:
 *   "All form fields must be filled in".
 * - Якщо всі поля заповнені, зібрати дані у об'єкт:
 *      { email: "...", password: "..." }
 *   і вивести його в консоль.
 * - Після успішного сабміту очистити форму через form.reset().
 *
 * Примітка: Не використовувати HTML-атрибут required,
 * валідація має бути виключно через JavaScript.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const { elements } = form;
        const emailInput = elements.namedItem("email");
        const passwordInput = elements.namedItem("password");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("All form fields must be filled in");
            return;
        }

        const data = {
            email,
            password
        };

        console.log("Завдання 8: об'єкт даних форми:", data);

        form.reset();
    });
});
