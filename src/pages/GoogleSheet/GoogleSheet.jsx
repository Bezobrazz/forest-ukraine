import { useEffect, useState } from "react";
import styles from "./GoogleSheet.module.css";
import { GetProducts } from "../../API/GetProducts";
import Card from "../../components/ReuseComponents/Card/Card.jsx";
import ListFinishedProducts from "../../components/ListFinishedProducts/ListFinishedProducts.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Modal from "../../components/ReuseComponents/Modal/Modal.jsx";
import DatePicker from "../../components/ReuseComponents/DatePicker/DatePicker.jsx";
import Select from "../../components/ReuseComponents/Select/Select.jsx";
import Input from "../../components/ReuseComponents/Input/Input.jsx";
import AddIcon from '@mui/icons-material/Add';

export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    quantity: "",
  });

    console.log("Products Data", products)
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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date, // Assuming you're using dayjs for date formatting
    });
  };

  const handleProductChange = (e) => {
    setFormData({
      ...formData,
      productName: e.target.value,
    });
  };

  const handleQuantityChange = (e) => {
    setFormData({
      ...formData,
      quantity: e.target.value,
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
    handleModalClose();
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
        buttonStyle={"contained"}
        buttonColor={"success"}
        icon={<AddIcon />}
        modalOpen={handleModalOpen}
      >
        {loading ? <Loader /> : <ListFinishedProducts products={products} />}
      </Card>
      {isOpen && (
        <Modal title={"Внесіть дані"} width={"670px"} onClose={handleModalClose} onSave={handleSubmit}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputsWrapper}>
              <DatePicker label={"Виберіть дату"} value={formData.date} onChange={handleDateChange} />
              <Select label={"Виберіть продукцію"} value={formData.productName} onChange={handleProductChange} options={[
                { value: 'Кора Крупна', label: 'Кора Крупна' },
                { value: 'Кора Середня', label: 'Кора Середня' },
                { value: 'Кора Дрібна', label: 'Кора Дрібна' },
                { value: 'Кора Відсів 2', label: 'Кора Відсів 2' },
                { value: 'Кора Відсів 1', label: 'Кора Відсів 1' }
              ]} />
              <Input label={"Введіть кількість"} type={"number"} value={formData.quantity} onChange={handleQuantityChange} />
            </div>
          </form>
        </Modal>
      )}
      <GetProducts />
    </div>
  );
};
