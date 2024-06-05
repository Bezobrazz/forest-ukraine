import { useEffect, useState } from "react";
import { BallTriangle } from 'react-loader-spinner'
import { FaPencilAlt, FaTrashAlt  } from "react-icons/fa";
import styles from "./GoogleSheet.module.css";


export const GoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    quantity: "",
  });
  console.log(formData.date)
  const [loading, setIsLoading] = useState(false)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function getData() {
    setIsLoading(true)
    const response = await fetch("https://api.zerosheets.com/v1/7zk", {
      method: "GET",
      headers: {
        Authorization: "Bearer KQAZVSzH1eN4XP5B7z0jOR03VXcNXMKC",
      },
    });
    const data = await response.json();
    setProducts(data);
    setIsLoading(false)
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
      setProducts([updatedProducts, ...products ]);
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

  const splitDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: String(date.getDate()).padStart(2, '0'),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: date.getFullYear(),
    };
  };

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
      {loading ? (<div className={styles.loader}>
        <BallTriangle
  height={70}
  width={70}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
      </div>) : (<ul className={styles.list}>
        {products.map((product) => {
            const { day, month, year } = splitDate(product.date);
            return (
              <li className={styles.listItem} key={product._lineNumber}>
                <div className={styles.dateWrapper}>
                  <p className={styles.day}>{day}</p>
                  <p>{month}</p>
                  <p>{year}</p>
                </div>
               <div className={styles.productQuantityWrapper}>
               <p>{product.productName}</p>
                <p>{product.quantity}</p>
               </div>
                <div className={styles.buttonsWrapper}>
                  <button>
                <FaPencilAlt className={styles.icon}/>
                </button>
                <button>
                <FaTrashAlt  className={styles.icon}/>
                </button>
                </div>
                
              </li>
            );
          })}
      </ul>)}
      
    </div>
  );
};
