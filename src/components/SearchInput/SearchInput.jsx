import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  placeholder = "Пошук...",
  onSearch,
  debounceDelay = 300,
}) => {
  const [query, setQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    setDebounceTimer(timer);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
      <span className={styles.iconContainer}>
        <BiSearchAlt />{" "}
      </span>
    </div>
  );
};

export default SearchInput;
