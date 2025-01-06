import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import styles from "./CustomSelect.module.css";

export default function CustomSelect({
  label,
  value,
  onChange,
  options = [],
  fullWidth = false,
  minWidth = 120,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.container}
      style={{
        width: fullWidth ? "100%" : "auto",
        minWidth,
      }}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.select} onClick={toggleDropdown}>
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
        <span className={styles.dropdownIcon}>
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                option.value === value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
