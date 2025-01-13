import styles from "./Bags.module.css";
import Button from "../../../../components/Button/Button.jsx";
import { useMediaQuery } from "react-responsive";

export const Bags = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  return (
    <div>
      <div className={styles.topBar}>
        <Button
          variant="primary"
          width={isMobile ? "100%" : "230px"}
          // onClick={handleOpenAddModal}
        >
          Додати постачальника
        </Button>
      </div>
    </div>
  );
};
