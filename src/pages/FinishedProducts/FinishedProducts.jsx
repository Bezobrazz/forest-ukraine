import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import SelectProduct from "../../components/SelectProduct/SelectProduct.jsx";
import s from "./FinishedProducts.module.css";
import GetFinishedProducts from "../../Firebase/GetFinishedProducts.jsx";
import TotalClientCost from "../../components/TotalClientCost.jsx";

registerLocale("uk", uk);

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className={s.datePickerCustomInput} onClick={onClick} ref={ref}>
    {value}
  </button>
));
ExampleCustomInput.displayName = "ExampleCustomInput";

const FinishedProducts = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState("");
  const { label } = selectedProduct;
  const [quantity, setQuantity] = useState("");

  const handleProductChange = (selected) => {
    setSelectedProduct(selected);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Тут ти можеш обробити дані форми
    console.log("Дата:", startDate);
    console.log("Вибраний продукт:", label);
    console.log("Кількість:", typeof quantity);
  };

  return (
    <div>
      <h2>Виготовлена Продукція</h2>
      <div>
        <p>Виготовлено всього</p>
        <ul>
          <li>
            <p>Крупна</p>
            <p>Кількість</p>
          </li>
        </ul>
        <form onSubmit={handleSubmit} className={s.inputsFieldsWrapper}>
          <DatePicker
            locale="uk"
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
          />
          <SelectProduct onChange={handleProductChange} />
          <input
            className={s.quantityInput}
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Кількість"
          />
          <button className={s.saveButton} type="submit">
            Зберегти
          </button>
        </form>
      </div>
      <GetFinishedProducts />
      <TotalClientCost />
    </div>
  );
};

export default FinishedProducts;
