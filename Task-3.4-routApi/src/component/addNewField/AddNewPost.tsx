import { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { postAdded } from "../../redux/slice/postsSlice";

export const AddNewPost: React.FC<{}> = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [id, setId] = useState("");

  const dispatch = useAppDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setBody(e.currentTarget.value);

  const onSavePostClicked = () => {
    if (title && body) {
      dispatch(
        postAdded({
          title,
          id,
          body
        })
      );
      setId("");
      setTitle("");
      setBody("");
    }
  };

  return (
    <>
      <h2 style={{ fontSize: "20px" }}>ADD POST</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <label htmlFor="postContent">TITLE:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          name="postContent"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">CONTENT:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          name="postContent"
          value={body}
          onChange={onContentChanged}
        />
        <button
          style={{ width: "100px", margin: "5px" }}
          type="button"
          onClick={onSavePostClicked}
        >
          SAVE POST
        </button>
      </form>
    </>
  );
};
