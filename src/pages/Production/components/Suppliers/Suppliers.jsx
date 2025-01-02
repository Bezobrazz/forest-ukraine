import { BiSort } from "react-icons/bi";
import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";

export const Suppliers = () => {
  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <SearchInput
            placeholder="Пошук постачальників..."
            onSearch={() => {}}
          />
          <Button variant="secondary">
            <BiSort />
          </Button>
        </div>
        <Button variant="primary">Додати постачальника</Button>
      </div>
    </div>
  );
};
