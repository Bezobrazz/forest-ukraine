import { useEffect, useState } from "react";
import styles from "./GoogleSheet.module.css";

export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/7zk", {
      method: "GET",
      headers: {
        Authorization: "Bearer KQAZVSzH1eN4XP5B7z0jOR03VXcNXMKC",
      },
    });
    const data = await response.json();
    setProducts(data);
  }

  async function postData(newProduct) {
    const response = await fetch("https://api.zerosheets.com/v1/7zk", {
      method: "POST",
      headers: {
        Authorization: "Bearer KQAZVSzH1eN4XP5B7z0jOR03VXcNXMKC",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const updatedProducts = await response.json();
      setProducts([...products, updatedProducts]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formData);
    setFormData({ date: "", productName: "", quantity: "" });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Google Sheet</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="date">
          Date
        </label>
        <input
          className={styles.input}
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        </div>
        <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="productName">
          Product Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
        />
        </div>
        <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor="quantity">
          Quantity
        </label>
        <input
          className={styles.input}
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
      <ul className={styles.list}>
        {products.map((product) => (
          <li className={styles.listItem} key={product._lineNumber}>
            <p>{product.date}</p>
            <p>{product.productName}</p>
            <p>{product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
