import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

import ShowsUI from "../shows/ShowsUI";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import styles from "./Accordion.module.css";

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { loading: isLoading } = useSelector((state) => state.shows);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Fragment>
      <div className={styles.Accordion} onClick={toggle}>
        <p>{props.title}</p>
        {!isOpen && <KeyboardArrowDownIcon />}
        {isOpen && <KeyboardArrowUpIcon />}
      </div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isOpen && !isLoading && <ShowsUI shows={props.shows} data={true} />}
    </Fragment>
  );
};

export default Accordion;
