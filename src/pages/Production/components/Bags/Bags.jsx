import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

import ModalToggleForm from "./components/ModalToggleForm/ModalToggleForm.jsx";
import { useState } from "react";
import { InformationCard } from "../../../../components/InformationCard/InformationCard.jsx";

export const Bags = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

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
      <div className={styles.cardsWrapper}>
        <InformationCard title="Мішків на складі" description="1000" />
        <InformationCard title="Середня вартість мішка" description="1000" />
        <InformationCard
          title="Списано мішків"
          description="1000"
          bgcolor="var(--warning-color)"
        />
      </div>
      <ModalToggleForm
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};
