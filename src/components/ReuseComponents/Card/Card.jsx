import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, children, buttonTitle, modalOpen }) => {
  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={styles.topCardWrapper}>
          <h3 className={styles.topCardTitle}>{title}</h3>
          <button className="button" onClick={modalOpen}>
            {buttonTitle}
          </button>
        </div>
        <div className={styles.bottomCardWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default Card;
