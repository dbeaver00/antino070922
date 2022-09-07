import {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchShows } from "../../store/Shows-slice";
import ShowsUI from "./ShowsUI";
import SearchIcon from "@mui/icons-material/Search";
import MySpinner from "../UI/MySpinner";
import { showsActions } from "../../store/Shows-slice";

import styles from "./SearchShow.module.css";

const SearchShow = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const { searchLoading: isLoading, searchItems: searchedShows } = useSelector(
    (state) => state.shows
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== "") {
        dispatch(searchShows(value));
      }
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, dispatch]);
  const anotherHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    if (e.target.value === undefined || e.target.value.trim() === "") {
      setIsOpen(false);
      dispatch(showsActions.emptySearch());
      return;
    }
    setIsOpen(true);
    setValue(e.target.value);
  };
  return (
    <div>
      <form className={styles.search}>
        <input
          type="text"
          placeholder="Search here..."
          onChange={anotherHandler}
        />
        <button>{<SearchIcon />}</button>
      </form>
      {isLoading && <MySpinner myClass="secondary-spinner-container" />}
      {isOpen &&
        !isLoading &&
        !(searchedShows === "error") &&
        searchedShows.length > 0 && (
          <ShowsUI shows={searchedShows} data={props.data} />
        )}
      {isOpen && !isLoading && searchedShows === "error" && (
        <p style={{ textAlign: "center" }}>No Data Found !!!!!</p>
      )}
    </div>
  );
};

export default SearchShow;
