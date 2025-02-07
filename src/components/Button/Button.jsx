import styles from "./Button.module.css";

const Button = ({
  width = "auto",
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  title,
}) => {
  const buttonStyle = {
    width: width || "auto",
  };

  return (
    <button
      style={buttonStyle}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
