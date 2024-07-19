const apiKey = import.meta.env.VITE_API_GOOGLE_SHEETS;

export const fetchData = async () => {
  try {
    const response = await fetch("https://api.zerosheets.com/v1/7zk", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    console.log("data", data);

    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (newProduct) => {
  try {
    const response = await fetch("https://api.zerosheets.com/v1/7zk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const patchData = async (lineNumber, payload) => {
  const url = `https://api.zerosheets.com/v1/7zk/${lineNumber}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
