import { useAppDispatch } from "../../redux/hooks/hooks";
import { todoDeleted } from "../../redux/slice/todoSlice";
import { Link, useNavigate } from "react-router-dom";
import style from "./StyleTodo.module.css";

export const DraggableTodoList = ({ id, title }: any, i: number) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(todoDeleted({ id }));
    navigate("/todoList");
  };
  return (
    <>
      <ul key={i} className={style.main}>
        <li className={style.text}>
          <h4 className={style.title}>{title}</h4>
        </li>
      </ul>

      <div className={style.link}>
        <Link to={`/editToDo/${id}`} className="button">
          Edit ToDo
        </Link>
        <button
          className={style.button}
          type="button"
          onClick={(event) => handleDelete(event, +id)}
        >
          DELETE TODO
        </button>
      </div>
    </>
  );
};
