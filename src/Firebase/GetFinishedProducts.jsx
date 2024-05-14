import { useEffect } from "react";
import { products } from "../components/State.js";
import { getDocs, collection } from "firebase/firestore";
import { DBFinishedProducts } from "./FirebaseConfig.js";

export default function GetFinishedProducts() {
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
      };
      getProducts();
    } catch (error) {
      console.log(error);
    }
  });
  return <div>GetFinishedProducts</div>;
}
