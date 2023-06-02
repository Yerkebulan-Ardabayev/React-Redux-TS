import { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { userAdded } from "../../redux/slice/userSlice";

export const AddNewCustomer: React.FC<{}> = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  const dispatch = useAppDispatch();

  const onSaveUser = () => {
    if (name && username) {
      dispatch(
        userAdded({
          username,
          name,
          id: 0
        })
      );
      setName("");
      setUserName("");
    }
  };

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);

  const onContentChangedUser = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.currentTarget.value);

  return (
    <>
      <h2 style={{ fontSize: "20px", margin: "10px" }}>NEW USER</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <label htmlFor="postTitle">NAME:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          type="text"
          name="postTitle"
          value={name}
          onChange={onContentChanged}
        />
        <label htmlFor="postTitleUser">USERNAME:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          type="text"
          name="postTitleUser"
          value={username}
          onChange={onContentChangedUser}
        />
        <button
          style={{ width: "100px", margin: "5px" }}
          type="button"
          onClick={onSaveUser}
        >
          SAVE USER
        </button>
      </form>
    </>
  );
};
