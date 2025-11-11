function Storage(initialItems) {
  this.items = Array.isArray(initialItems) ? [...initialItems] : [];
}

Storage.prototype.getItems = function () {
  return this.items;
};

Storage.prototype.addItem = function (item) {
  this.items.push(item);
};

Storage.prototype.removeItem = function (item) {
  this.items = this.items.filter((i) => i !== item);
};

// Демонстрація роботи
const storage = new Storage(["apple", "banana", "mango"]);
console.log("📦 Початкові товари на складі:", storage.getItems());
storage.addItem("peach");
console.log("📦 Після додавання 'peach':", storage.getItems());
storage.removeItem("banana");
console.log("📦 Після видалення 'banana':", storage.getItems());
