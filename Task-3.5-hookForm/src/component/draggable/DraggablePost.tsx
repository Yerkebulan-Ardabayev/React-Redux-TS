import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { postDeleted } from "../../redux/slice/postsSlice";
import style from "./StylePost.module.css";

export const DraggablePost = ({ body, id, title }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(postDeleted({ id }));
    navigate("/posts");
  };

  return (
    <div>
      <ul className={style.main}>
        <li className={style.text}>
          <h3 className={style.title}>TITLE: &nbsp; {title}</h3>
          <h3 className={style.title_t}>CONTENT: &nbsp; {body}</h3>
        </li>
      </ul>
      <div className={style.link}>
        <Link to={`/editPost/${id}`} className="button">
          Edit Post
        </Link>
        <button
          className={style.button}
          type="button"
          onClick={(event) => handleDelete(event, +id)}
        >
          DELETE POST
        </button>
      </div>
    </div>
  );
};
