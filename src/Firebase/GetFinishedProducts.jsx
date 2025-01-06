import { useEffect, useState } from "react";
import { products } from "../components/State.js";
import ProductsList from "../components/ProductsList/ProductsList.jsx";
import { convertTimestampToLocalDate } from "../helpers.js";
import { getProducts } from "./FirebaseServices.js";

export default function GetFinishedProducts() {
  const [localDates, setLocalDates] = useState([]);

  const getFinishedProducts = async () => {
    const productsData = await getProducts();

    console.log(productsData);
    products.value = productsData;

    //convert the firebase timestamp to local date
    const localDatesResult = products.value.map((item) =>
      convertTimestampToLocalDate(item.date)
    );
    setLocalDates(localDatesResult);
  };

  useEffect(() => {
    try {
      getFinishedProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <ProductsList localDates={localDates} />
    </div>
  );
}
