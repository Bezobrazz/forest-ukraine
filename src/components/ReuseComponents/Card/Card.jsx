import styles from "./Card.module.css";
import Button from "../Button/Button";

const Card = ({
  title,
  children,
  buttonTitle,
  modalOpen,
  buttonStyle,
  buttonColor,
  icon,
}) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.topCardWrapper}>
          <h3 className={styles.topCardTitle}>{title}</h3>
          <Button
            variant={buttonStyle}
            title={buttonTitle}
            color={buttonColor}
            icon={icon}
            onClick={modalOpen}
          />
        </div>
        <div className={styles.bottomCardWrapper}>{children}</div>
      </div>
    </>
  );
};

export default Card;
