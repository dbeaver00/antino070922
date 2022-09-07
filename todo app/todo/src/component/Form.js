import { useDispatch } from "react-redux";
import { useRef } from "react";

import { todoAction } from "../store/index";

const Form = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") {
      inputRef.current.value = "";
      return;
    } else {
      dispatch(
        todoAction.addTodo({
          value: inputRef.current.value.trim(),
          id: Date.now(),
        })
      );
    }
    inputRef.current.value = "";
  };
  return (
    <form onSubmit={submitHandler}>
      <input type="text" id="todo" ref={inputRef} />
      <button>Add</button>
    </form>
  );
};

export default Form;
