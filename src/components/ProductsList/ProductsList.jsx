import { products } from "../../components/State.js";

const ProductsList = ({ localDates }) => {
  return (
    <>
      <ul>
        {products.value.map((item) => (
          <li key={item.id}>
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
