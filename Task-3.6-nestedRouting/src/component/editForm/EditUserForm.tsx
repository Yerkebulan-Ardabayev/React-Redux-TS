import React, { ChangeEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store/store";
import { userUpdated } from "../../redux/slice/userSlice";
import { useNavigate, useParams } from "react-router-dom";

export const EditUserForm: React.FC<{}> = () => {
  const users = useAppSelector((state: RootState) => state.user.usersList);
  const { userId } = useParams();
  const navigate = useNavigate();

  const userName =
    (userId && users && users.find((user) => user.id === +userId)?.name) || "";

  const userNameLogin =
    (userId && users && users.find((user) => user.id === +userId)?.username) ||
    "";

  const [name, setName] = useState(userName);
  const [user, setUser] = useState(userNameLogin);

  const dispatch = useAppDispatch();

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onUserNameChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);

  const onSaveNameUserClicked = () => {
    if (userId && (name || user)) {
      dispatch(userUpdated({ id: +userId, name: name, username: user }));
      navigate("/userList");
    }
  };


  return (
    <section>
      <h2>Edit User</h2>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <label htmlFor="nameTitle">Name:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="nameTitle"
          name="nameTitle"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="userTitle">Username:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="userTitle"
          name="userTitle"
          value={user}
          onChange={onUserNameChanged}
        />
      </form>
      <button
        style={{ width: "100px", margin: "5px" }}
        type="button"
        onClick={onSaveNameUserClicked}
      >
        Save User
      </button>
    </section>
  );
};
