import { useDispatch, useSelector } from "react-redux";

import { fetchActions } from "../store/index";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import classes from "./List.module.css";

const List = (props) => {
  const dispatch = useDispatch();
  const editable = useSelector((state) => state.editable);
  const deleteHandler = (id) => {
    dispatch(fetchActions.deleteItemFromList(id));
  };
  const editHandler = (id) => {
    dispatch(fetchActions.editItem(id));
  };
  return (
    <div className={classes.main}>
      <div className={classes.secondaryMain}>
        <h1>Id : {props.id}</h1>
        <p>
          <div>Title :</div>

          <div
            contentEditable={props.id === editable}
            className={classes.editable}
          >
            <div> {props.title}</div>
          </div>
        </p>
      </div>
      <div>
        <button className={props.id === editable && classes.edit}>
          <EditIcon onClick={() => editHandler(props.id)} />
        </button>
        <button onClick={() => deleteHandler(props.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default List;
