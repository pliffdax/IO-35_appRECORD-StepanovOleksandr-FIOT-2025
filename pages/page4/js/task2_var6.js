const users = [
  { name: "John", age: 27 },
  { name: "Jane", age: 31 },
  { name: "Bob", age: 19 },
];

const sortedByAge = [...users].sort((a, b) => a.age - b.age);

console.log("📊 Користувачі, відсортовані за віком:", sortedByAge);
// Очікуваний результат: [{Bob,19}, {John,27}, {Jane,31}]
