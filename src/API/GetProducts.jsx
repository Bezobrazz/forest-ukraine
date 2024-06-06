import { useEffect } from "react";
import { crmMaterials } from "../components/State.js";

export const GetProducts = () => {
  const apiKey = import.meta.env.VITE_API_KEEPING_CRM;

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        //base url wroute in vite config
        `/v1/materials
			`,
        {
          headers: {
            "X-Auth-Token": apiKey,
          },
        }
      );

      const data = await response.json();
      crmMaterials.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  const { items } = crmMaterials.value;

  console.log(items);

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div></div>;
};
