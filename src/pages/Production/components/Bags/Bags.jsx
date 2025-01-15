import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

import ModalToggleForm from "./components/ModalToggleForm/ModalToggleForm.jsx";
import { useState } from "react";
import { InformationCard } from "../../../../components/InformationCard/InformationCard.jsx";
import Table from "../../../../components/Table/Table.jsx";
import { BsFillTrashFill } from "react-icons/bs";

export const Bags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const deleteChoosedOperation = (id) => {
    console.log("deleteChoosedOperation", id);
  };

  const columns = [
    {
      key: "operation",
      title: "Операція",
    },
    {
      key: "createdAt",
      title: "Дата",
    },
    { key: "price", title: "Ціна" },
    { key: "quantity", title: "Кількість" },
    { key: "deliveryPrice", title: "Вартість доставки" },
    { key: "sum", title: "Сума" },
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

  const data = [
    {
      id: 1,
      operation: "Додано",
      createdAt: "2023-02-01",
      price: 1000,
      quantity: 100,
      deliveryPrice: 100,
    },
    {
      id: 2,
      operation: "Списано",
      createdAt: "2023-02-01",
      quantity: 100,
    },
  ];

  data.forEach((item) => {
    item.sum = item.price * item.quantity + item.deliveryPrice;
    if (item.operation === "Списано") {
      return (item.sum = item.quantity);
    }
  });

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
        columns={columns}
        data={data}
        // isLoader={isLoader}
        sortBy="createdAt"
      />
    </div>
  );
};
