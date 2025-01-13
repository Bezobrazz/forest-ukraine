import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

import ModalToggleForm from "./components/ModalToggleForm/ModalToggleForm.jsx";
import { useState } from "react";

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
      <ModalToggleForm
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};
