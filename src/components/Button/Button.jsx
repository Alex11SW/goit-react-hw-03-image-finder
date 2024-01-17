import styles from "./button.module.css";

const Button = ({ onClick = () => {}, type = "submit", children }) => {
  return (
    <button onClick={onClick} className={styles.Button}>
      {children}
    </button>
  );
};

export default Button;
