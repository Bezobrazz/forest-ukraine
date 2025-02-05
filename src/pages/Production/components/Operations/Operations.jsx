import styles from "./Operations.module.css";
import Button from "../../../../components/Button/Button.jsx";
import Table from "../../../../components/Table/Table.jsx";
import { useState, useEffect } from "react";
import useSuppliersStore from "../../../../components/stores/suppliersStore.js";
import { getAllTransactions } from "../../../../Firebase/Suppliers/SuppliersService.js";
import { errorNotify } from "../../../../components/Notifications/Notifications.js";

export const Operations = () => {
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

  const columns = [
    {
      key: "operationDate",
      title: "Дата",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      key: "supplierName",
      title: "Постачальник",
    },
    {
      key: "readyBagsQuantity",
      title: "Кількість готових мішків",
    },
    {
      key: "bagPrice",
      title: "Ціна за мішок",
    },
    {
      key: "totalSum",
      title: "Сума",
    },
    {
      key: "rawBagsQuantity",
      title: "Мішки для сировини",
    },
    {
      key: "advance",
      title: "Аванс",
    },
  ];

  return (
    <div>
      <div className={styles.topBar}>
        <Button variant="primary" width="230px">
          Додати операцію
        </Button>
      </div>
      <Table
        isLoader={isLoader}
        columns={columns}
        data={transactionsData}
        sortBy="operationDate"
      />
    </div>
  );
};
