/**
 * Завдання 1.10
 * Напишіть функцію checkBrackets(str), яка перевіряє правильність закриття дужок:
 * (), {}, [] у рядку JavaScript-коду.
 *
 * Якщо код коректний — повертає true.
 * В іншому випадку — false.
 */
function checkBrackets(str) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of str) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// Демонстрація роботи
const example1 = "function test() { return [1, 2, 3]; }";
const example2 = "function fail( { ] }";

console.log(`🔍 Рядок 1: "${example1}" →`, checkBrackets(example1));
console.log(`🔍 Рядок 2: "${example2}" →`, checkBrackets(example2));
