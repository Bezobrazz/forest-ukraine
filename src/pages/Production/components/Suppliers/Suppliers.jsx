import Button from "../../../../components/Button/Button.jsx";
import SearchInput from "../../../../components/SearchInput/SearchInput.jsx";
import styles from "./Suppliers.module.css";

export const Suppliers = () => {
  return (
    <div>
      <div>
        <div className={styles.searchWrapper}>
          <SearchInput
            placeholder="Пошук постачальників..."
            onSearch={() => {}}
          />
          <Button variant="secondary">Додати постачальника</Button>
        </div>
      </div>
    </div>
  );
};
