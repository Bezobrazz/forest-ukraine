import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import styles from "./GoogleSheet.module.css";
import { GetProducts } from "../../API/GetProducts";
import Card from "../../components/ReuseComponents/Card/Card.jsx";
import ListFinishedProducts from "../../components/ListFinishedProducts/ListFinishedProducts.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Modal from "../../components/ReuseComponents/Modal/Modal.jsx";

export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    quantity: "",
  });
  const [loading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_GOOGLE_SHEETS;

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function getData() {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.zerosheets.com/v1/7zk", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function postData(newProduct) {
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

      const updatedProducts = await response.json();
      setProducts([updatedProducts, ...products]);
    } catch (error) {
      console.error("Error posting data:", error);
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
      <Card
        title={"Вироблено кори"}
        buttonTitle={"Додати"}
        modalOpen={handleModalOpen}
      >
        {loading ? <Loader /> : <ListFinishedProducts products={products} />}
      </Card>
      {/* <form className={styles.form} onSubmit={handleSubmit}>
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
      </form> */}
      {isOpen && <Modal onClose={handleModalClose} />}
      <GetProducts />
    </div>
  );
};
