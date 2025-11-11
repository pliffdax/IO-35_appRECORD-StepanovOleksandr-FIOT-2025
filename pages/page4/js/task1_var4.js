const concerts = {
  Київ: new Date("2020-04-01"),
  Умань: new Date("2025-07-02"),
  Вінниця: new Date("2020-04-21"),
  Одеса: new Date("2025-03-15"),
  Хмельницький: new Date("2020-04-18"),
  Харків: new Date("2025-07-10"),
};

const now = new Date();

const upcomingCities = Object.entries(concerts)
  .filter(([, date]) => date > now)
  .sort(([, d1], [, d2]) => d1 - d2)
  .map(([city]) => city);

console.log("📅 Майбутні концерти (міста у хронологічному порядку):", upcomingCities);
