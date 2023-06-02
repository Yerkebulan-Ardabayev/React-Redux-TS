import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, userDeleted } from "../../redux/slice/userSlice";

export const RenderedUser: FC<{}> = () => {
  const users = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.usersList.length) {
      dispatch(getUsers(2));
    }
  }, [users]);

  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(userDeleted({ id }));
    navigate('/userList');
  };

  const renderedUsers = users.usersList.map(({ id, name, username }, i) => (
    <>
      <ul
        key={i}
        style={{
          width: "400px",
          padding: "3px",
          display: "flex",
          flexDirection: "column",
          fontSize: "20px"
        }}
      >
        <li style={{ textAlign: "justify", listStyleType: "none" }}>
          <h4 style={{ color: "#d1c214", fontSize: "20px" }}>
            NAME:&nbsp;{name}
          </h4>
          <h4 style={{ color: "#0637eb", fontSize: "20px" }}>
            USERNAME:&nbsp;{username}
          </h4>
        </li>
      </ul>

      <div
        style={{
          display: "flex",
          width: "300px",
          justifyContent: "space-evenly",
          fontSize: "20px",
        }}
      >
        <Link to={`/editUser/${id}`} className="button">
          Edit User
        </Link>
        <button
          style={{
            width: "100px",
            color: "#00df38",
            backgroundColor: "#df0000",
            borderRadius: "5px"
          }}
          type="button"
          onClick={(event) => handleDelete(event, +id)}
        >
          DELETE USER
        </button>
      </div>
    </>
  ));

  return <>{renderedUsers}</>;
};
