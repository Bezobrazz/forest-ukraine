import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

import ModalToggleForm from "./components/ModalToggleForm/ModalToggleForm.jsx";
import { useState, useEffect } from "react";
import { InformationCard } from "../../../../components/InformationCard/InformationCard.jsx";
import Table from "../../../../components/Table/Table.jsx";
import { BsFillTrashFill } from "react-icons/bs";
import {
  getBagOperations,
  addBagOperation,
} from "../../../../Firebase/Bags/BagsService.js";
import { bagsOperations } from "../../../../components/State.js";
import {
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";

export const Bags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [operationDate, setOperationDate] = useState(
    new Date().toLocaleDateString()
  );
  const [operationType, setOperationType] = useState("");
  const [bagPrice, setBagPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");

  const setInitialInputValuesState = () => {
    setOperationDate(new Date().toLocaleDateString());
    setOperationType("");
    setBagPrice("");
    setQuantity("");
    setDeliveryCost("");
  };

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const deleteChoosedOperation = (id) => {
    console.log("deleteChoosedOperation", id);
  };

  const getBagOperationsList = async (documentId) => {
    try {
      const bagOperationsList = await getBagOperations(documentId);
      console.log("Отримані дані з Firebase:", bagOperationsList); // Перевіряємо, що приходить із Firebase
      if (bagsOperations === 0) {
        console.log("No operations found.");
      } else {
        bagsOperations.value = bagOperationsList;
        console.log("Значення сигналу після оновлення:", bagsOperations.value); // Перевіряємо, чи оновлюється сигнал
      }
    } catch (error) {
      console.error("Error fetching bag operations:", error);
      errorNotify("Помилка при завантаженні операцій!", 2000);
    }
  };

  useEffect(() => {
    getBagOperationsList("summary").then(() => {
      console.log("Операції завантажені", bagsOperations.value);
    });
  }, []);

  const addNewBagsOperation = async () => {
    if (!operationDate || !bagPrice || !quantity) {
      infoNotify("Будь ласка, заповніть обов'язкові поля!", 2000);
      return;
    }

    const priceInCents = Math.round(parseFloat(bagPrice) * 100);
    const deliveryCostInCents = Math.round(parseFloat(deliveryCost) * 100);

    try {
      const totalCostInCents =
        priceInCents * quantity + deliveryCostInCents * quantity;
      const totalCost = totalCostInCents / 100;

      const newBagsOperation = {
        type: operationType,
        date: operationDate,
        bagPrice: parseFloat(bagPrice),
        quantity: parseInt(quantity),
        deliveryCost: parseFloat(deliveryCost || 0),
        totalCost: totalCost,
      };
      console.log("Додавання нової операції:", newBagsOperation); // Лог нової операції
      await addBagOperation("summary", newBagsOperation);
      getBagOperations("summary");
      setInitialInputValuesState();
      setIsOpenModal(false);
      successNotify("Операція успішно додана!", 2000);
    } catch (error) {
      console.error("Error adding bags operation:", error);
      errorNotify("Помилка при додаванні операції!", 2000);
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
    },
    { key: "bagPrice", title: "Ціна" },
    { key: "quantity", title: "Кількість" },
    { key: "deliveryCost", title: "Вартість доставки" },
    { key: "totalCost", title: "Сума" },
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
        setInitialInputValuesState={setInitialInputValuesState}
        operationDate={operationDate}
        setOperationDate={setOperationDate}
        setOperationType={setOperationType}
        bagPrice={bagPrice}
        setBagPrice={setBagPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        deliveryCost={deliveryCost}
        setDeliveryCost={setDeliveryCost}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        addNewBagsOperation={addNewBagsOperation}
      />

      <div className={styles.cardsWrapper}>
        <InformationCard title="Мішків на складі" description="1000" />
        <InformationCard
          title="Списано мішків"
          description="1000"
          bgcolor="var(--warning-color)"
        />
      </div>

      <Table
        key={bagsOperations.value.length}
        columns={columns}
        data={bagsOperations.value}
        // isLoader={isLoader}
        sortBy="date"
      />
    </div>
  );
};
