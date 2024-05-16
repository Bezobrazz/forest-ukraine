const TotalClientCost = () => {
  // Вартість доставки за кожного клієнта
  const totalDistance = 830; // км
  const totalCost = 42000; // грн
  const maxCapacity = 2400; // мішків

  // Перший клієнт
  const bagsClient1 = 800;
  const distanceClient1 = 700;
  const costPerKm = totalCost / totalDistance;
  const costPerBagClient1 = (costPerKm * distanceClient1) / maxCapacity;

  // Другий клієнт
  const bagsClient2 = 1100;
  const distanceClient2 = 830;
  const costPerBagClient2 = (costPerKm * distanceClient2) / maxCapacity;

  // Третій клієнт
  const bagsClient3 = 500;
  const distanceClient3 = 840;
  const costPerBagClient3 = (costPerKm * distanceClient3) / maxCapacity;

  // Загальна вартість доставки для кожного клієнта
  const totalCostClient1 = bagsClient1 * costPerBagClient1;
  const totalCostClient2 = bagsClient2 * costPerBagClient2;
  const totalCostClient3 = bagsClient3 * costPerBagClient3;

  console.log(`Вартість доставки для першого клієнта: ${totalCostClient1} грн`);
  console.log(`Вартість доставки для другого клієнта: ${totalCostClient2} грн`);
  console.log(
    `Вартість доставки для третього клієнта: ${totalCostClient3} грн`
  );

  return (
    <div>
      <h2>${totalCostClient1}</h2>
      <h2>${totalCostClient2}</h2>
      <h2>${totalCostClient3}</h2>
    </div>
  );
};

export default TotalClientCost;
