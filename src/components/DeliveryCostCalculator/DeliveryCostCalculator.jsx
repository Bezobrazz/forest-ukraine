import { useState, useEffect } from "react";
import styles from "./DeliveryCostCalculator.module.css";

const DeliveryCostCalculator = () => {
  // Стейт для зберігання даних про клієнтів та загальних даних
  const [clients, setClients] = useState([{ bags: 0, distance: 0 }]);
  const [totalDistance, setTotalDistance] = useState("");
  const [totalCost, setTotalCost] = useState(42000);
  const [maxCapacity, setMaxCapacity] = useState(2000);

  // Стейт для зберігання розрахунків
  const [clientCosts, setClientCosts] = useState([]);
  const [costPerBag, setCostPerBag] = useState([]);

  // Функція для розрахунку загального внеску всіх клієнтів
  const getTotalContribution = () => {
    return clients.reduce((sum, client) => {
      return sum + client.bags * client.distance;
    }, 0);
  };

  // Функція для розрахунку вартості доставки для кожного клієнта
  const calculateDeliveryCost = (bags, distance) => {
    const totalContribution = getTotalContribution();
    
    if (totalContribution > 0) {
      const clientContribution = bags * distance;
      return (clientContribution / totalContribution) * totalCost;
    }

    return 0;
  };

  // Функція для розрахунку вартості одного мішка для кожного клієнта
  const calculateCostPerOneBag = (bags, distance) => {
    if (bags === 0) return 0;

    const totalCostForClient = calculateDeliveryCost(bags, distance);
    return totalCostForClient / bags;
  };

  // Оновлення вартості в стейті при зміні даних клієнтів
  useEffect(() => {
    const updatedClientCosts = clients.map(client => 
      calculateDeliveryCost(client.bags, client.distance)
    );
    const updatedCostPerBag = clients.map(client => 
      calculateCostPerOneBag(client.bags, client.distance)
    );

    setClientCosts(updatedClientCosts);
    setCostPerBag(updatedCostPerBag);
  }, [clients, totalCost, totalDistance]);

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
      <h2 className={styles.header}>Delivery Cost Calculator</h2>
      
      <div className={styles.mainInput}>
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
      </div>

      <div className={styles.clientSection}>
        {clients.map((client, index) => (
          <div key={index} className={styles.clientCard}>
            <div className={styles.inputGroup}>
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
            <div className={styles.inputGroup}>
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
            <p className={styles.text}>Вартість доставки для клієнта {index + 1}: <span className={styles.deliveryInfo}>{clientCosts[index]?.toFixed(2)}</span>  грн</p>
            <p>Вартість доставки 1 мішка для клієнта {index + 1}: <span className={styles.deliveryInfo}>{costPerBag[index]?.toFixed(2)}</span>  грн</p>
          </div>
        ))}
      </div>

      <button onClick={addClient} className={styles.addButton}>
        Додати ще клієнта
      </button>
    </div>
  );
};

export default DeliveryCostCalculator;
