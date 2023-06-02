import { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { todoAdded } from "../../redux/slice/todoSlice";
import axios from "axios";

export const AddNewToDo = () => {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const dispatch = useAppDispatch();

  const onSaveToDoClicked = () => {
    if (title) {
      dispatch(
        todoAdded({
          title,
          id
        })
      );
      setTitle("");
      setId("");
    }
  };

  useEffect(() => {
    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        title: title,
        id: id
      })
      .then((response) => {
      });
  }, [title, id]);
  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <label
          style={{ fontWeight: "bold", fontSize: "20px" }}
          htmlFor="postContent"
        >
          ADD TODO CONTENT:
        </label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="postContent"
          name="postContent"
          value={title}
          onChange={onContentChanged}
        />
        <button
          style={{ width: "100px", margin: "5px" }}
          type="button"
          onClick={onSaveToDoClicked}
        >
          SAVE TODO
        </button>
      </form>
    </>
  );
};
