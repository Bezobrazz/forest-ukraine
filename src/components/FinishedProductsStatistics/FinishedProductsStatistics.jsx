import { useState, useEffect } from "react";
import styles from "./FinishedProductsStatistics.module.css";
import BasicButtons from "../../components/ReuseComponents/Button/Button.jsx";
import DatePicker from "../../components/ReuseComponents/DatePicker/DatePicker.jsx";
import dayjs from "dayjs";

const FinishedProductsStatistics = ({ products }) => {
  const [filterButtonStyle, setFilterButtonStyle] = useState("allTime");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [filterDate, setFilterDate] = useState(null);

  const [totalPerProduct, setTotalPerProduct] = useState({
    "Кора Крупна": 0,
    "Кора Середня": 0,
    "Кора Дрібна": 0,
    "Кора Відсів 2": 0,
    "Кора Відсів 1": 0,
  });

  const productsList = [
    { label: "Кора Крупна", quantity: totalPerProduct["Кора Крупна"] },
    { label: "Кора Середня", quantity: totalPerProduct["Кора Середня"] },
    { label: "Кора Дрібна", quantity: totalPerProduct["Кора Дрібна"] },
    { label: "Кора Відсів 2", quantity: totalPerProduct["Кора Відсів 2"] },
    { label: "Кора Відсів 1", quantity: totalPerProduct["Кора Відсів 1"] },
  ];

  useEffect(() => {
    calculateTotals(products, null);
  }, [products]);

  const filterByDate = (data, date) => {
    return data.filter((product) => dayjs(product.date).isSame(date, "day"));
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
    calculateTotals(products, date);
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

  return (
    <div className={styles.cardStatisticsContainer}>
      <div className={styles.statisticsButtonWrapper}>
        <BasicButtons
          title={"За весь час"}
          variant={filterButtonStyle === "allTime" ? "contained" : "outlined"}
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
  );
};

export default FinishedProductsStatistics;
