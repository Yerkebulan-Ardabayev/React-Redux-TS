import { useAppDispatch } from "../../redux/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { userDeleted } from "../../redux/slice/userSlice";
import style from "./StyleUser.module.css";

export const DraggableUser = ({ id, name, username }: any, i: number) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(userDeleted({ id }));
    navigate("/userList");
  };

  return (
    <>
      <ul key={i} className={style.main}>
        <li className={style.text}>
          <Link to={`/userInfo/${id}`}>
            <h4 className={style.title}>NAME:&nbsp;{name}</h4>
            <h4 className={style.title_t}>USERNAME:&nbsp;{username}</h4>
          </Link>
        </li>
      </ul>

      <div className={style.link}>
        <Link to={`/editUser/${id}`} className='button'>
          Edit User
        </Link>
        <button
          className={style.button}
          type='button'
          onClick={(event) => handleDelete(event, +id)}>
          DELETE USER
        </button>
      </div>
    </>
  );
};
