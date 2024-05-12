import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const SelectProduct = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </>
  );
};

export default SelectProduct;
