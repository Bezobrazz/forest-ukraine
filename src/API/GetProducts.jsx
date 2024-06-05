import { useEffect } from "react";

export const GetProducts = () => {
  const apiKey = import.meta.env.VITE_API_KEEPING_CRM;

  const BASE_URL = "https://api.keepincrm.com/v1";

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/v1/materials`, {
        headers: {
          "X-Auth-Token": apiKey
        }
      });
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>Get Products API</div>
  );
};
