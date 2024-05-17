import { useState } from "react";
import styles from "./DeliveryCostCalculator.module.css";

const DeliveryCostCalculator = () => {
  // Стейт для зберігання даних про клієнтів та загальних даних
  const [clients, setClients] = useState([{ bags: 0, distance: 0 }]);
  const [totalDistance, setTotalDistance] = useState("");
  const [totalCost, setTotalCost] = useState(42000);
  const [maxCapacity, setMaxCapacity] = useState(2400);

  // Функція для розрахунку вартості доставки для кожного клієнта
  const calculateDeliveryCost = (bags, distance) => {
    const costPerKm = totalCost / totalDistance;
    const costPerBag = (costPerKm * distance) / maxCapacity;

    return bags * costPerBag;
  };

  // Функція для додавання нового клієнта
  const addClient = () => {
    const newClients = [...clients, { bags: 0, distance: 0 }];
    setClients(newClients);
  };

  // Функція для оновлення даних про клієнта
  const handleClientChange = (index, field, value) => {
    const updatedClients = [...clients];
    updatedClients[index][field] = value;
    setClients(updatedClients);
  };

  return (
    <div className={styles.container}>
      <h2>Введіть дані для розрахунку вартості доставки:</h2>
      <div className={styles.inputGroup}>
        <label>Загальна відстань (км):</label>
        <input
          type="number"
          value={totalDistance}
          onChange={(e) => setTotalDistance(parseInt(e.target.value))}
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Загальна вартість (грн):</label>
        <input
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(parseInt(e.target.value))}
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Максимальна вмістимість машини (мішків):</label>
        <input
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
          className={styles.input}
        />
      </div>
      {clients.map((client, index) => (
        <div key={index} className={styles.client}>
          <div className={styles.inputClientWrapper}>
            <label>Кількість мішків для клієнта {index + 1}:</label>
            <input
              type="number"
              value={client.bags}
              onChange={(e) =>
                handleClientChange(index, "bags", parseInt(e.target.value))
              }
              className={styles.input}
            />
          </div>
          <div className={styles.inputClientWrapper}>
            <label>Відстань для клієнта {index + 1} (км):</label>
            <input
              type="number"
              value={client.distance}
              onChange={(e) =>
                handleClientChange(index, "distance", parseInt(e.target.value))
              }
              className={styles.input}
            />
          </div>
          <p>
            Вартість доставки для клієнта {index + 1}:{" "}
            {calculateDeliveryCost(client.bags, client.distance).toFixed(2)} грн
          </p>
        </div>
      ))}
      <button onClick={addClient} className={styles.addButton}>
        Додати ще клієнта
      </button>
    </div>
  );
};

export default DeliveryCostCalculator;
