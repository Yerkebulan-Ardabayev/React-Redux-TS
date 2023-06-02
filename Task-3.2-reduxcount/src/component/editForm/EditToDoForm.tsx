import React, { ChangeEvent, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store/store";
import { todoUpdated } from "../../redux/slice/todoSlice";


export const EditToDoForm: React.FC<{}> = () => {
  const todos = useAppSelector((state: RootState) => state.todo.contentApi);
  const { todoId } = useParams();
  const navigate = useNavigate();
  
  const todoContent =
    (todoId && todos && todos.find((todo) => todo.id === +todoId)?.title) || "";

  const [title, setTitle] = useState(todoContent);
  const dispatch = useAppDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onSaveToDoClicked = () => {
    if (todoId &&(title)) {
      dispatch(todoUpdated({ id: +todoId, title: title }));
      navigate("/todoList");
    }
  };

  return (
    <section>
      <h2>Edit ToDo</h2>
      <form>
        <label htmlFor="todoTitle">Title:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="todoTitle"
          name="todoTitle"
          value={title}
          onChange={onTitleChanged}
        />
      </form>
      <button
        style={{ width: "100px", margin: "5px" }}
        type="button"
        onClick={onSaveToDoClicked}
      >
        Save ToDo
      </button>
    </section>
  );
};
