import styles from "./Operations.module.css";
import Button from "../../../../components/Button/Button.jsx";

export const Operations = () => {
  return (
    <div>
      <div className={styles.topBar}>
        <Button variant="primary" width="230px">
          Додати операцію
        </Button>
      </div>
    </div>
  );
};
