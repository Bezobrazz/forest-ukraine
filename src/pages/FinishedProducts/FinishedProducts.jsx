import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import uk from "date-fns/locale/uk";

registerLocale("uk", uk);

const FinishedProducts = () => {
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
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
        <DatePicker
          locale="uk"
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </div>
  );
};

export default FinishedProducts;
