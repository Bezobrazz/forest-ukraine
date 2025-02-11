import styles from "./RawMaterialsStatistics.module.css";
import Table from "../../../../components/Table/Table";
import { useState, useEffect } from "react";
import { getAllTransactions } from "../../../../Firebase/Suppliers/SuppliersService.js";
import { errorNotify } from "../../../../components/Notifications/Notifications.js";

import useSuppliersStore from "../../../../components/stores/suppliersStore.js";

const RawMaterialsStatistics = () => {
  const [isLoader, setIsLoader] = useState(false);
  const transactionsData = useSuppliersStore((state) => state.transactions);
  const setTransactionsData = useSuppliersStore(
    (state) => state.setTransactions
  );

  const fetchTransactions = async () => {
    try {
      setIsLoader(true);
      const transactions = await getAllTransactions();
      setTransactionsData(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      errorNotify("Помилка при завантаженні операцій!", 2000);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log("transactionsData", transactionsData);

  // const totalCostBags = transactionsData.reduce(
  //   (acc, transaction) => acc + (Number(transaction.totalSum) || 0),
  //   0
  // );
  // console.log("totalCostBags", totalCostBags);

  const totalNumberBags = transactionsData.reduce(
    (acc, transaction) => acc + (Number(transaction.readyBagsQuantity) || 0),
    0
  );
  console.log("totalNumberBags", totalNumberBags);

  const calculateTotalCostByPeriod = (transactions) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Фільтруємо транзакції за поточним місяцем
    const currentMonthTransactions = transactions.filter((transaction) => {
      const operationDate = new Date(transaction.operationDate);
      return (
        operationDate.getFullYear() === currentYear &&
        operationDate.getMonth() === currentMonth
      );
    });

    // Рахуємо загальну суму за місяць
    const totalCost = currentMonthTransactions.reduce((sum, transaction) => {
      const price = parseFloat(transaction.bagPrice) || 0;
      const quantity = parseInt(transaction.readyBagsQuantity) || 0;
      return sum + price * quantity;
    }, 0);

    return totalCost;
  };

  const groupTransactionsByMonth = (transactions) => {
    // Додаємо логування для перевірки вхідних даних
    console.log("Transactions for grouping:", transactions);

    const monthNames = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];

    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.operationDate);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
          totalCostBags: 0,
          totalNumberBags: 0,
          totalCostDelivery: 0,
          averageCostBags: 0,
        };
      }

      const price = parseFloat(transaction.bagPrice) || 0;
      const quantity = parseInt(transaction.readyBagsQuantity) || 0;

      acc[monthKey].totalCostBags += price * quantity;
      acc[monthKey].totalNumberBags += quantity;

      // Розраховуємо середню вартість
      if (acc[monthKey].totalNumberBags > 0) {
        acc[monthKey].averageCostBags =
          acc[monthKey].totalCostBags / acc[monthKey].totalNumberBags;
      }

      return acc;
    }, {});

    const result = Object.values(groupedData);

    return result;
  };

  const statisticsData = groupTransactionsByMonth(transactionsData);

  const columns = [
    {
      key: "month",
      title: "Місяць",
    },
    {
      key: "totalCostBags",
      title: "Вартість мішків",
      render: (value) =>
        value.toLocaleString("uk-UA", { style: "currency", currency: "UAH" }),
    },
    {
      key: "totalNumberBags",
      title: "Кількість мішків",
    },
    {
      key: "totalCostDelivery",
      title: "Вартість доставки",
    },
    {
      key: "averageCostBags",
      title: "Середня вартість мішка",
      render: (value) =>
        value.toLocaleString("uk-UA", { style: "currency", currency: "UAH" }),
    },
  ];

  return (
    <div>
      <h2>
        Загальна сума за поточний місяць:{" "}
        {calculateTotalCostByPeriod(transactionsData)} грн
      </h2>
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          {/* <SearchInput
            placeholder="Пошук постачальників..."
            value={searchValue}
            onSearch={searchSupplier}
          />
          <Button
            variant={filterPeriod === "month" ? "secondary" : "primary"}
            width="150px"
            onClick={() => setFilterPeriod("month")}
            title="Показати операції за поточний місяць"
          >
            Місяць
          </Button>
          <Button
            variant={filterPeriod === "year" ? "secondary" : "primary"}
            width="150px"
            onClick={() => setFilterPeriod("year")}
            title="Показати операції за поточний рік"
          >
            Рік
          </Button> */}
        </div>
        {/* <Button variant="primary" width="230px">
			Додати операцію
		</Button> */}
      </div>
      <Table isLoader={isLoader} columns={columns} data={statisticsData} />
    </div>
  );
};

export default RawMaterialsStatistics;
