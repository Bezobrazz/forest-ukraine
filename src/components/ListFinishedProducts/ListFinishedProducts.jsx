import React from "react";
import styles from "./ListFinishedProducts.module.css";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const ListFinishedProducts = ({ products }) => {
  const splitDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: String(date.getDate()).padStart(2, "0"),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      year: date.getFullYear(),
    };
  };
  return (
    <ul className={styles.list}>
      {products.map((product) => {
        const { day, month, year } = splitDate(product.date);
        return (
          <li className={styles.listItem} key={product._lineNumber}>
            <div className={styles.dateWrapper}>
              <p className={styles.day}>{day}</p>
              <div className={styles.monthYearWrapper}>
                <p>{month}.</p>
                <p>{year}</p>
              </div>
            </div>
            <div className={styles.productQuantityWrapper}>
              <p>{product.productName}</p>
              <p>{product.quantity}</p>
            </div>
            <div className={styles.buttonsWrapper}>
              <button>
                <FaPencilAlt className={styles.icon} />
              </button>
              <button>
                <FaTrashAlt className={styles.icon} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListFinishedProducts;
