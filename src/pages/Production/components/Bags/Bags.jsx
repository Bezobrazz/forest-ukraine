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
  deleteBagOperation,
} from "../../../../Firebase/Bags/BagsService.js";
import {
  errorNotify,
  infoNotify,
  successNotify,
} from "../../../../components/Notifications/Notifications.js";
import useBagsStore from "../../../../components/stores/bagsStore.js";

export const Bags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [operationDate, setOperationDate] = useState(new Date());
  const [operationType, setOperationType] = useState("Додано");
  const [bagPrice, setBagPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");

  const { bagsOperations, setBagsOperationsState } = useBagsStore();

  const setInitialInputValuesState = () => {
    setOperationDate(new Date().toLocaleDateString());
    setBagPrice("");
    setQuantity("");
    setDeliveryCost("");
  };

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const getBagOperationsList = async (documentId) => {
    try {
      const bagOperationsList = await getBagOperations(documentId);
      console.log("Отримані дані з Firebase:", bagOperationsList);
      setBagsOperationsState(bagOperationsList);
    } catch (error) {
      console.error("Error fetching bag operations:", error);
      errorNotify("Помилка при завантаженні операцій!", 2000);
    }
  };

  useEffect(() => {
    getBagOperationsList("summary");
  }, [setBagsOperationsState]);

  const addNewBagsOperation = async () => {
    if (!operationDate || !bagPrice || !quantity) {
      infoNotify("Будь ласка, заповніть обов'язкові поля!", 2000);
      return;
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
      };

      console.log("Додавання нової операції:", newBagsOperation);
      await addBagOperation("summary", newBagsOperation);
      getBagOperationsList("summary");
      setInitialInputValuesState();
      setIsOpenModal(false);
      successNotify("Операція успішно додана!", 2000);
    } catch (error) {
      console.error("Error adding bags operation:", error);
      errorNotify("Помилка при додаванні операції!", 2000);
    }
  };

  const deleteBagOperationItem = async (id) => {
    try {
      await deleteBagOperation("summary", id);
      getBagOperationsList("summary");
      successNotify("Операція успішно видалена!", 2000);
    } catch (error) {
      console.error("Error deleting bag operation:", error);
      errorNotify("Помилка при видаленні операції!", 2000);
    }
  };

  const columns = [
    { key: "type", title: "Операція" },
    { key: "date", title: "Дата" },
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
          onClick={() => deleteBagOperationItem(record.id)}
        >
          <BsFillTrashFill />
        </button>
      ),
    },
  ];

  console.log("bagsOperations", typeof bagsOperations);

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
        operationType={operationType}
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
        key={bagsOperations.length}
        columns={columns}
        data={bagsOperations || []}
        sortBy="date"
      />
    </div>
  );
};
