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
import BasicButtons from "../../components/ReuseComponents/Button/Button.jsx";
import { getData } from "../../API/apiZeroSheets.js";

export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: dayjs(),
    productName: "",
    quantity: "",
    sku: "",
  });
  const [filterDate, setFilterDate] = useState(null);
  const [filterButtonStyle, setFilterButtonStyle] = useState("allTime");
  const [isEditing, setIsEditing] = useState(false);
  const [editingLineNumber, setEditingLineNumber] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPerProduct, setTotalPerProduct] = useState({
    "Кора Крупна": 0,
    "Кора Середня": 0,
    "Кора Дрібна": 0,
    "Кора Відсів 2": 0,
    "Кора Відсів 1": 0,
  });

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
    setFilterDate(date);
    calculateTotals(products, date);
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
      calculateTotals(data, null);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const filterByDate = (data, date) => {
    return data.filter((product) => dayjs(product.date).isSame(date, "day"));
  };

  const calculateTotals = (data, filterDate) => {
    let total = 0;
    const totals = {
      "Кора Крупна": 0,
      "Кора Середня": 0,
      "Кора Дрібна": 0,
      "Кора Відсів 2": 0,
      "Кора Відсів 1": 0,
    };

    const filteredData = filterDate ? filterByDate(data, filterDate) : data;

    filteredData.forEach((product) => {
      const quantity = parseFloat(product.quantity);
      total += quantity;

      if (Object.prototype.hasOwnProperty.call(totals, product.productName)) {
        totals[product.productName] += quantity;
      } else {
        console.warn(`Unknown product name: ${product.productName}`);
      }
    });

    setTotalQuantity(total);
    setTotalPerProduct(totals);
  };

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
      const newProductsList = [updatedProducts, ...products];
      setProducts(newProductsList);
      calculateTotals(newProductsList, filterDate);
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
      calculateTotals(newProductsList, filterDate);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  async function patchRow(lineNumber, payload) {
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

      const updatedProduct = await response.json();
      console.log(updatedProduct);

      const newProductsList = products.map((product) =>
        product._lineNumber === lineNumber ? updatedProduct : product
      );
      setProducts(newProductsList);
      calculateTotals(newProductsList, filterDate);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await patchRow(editingLineNumber, formData);
    } else {
      await postData(formData);
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

  const calculatePercentage = (quantity, total) => {
    if (total === 0) {
      return 0;
    }
    return Math.round((quantity / total) * 100);
  };

  const filterAllTime = () => {
    setFilterDate(null);
    calculateTotals(products, null);
    setFilterButtonStyle("allTime");
  };

  const filterCurrentYear = () => {
    setFilterDate(null);
    const startOfYear = dayjs().startOf("year");
    const endOfYear = dayjs().endOf("year");
    const filteredData = products.filter((product) =>
      dayjs(product.date).isBetween(startOfYear, endOfYear, null, "[]")
    );
    calculateTotals(filteredData, null);
    setFilterButtonStyle("currentYear");
  };

  const filterCurrentMonth = () => {
    setFilterDate(null);
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    const filteredData = products.filter((product) =>
      dayjs(product.date).isBetween(startOfMonth, endOfMonth, null, "[]")
    );
    calculateTotals(filteredData, null);
    setFilterButtonStyle("currentMonth");
  };

  const filterToday = () => {
    setFilterDate(null);
    const today = dayjs().startOf("day");
    const filteredData = products.filter((product) =>
      dayjs(product.date).isSame(today, "day")
    );
    calculateTotals(filteredData, today);
    setFilterButtonStyle("currentDay");
  };

  const productsList = [
    { label: "Кора Крупна", quantity: totalPerProduct["Кора Крупна"] },
    { label: "Кора Середня", quantity: totalPerProduct["Кора Середня"] },
    { label: "Кора Дрібна", quantity: totalPerProduct["Кора Дрібна"] },
    { label: "Кора Відсів 2", quantity: totalPerProduct["Кора Відсів 2"] },
    { label: "Кора Відсів 1", quantity: totalPerProduct["Кора Відсів 1"] },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.cardStatisticsContainer}>
          <div className={styles.statisticsButtonWrapper}>
            <BasicButtons
              title={"За весь час"}
              variant={
                filterButtonStyle === "allTime" ? "contained" : "outlined"
              }
              color={"success"}
              onClick={filterAllTime}
            />
            <BasicButtons
              title={"Поточний рік"}
              variant={
                filterButtonStyle === "currentYear" ? "contained" : "outlined"
              }
              color={"success"}
              onClick={filterCurrentYear}
            />
            <BasicButtons
              title={"Поточний місяць"}
              variant={
                filterButtonStyle === "currentMonth" ? "contained" : "outlined"
              }
              color={"success"}
              onClick={filterCurrentMonth}
            />
            <BasicButtons
              title={"Сьогодні"}
              variant={
                filterButtonStyle === "currentDay" ? "contained" : "outlined"
              }
              color={"success"}
              onClick={filterToday}
            />
          </div>
          <DatePicker
            label={"Фільтрувати за датою"}
            value={filterDate}
            onChange={handleDateChange}
          />
          <div className={styles.mainItemWrapper}>
            <p>Вироблено кори всього:</p>
            <p>{totalQuantity}</p>
          </div>
          {productsList.map((item, index) => (
            <div
              key={index}
              className={styles.itemWrapper}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
              }}
            >
              <p>{item.label}:</p>
              <p>
                {item.quantity}{" "}
                <span className={styles.persantage}>
                  ({calculatePercentage(item.quantity, totalQuantity)}%)
                </span>
              </p>
            </div>
          ))}
        </div>
        <Card
          title={"Вироблено кори"}
          buttonTitle={"Додати"}
          buttonStyle={"contained"}
          buttonColor={"success"}
          icon={<AddIcon />}
          modalOpen={handleModalOpen}
        >
          {loading ? (
            <Loader />
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
