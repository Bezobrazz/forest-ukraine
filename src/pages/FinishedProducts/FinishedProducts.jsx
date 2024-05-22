import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import SelectProduct from "../../components/SelectProduct/SelectProduct.jsx";
import s from "./FinishedProducts.module.css";
import GetFinishedProducts from "../../Firebase/GetFinishedProducts.jsx";
import { collection, addDoc } from "firebase/firestore";

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
  const [quantity, setQuantity] = useState("");
  const { label } = selectedProduct;

  const handleProductChange = (selected) => {
    setSelectedProduct(selected);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(finishedProductsCollectionRef, {
        date: startDate,
        product: selectedProduct,
        quantity: quantity,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Тут ти можеш обробити дані форми
    console.log("Дата:", startDate);
    console.log("Вибраний продукт:", label);
    console.log("Кількість:", quantity);
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
    </div>
  );
};

export default FinishedProducts;
