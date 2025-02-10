import styles from "./RawMaterialsStatistics.module.css";
import Table from "../../../../components/Table/Table";

import useSuppliersStore from "../../../../components/stores/suppliersStore.js";

const RawMaterialsStatistics = () => {
  // const [isLoader, setIsLoader] = useState(false);

  const transactionsData = useSuppliersStore((state) => state.transactions);
  console.log("transactionsData", transactionsData);

  const totalCostBags = transactionsData.reduce(
    (acc, transaction) => acc + (Number(transaction.totalSum) || 0),
    0
  );
  console.log("totalCostBags", totalCostBags);

  const totalNumberBags = transactionsData.reduce(
    (acc, transaction) => acc + (Number(transaction.readyBagsQuantity) || 0),
    0
  );
  console.log("totalNumberBags", totalNumberBags);

  const columns = [
    {
      key: "month",
      title: "Місяць",
    },
    {
      key: "totalCostBags",
      title: "Загальна вартість мішків",
    },
    {
      key: "totalNumberBags",
      title: "Загальна кількість мішків",
    },
    {
      key: "totalCostDelivery",
      title: "Загальна вартість доставки",
    },
  ];

  return (
    <div>
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
      <Table isLoader={false} columns={columns} data={[]} />
    </div>
  );
};

export default RawMaterialsStatistics;
