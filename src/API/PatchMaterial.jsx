export const patchMaterial = async (sku, product) => {
  const apiKey = import.meta.env.VITE_API_KEEPING_CRM;
  try {
    const response = await fetch(
      //base url wroute in vite config
      `/v1/materials/sku/${sku}`,
      {
        method: "PATCH",
        headers: {
          "X-Auth-Token": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error patching product:", error);
    throw error;
  }
};
