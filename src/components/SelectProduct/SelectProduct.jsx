import Select from "react-select";
import { useState } from "react";
import s from "./SelectProduct.module.css";

const options = [
  { value: "кора крупна", label: "Кора Крупна" },
  { value: "кора середня", label: "Кора Середня" },
  { value: "кора дрібна", label: "Кора Дрібна" },
  { value: "кора відсів 2", label: "Кора Вдсів 2" },
  { value: "кора відсів 1", label: "Кора Вдсів 1" },
  { value: "субстрат", label: "Субстрат" },
];
const SelectProduct = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected);
  };
  return (
    <div className={s.selectWrapper}>
      <Select
        defaultValue={selectedOption}
        onChange={handleOptionChange}
        options={options}
        placeholder="Виберіть продукцію"
        styles={{
          container: (base) => ({
            ...base,
            width: "290px",
            height: "35px",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "14px",
          }),
          menu: (base) => ({
            ...base,
            color: "gray",
            fontSize: "14px",
          }),
          control: (base) => ({
            ...base,
            border: "none",
            minHeight: "35px",
            borderRadius: "3px",
          }),
        }}
      />
    </div>
  );
};

export default SelectProduct;
