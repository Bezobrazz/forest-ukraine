import styles from "./RawMaterialsStatistics.module.css";
import Table from "../../../../components/Table/Table";

import useSuppliersStore from "../../../../components/stores/suppliersStore.js";

const RawMaterialsStatistics = () => {
  // const [isLoader, setIsLoader] = useState(false);

  const transactionsData = useSuppliersStore((state) => state.transactions);
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

      return acc;
    }, {});

    // Конвертуємо об'єкт в масив і рахуємо середню вартість
    return Object.values(groupedData).map((month) => ({
      ...month,
      averageCostBags:
        month.totalNumberBags > 0
          ? (month.totalCostBags / month.totalNumberBags).toFixed(2)
          : 0,
    }));
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
      <Table isLoader={false} columns={columns} data={statisticsData} />
    </div>
  );
};

export default RawMaterialsStatistics;
