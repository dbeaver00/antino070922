import { useSelector, useDispatch } from "react-redux";
import { todoAction } from "../store/index";

const TodoItems = () => {
  const dispatch = useDispatch();
  const Todos = useSelector((state) => state.items);

  const removeHandler = (id) => {
    dispatch(todoAction.removeTodo(id));
  };
  return (
    <ul>
      {Todos.map((todo) => (
        <li key={todo.id} onClick={() => removeHandler(todo.id)}>
          {todo.value}
        </li>
      ))}
    </ul>
  );
};

export default TodoItems;
