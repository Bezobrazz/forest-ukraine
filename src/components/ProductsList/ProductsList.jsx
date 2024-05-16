import { products } from "../../components/State.js";
import s from "./ProductsList.module.css";

const ProductsList = ({ localDates }) => {
  return (
    <>
      <ul className={s.productsList}>
        {products.value.map((item) => (
          <li className={s.productItem} key={item.id}>
            <p>{localDates}</p>
            <p>{item.product}</p>
            <p>{item.quantity}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsList;
