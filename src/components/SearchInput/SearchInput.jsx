import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
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
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "12px",
          transform: "translateY(-50%)",
          color: "var(--primary-color)",
          pointerEvents: "none",
        }}
      >
        <BiSearchAlt />{" "}
      </span>
    </div>
  );
};

export default SearchInput;
