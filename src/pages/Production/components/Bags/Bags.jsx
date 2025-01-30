import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

import ModalToggleForm from "./components/ModalToggleForm/ModalToggleForm.jsx";
import { useState, useCallback, useEffect } from "react";
import { InformationCard } from "../../../../components/InformationCard/InformationCard.jsx";
import Table from "../../../../components/Table/Table.jsx";
import { BsFillTrashFill } from "react-icons/bs";
import {
  getBagOperations,
  addBagOperation,
  deleteBagOperation,
} from "../../../../Firebase/Bags/BagsService.js";

import { serverTimestamp } from "firebase/firestore";
import {
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";
import useBagsStore from "../../../../components/stores/bagsStore.js";
import { ToastContainer } from "react-toastify";

export const Bags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const bagsOperations = useBagsStore((state) => state.bagsOperations);
  const setBagsOperationsState = useBagsStore(
    (state) => state.setBagsOperationsState
  );
  const totalBagsInStock = useBagsStore((state) => state.totalBagsInStock);
  const totalBagsUtilized = useBagsStore((state) => state.totalBagsUtilized);

  console.log("bagsOperations", bagsOperations);
  console.log("totalBagsInStock", totalBagsInStock);

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const getBagOperationsList = useCallback(
    async (documentId) => {
      try {
        const bagOperationsList = await getBagOperations(documentId);
        setBagsOperationsState(bagOperationsList);
      } catch (error) {
        console.error("Error fetching bag operations:", error);
        errorNotify("Помилка при завантаженні операцій!", 2000);
      }
    },
    [setBagsOperationsState]
  );

  useEffect(() => {
    getBagOperationsList("summary");
  }, [getBagOperationsList]);

  const addNewBagsOperation = async (
    operationDate,
    operationType,
    bagPrice,
    quantity,
    deliveryCost
  ) => {
    if (operationType === "Додано") {
      if (!operationDate || !bagPrice || !quantity) {
        infoNotify("Будь ласка, заповніть обов'язкові поля для Додано", 2000);
        return;
      }
    } else {
      if (!operationDate || !quantity) {
        infoNotify("Будь ласка, заповніть обов'язкові поля для Списано!", 2000);
        return;
      }
    }

    const priceInCents = Math.round(parseFloat(bagPrice) * 100);
    const deliveryCostInCents = Math.round(parseFloat(deliveryCost || 0) * 100);

    try {
      const totalCostInCents = priceInCents * quantity + deliveryCostInCents;
      const totalCost = totalCostInCents / 100;

      const newBagsOperation = {
        type: operationType,
        date: operationDate,
        bagPrice: parseFloat(bagPrice),
        quantity: parseInt(quantity),
        deliveryCost: parseFloat(deliveryCost || 0),
        totalCost: totalCost,
        createdAt: serverTimestamp(),
      };

      await addBagOperation("summary", newBagsOperation);
      getBagOperationsList("summary");
      setIsOpenModal(false);
      successNotify("Операція успішно додана!", 2000);
    } catch (error) {
      console.error("Error adding bags operation:", error);
      errorNotify("Помилка при додаванні операції!", 2000);
    }
  };

  const deleteBagOperationItem = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Ви впевнені, що хочете видалити цю операцію?"
      );
      if (!confirmDelete) {
        return;
      }

      await deleteBagOperation("summary", id);
      getBagOperationsList("summary");
      successNotify("Операція успішно видалена!", 2000);
    } catch (error) {
      console.error("Error deleting bag operation:", error);
      errorNotify("Помилка при видаленні операції!", 2000);
    }
  };

  const columns = [
    {
      key: "type",
      title: "Операція",
    },
    {
      key: "date",
      title: "Дата",
      render: (value) => {
        const [year, month, day] = value.split("T")[0].split("-");
        return `${day}.${month}.${year}`;
      },
    },
    { key: "bagPrice", title: "Ціна (грн)", render: (value) => `${value}` },
    {
      key: "quantity",
      title: "Кількість (шт)",
      render: (value) => `${value.toLocaleString()}`,
    },
    {
      key: "deliveryCost",
      title: "Вартість доставки (грн)",
      render: (value) => `${value.toLocaleString()}`,
    },
    {
      key: "totalCost",
      title: "Сума (грн)",
      render: (value) => `${value.toLocaleString()}`,
    },
    {
      key: "action",
      title: "",
      render: (text, record) => (
        <button
          className={styles.trashButton}
          onClick={() => deleteBagOperationItem(record.id)}
        >
          <BsFillTrashFill />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.topBar}>
        <Button
          variant="primary"
          width={isMobile ? "100%" : "230px"}
          onClick={() => setIsOpenModal(true)}
        >
          Додати операцію
        </Button>
      </div>

      <ModalToggleForm
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        addNewBagsOperation={addNewBagsOperation}
      />

      <div className={styles.cardsWrapper}>
        <InformationCard
          title="Мішків на складі"
          description={totalBagsInStock.toLocaleString()}
        />
        <InformationCard
          title="Списано мішків"
          description={totalBagsUtilized.toLocaleString()}
          bgcolor="var(--warning-color)"
        />
      </div>

      <Table
        key={bagsOperations.length}
        columns={columns}
        data={(() => {
          console.log("Data being rendered in Table:", bagsOperations);
          return bagsOperations || [];
        })()}
      />
      <ToastContainer />
    </div>
  );
};
