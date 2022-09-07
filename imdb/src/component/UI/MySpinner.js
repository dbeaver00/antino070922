import styles from "./MySpinner.module.css";

const MySpinner = (props) => {
  return (
    <div className={styles[props.myClass]}>
      <div className={styles[`loading-spinner`]}></div>
    </div>
  );
};

export default MySpinner;
