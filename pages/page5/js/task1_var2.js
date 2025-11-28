/**
 * Завдання 2
 * Напишіть функцію getProductDetails, яка приймає ідентифікатор товару productId
 * та дві колбек-функції: successCallback і errorCallback.
 *
 * Функція повинна отримати деталі товару та передати їх у successCallback.
 * Якщо товар не знайдено — викликається errorCallback з повідомленням про помилку.
 */
document.addEventListener("DOMContentLoaded", () => {
    const input1 = document.getElementById("swap-input-1");
    const input2 = document.getElementById("swap-input-2");
    const btnSwap = document.getElementById("swap-btn");

    if (!input1 || !input2 || !btnSwap) return;

    btnSwap.addEventListener("click", () => {
        const temp = input1.value;
        input1.value = input2.value;
        input2.value = temp;
        console.log("Завдання 2: після обміну:", {
            first: input1.value,
            second: input2.value
        });
    });
});
