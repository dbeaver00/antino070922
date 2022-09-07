import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchDataFromApi } from "./store/index";
import List from "./component/List";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { fetchActions } from "./store/index";

import classes from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [dispatch]);

  const data = useSelector((state) => state.items);

  const toggleHandler = () => {
    dispatch(fetchActions.toggle());
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end"  }}>
        <button className={classes.toggle} onClick={toggleHandler}>
          {<ImportExportIcon />}
        </button>
      </div>

      <ul className={classes.items}>
        {data.map((item) => (
          <li key={item.id}>{<List title={item.title} id={item.id} />}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
