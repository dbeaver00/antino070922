import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDatafromApi } from "../store/index";

import styles from "./UI.module.css";

const UI = () => {
  const nameRef = useRef();
  const dispatch = useDispatch();
  const { name, age } = useSelector((state) => state.userData);
  const {
    error: isError,
    initial: isInitial,
    loading: isLoading,
  } = useSelector((state) => state);

  const submitHandler = (e) => {
    e.preventDefault();
    const userName = nameRef.current.value;
    if (userName.trim() === "") {
      return;
    }
    dispatch(fetchDatafromApi(userName.trim()));
    nameRef.current.value = "";
  };

  return (
    <div className={styles.main}>
      <h1>Predict Age</h1>
      <form onSubmit={submitHandler}>
        <input type="text" ref={nameRef} />
        <button className={styles.formButton}>Tell My Age !!!</button>
      </form>
      {isLoading && <p className={styles.loading}>Loading....</p>}
      {!isLoading && !isInitial && !isError && age && (
        <p>
          The predicted age of {name} is {age}
        </p>
      )}
      {!isLoading && !isInitial && !isError && !age && (
        <p>Can't predicted age of {name}</p>
      )}
      {!isLoading && isError && <p className={styles.error}>{isError}</p>}
    </div>
  );
};

export default UI;
