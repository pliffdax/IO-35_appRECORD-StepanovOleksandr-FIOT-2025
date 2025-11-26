/**
 * Завдання 1.2
 * Напишіть функцію getProductDetails, яка приймає ідентифікатор товару productId
 * та дві колбек-функції: successCallback і errorCallback.
 *
 * Функція повинна отримати деталі товару та передати їх у successCallback.
 * Якщо товар не знайдено — викликається errorCallback з повідомленням про помилку.
 */
const products = [
  { id: 1, name: "Ноутбук", price: 25000 },
  { id: 2, name: "Смартфон", price: 12000 },
  { id: 3, name: "Навушники", price: 1500 },
];

function getProductDetails(productId, successCallback, errorCallback) {
  const product = products.find((p) => p.id === productId);

  if (product) {
    successCallback(product);
  } else {
    errorCallback(`Товар з id=${productId} не знайдено`);
  }
}

// Демонстрація роботи
getProductDetails(
  2,
  (product) => console.log("✅ Знайдено товар:", product),
  (errorMessage) => console.log("❌ Помилка:", errorMessage)
);

getProductDetails(
  10,
  (product) => console.log("✅ Знайдено товар:", product),
  (errorMessage) => console.log("❌ Помилка:", errorMessage)
);
