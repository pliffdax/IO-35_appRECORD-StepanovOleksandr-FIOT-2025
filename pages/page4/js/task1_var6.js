const medicines = [
  { name: "Noshpa", price: 170 },
  { name: "Analgin", price: 55 },
  { name: "Quanil", price: 310 },
  { name: "Alphacholine", price: 390 },
];

const updatedMedicines = medicines.map((med, index) => {
  const hasDiscount = med.price > 300;
  const newPrice = hasDiscount ? med.price * 0.7 : med.price;

  return {
    ...med,
    id: index + 1,
    price: Number(newPrice.toFixed(2)),
    discountApplied: hasDiscount,
  };
});

console.log("💊 Оновлений список медикаментів зі знижками:", updatedMedicines);
