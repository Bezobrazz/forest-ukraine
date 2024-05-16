import { useEffect, useState } from "react";
import { products } from "../components/State.js";
import { getDocs, collection } from "firebase/firestore";
import { DBFinishedProducts } from "./FirebaseConfig.js";
import ProductsList from "../components/ProductsList/ProductsList.jsx";

export default function GetFinishedProducts() {
  const [localDates, setLocalDates] = useState([]);

  const convertTimestampToLocalDate = (timestamp) => {
    const milliseconds =
      (timestamp.seconds + timestamp.nanoseconds / 1000000000) * 1000;
    return new Date(milliseconds).toLocaleDateString("uk-UA");
  };

  useEffect(() => {
    try {
      const getProducts = async () => {
        //read the data from firebase
        const data = await getDocs(
          collection(DBFinishedProducts, "finished-products")
        );
        const productsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(productsData);
        //set the data to the state
        products.value = productsData;

        //convert the firebase timestamp to local date
        const localDatesResult = products.value.map((item) =>
          convertTimestampToLocalDate(item.date)
        );
        setLocalDates(localDatesResult);
      };
      getProducts();
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
