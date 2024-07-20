import { useEffect, useState } from "react";
import styles from "./GoogleSheet.module.css";
import { GetProducts } from "../../API/GetProducts";
import { crmMaterials } from "../../components/State.js";
import Card from "../../components/ReuseComponents/Card/Card.jsx";
import ListFinishedProducts from "../../components/ListFinishedProducts/ListFinishedProducts.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Modal from "../../components/ReuseComponents/Modal/Modal.jsx";
import DatePicker from "../../components/ReuseComponents/DatePicker/DatePicker.jsx";
import Select from "../../components/ReuseComponents/Select/Select.jsx";
import Input from "../../components/ReuseComponents/Input/Input.jsx";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { getData, patchData, postData } from "../../API/apiZeroSheets.js";
import FinishedProductsStatistics from "../../components/FinishedProductsStatistics/FinishedProductsStatistics.jsx";

export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: dayjs(),
    productName: "",
    quantity: "",
    sku: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingLineNumber, setEditingLineNumber] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [patchLoader, setPatchLoader] = useState(false);

  const apiKey = import.meta.env.VITE_API_GOOGLE_SHEETS;

  const productsWithSku = [
    { label: "Кора Крупна", sku: "SKU001-ABC" },
    { label: "Кора Середня", sku: "SKU002-DEF" },
    { label: "Кора Дрібна", sku: "SKU003-GHI" },
    { label: "Кора Відсів 2", sku: "SKU004-JKL" },
    { label: "Кора Відсів 1", sku: "SKU005-MNO" },
  ];

  const { items } = crmMaterials.value;
  console.log("CRM materials", items);

  const handleModalOpen = () => {
    setIsOpen(true);
    setIsEditing(false);
    setFormData({
      date: dayjs(),
      productName: "",
      quantity: "",
      sku: "",
    });
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    setEditingLineNumber(null);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleProductChange = (e) => {
    const selectedProduct = productsWithSku.find(
      (product) => product.label === e.target.value
    );
    setFormData({
      ...formData,
      productName: selectedProduct.label,
      sku: selectedProduct.sku,
    });
  };

  const handleQuantityChange = (e) => {
    setFormData({
      ...formData,
      quantity: e.target.value,
    });
  };

  useEffect(() => {
    getZeroSheetsData();
  }, []);

  async function getZeroSheetsData() {
    setIsLoading(true);
    try {
      const data = await getData();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function postZeroSheetsData(newProduct) {
    try {
      const updatedProducts = await postData(newProduct);
      const newProductsList = [updatedProducts, ...products];
      setProducts(newProductsList);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  async function deleteRow(lineNumber) {
    const url = `https://api.zerosheets.com/v1/7zk/${lineNumber}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newProductsList = products.filter(
        (item) => item._lineNumber !== lineNumber
      );
      setProducts(newProductsList);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  async function patchZeroSheetsRow(lineNumber) {
    setPatchLoader(true);
    try {
      const updatedProduct = await patchData(lineNumber, formData);
      const newProductsList = products.map((product) =>
        product._lineNumber === lineNumber ? updatedProduct : product
      );
      setProducts(newProductsList);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setPatchLoader(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await patchZeroSheetsRow(editingLineNumber, formData);
    } else {
      await postZeroSheetsData(formData);
    }
    setFormData({ date: dayjs(), productName: "", quantity: "", sku: "" });
    handleModalClose();
  };

  const handleEditClick = (product) => {
    const selectedProduct = productsWithSku.find(
      (p) => p.label === product.productName
    );
    setIsEditing(true);
    setEditingLineNumber(product._lineNumber);
    setFormData({
      date: dayjs(product.date),
      productName: product.productName,
      quantity: product.quantity,
      sku: selectedProduct ? selectedProduct.sku : "",
    });
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <FinishedProductsStatistics products={products} />
        <Card
          title={"Вироблено кори"}
          buttonTitle={"Додати"}
          buttonStyle={"contained"}
          buttonColor={"success"}
          icon={<AddIcon />}
          modalOpen={handleModalOpen}
        >
          {loading ? (
            <Loader height={70} width={70} />
          ) : (
            <ListFinishedProducts
              products={products}
              deleteRow={deleteRow}
              onEditClick={handleEditClick}
            />
          )}
        </Card>
        {isOpen && (
          <Modal
            title={isEditing ? "Редагувати дані" : "Внесіть дані"}
            width={"670px"}
            loader={patchLoader}
            onClose={handleModalClose}
            onSave={handleSubmit}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputsWrapper}>
                <DatePicker
                  label={"Виберіть дату"}
                  value={formData.date}
                  onChange={handleDateChange}
                />
                <Select
                  label={"Виберіть продукцію"}
                  value={formData.productName}
                  onChange={handleProductChange}
                  options={productsWithSku.map((product) => ({
                    value: product.label,
                    label: product.label,
                  }))}
                />
                <Input
                  label={"Введіть кількість"}
                  type={"number"}
                  value={formData.quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </form>
          </Modal>
        )}
        <GetProducts />
      </div>
    </div>
  );
};
