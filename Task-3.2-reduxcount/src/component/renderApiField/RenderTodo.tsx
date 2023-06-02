import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getTodos, todoDeleted } from "../../redux/slice/todoSlice";
import { RootState } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";

export const RenderedTodoList: FC<{}> = () => {
  const todo = useAppSelector((state: RootState) => state.todo);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!todo.contentApi.length) {
      dispatch(getTodos(2));
    }
  }, [todo]);

  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(todoDeleted({ id }));
    navigate('/todoList');
  };

  const renderedTodo = todo.contentApi.map(({ id, title }, i) => (
    <>
      <ul
        key={i}
        style={{
          width: "400px",
          color: "#d1c214",
          padding: "3px",
          display: "flex",
          flexDirection: "column",
          fontSize: "20px"
        }}
      >
        <li style={{ textAlign: "justify", listStyleType: "none" }}>
          <h4 style={{ fontSize: "20px" }} key={i}>
            {title}
          </h4>
        </li>
      </ul>

      <div
        style={{
          display: "flex",
          width: "300px",
          justifyContent: "space-evenly",
          fontSize: "20px",
          margin: "10px"
        }}
      >
        <Link to={`/editToDo/${id}`} className="button">
          Edit ToDo
        </Link>
        <button
          style={{
            width: "100px",
            margin: "5px",
            color: "#00df38",
            backgroundColor: "#df0000",
            borderRadius: "5px"
          }}
          type="button"
          onClick={(event) => handleDelete(event, +id)}
        >
          DELETE TODO
        </button>
      </div>
    </>
  ));

  return <>{renderedTodo}</>;
};
