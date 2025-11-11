class Calculator {
  constructor() {
    this._value = 0;
  }

  number(value) {
    this._value = Number(value);
    return this;
  }

  getResult() {
    return this._value;
  }

  add(value) {
    this._value += Number(value);
    return this;
  }

  subtract(value) {
    this._value -= Number(value);
    return this;
  }

  multiply(value) {
    this._value *= Number(value);
    return this;
  }

  divide(value) {
    const num = Number(value);
    if (num === 0) {
      throw new Error("Ділення на 0 неможливе");
    }
    this._value /= num;
    return this;
  }
}

// Демонстрація роботи
const calc = new Calculator();
const result = calc
  .number(10)    // 10
  .add(5)        // 15
  .subtract(3)   // 12
  .multiply(4)   // 48
  .divide(2)     // 24
  .getResult();

console.log("🧮 Результат обчислень Calculator:", result); // 24
