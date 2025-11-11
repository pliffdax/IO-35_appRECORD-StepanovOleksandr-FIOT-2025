const people = [
  { name: "John", age: 27 },
  { name: "Jane", age: 31 },
  { name: "Bob", age: 19 },
];

const hasUnder20 = people.some((person) => person.age < 20);

console.log("👥 Чи є людина молодше 20 років?", hasUnder20); // true
