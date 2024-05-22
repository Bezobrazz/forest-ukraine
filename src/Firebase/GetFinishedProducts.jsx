import { useEffect, useState } from "react";
import { products } from "../components/State.js";
import { getDocs, collection } from "firebase/firestore";

import ProductsList from "../components/ProductsList/ProductsList.jsx";
import { convertTimestampToLocalDate } from "../helpers.js";
import { getProducts } from "./firebaseServices.js";

export default function GetFinishedProducts() {
  const [localDates, setLocalDates] = useState([]);

  const getFinishedProducts = async () => {
    //read the data from firebase
    const productsData = await getProducts();

    console.log(productsData);
    //set the data to the state
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
