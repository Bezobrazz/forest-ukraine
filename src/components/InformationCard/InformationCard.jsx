import styles from "./InformationCard.module.css";

export const InformationCard = ({
  title,
  description,
  bgcolor = "#2e7d32",
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.descrContainer}
        style={{ backgroundColor: bgcolor }}
      >
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
