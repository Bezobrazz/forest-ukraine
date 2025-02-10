import styles from "./Operations.module.css";

import Table from "../../../../components/Table/Table.jsx";
import { useState, useEffect } from "react";
import useSuppliersStore from "../../../../components/stores/suppliersStore.js";
import { getAllTransactions } from "../../../../Firebase/Suppliers/SuppliersService.js";
import {
  errorNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteTransaction } from "../../../../Firebase/Suppliers/SuppliersService.js";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import Button from "../../../../components/Button/Button.jsx";

export const Operations = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("month");
  const transactionsData = useSuppliersStore((state) => state.transactions);
  const setTransactionsData = useSuppliersStore(
    (state) => state.setTransactions
  );

  console.log("transactionsData", transactionsData);

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

  const deleteChoosedOperation = async (id) => {
    const operationToDelete = transactionsData.find(
      (operation) => operation.id === id
    );
    if (!operationToDelete) {
      errorNotify("Операція із заданим ID не знайдена!", 2000);
      return;
    }
    const isConfirmed = window.confirm(
      `Ви впевнені, що хочете видалити операцію?`
    );
    if (!isConfirmed) return;
    try {
      await deleteTransaction(operationToDelete.supplierId, id);
      successNotify("Операція успішно видалена!", 1000);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting operation:", error);
      errorNotify("Помилка при видаленні операції!", 2000);
    }
  };

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
    {
      key: "action",
      title: "",
      render: (text, record) => (
        <button
          className={styles.trashButton}
          onClick={() => deleteChoosedOperation(record.id)}
        >
          <BsFillTrashFill />
        </button>
      ),
    },
  ];

  const searchSupplier = (value) => {
    setSearchValue(value);
  };

  const searchedTransactions = transactionsData.filter((transaction) =>
    transaction.supplierName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filterDataByPeriod = (data) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return data.filter((item) => {
      const operationDate = new Date(item.operationDate);

      switch (filterPeriod) {
        case "month":
          return (
            operationDate.getFullYear() === currentYear &&
            operationDate.getMonth() === currentMonth
          );
        case "year":
          return operationDate.getFullYear() === currentYear;
        default:
          return true;
      }
    });
  };

  const data = searchValue ? searchedTransactions : transactionsData;
  const filteredData = filterDataByPeriod(data);

  const sortedData = [...filteredData].sort((a, b) => {
    return new Date(b.operationDate) - new Date(a.operationDate);
  });

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <SearchInput
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
          </Button>
        </div>
        {/* <Button variant="primary" width="230px">
          Додати операцію
        </Button> */}
      </div>
      <Table isLoader={isLoader} columns={columns} data={sortedData} />
    </div>
  );
};
