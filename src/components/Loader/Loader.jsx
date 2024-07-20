import { BallTriangle } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = ({ height, width }) => {
  return (
    <div className={styles.loader}>
      <BallTriangle
        height={height}
        width={width}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
