import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getPosts, postDeleted } from "../../redux/slice/postsSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";


export const RenderPost: FC<{}> = () => {
  const posts = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!posts.contentApi.length) {
        dispatch(getPosts(2));
    }
  }, [posts]);


  const handleDelete = (event: React.SyntheticEvent, id: number) => {
    event.preventDefault();
    dispatch(postDeleted({ id }));
    navigate('/posts');
  };

  const renderedPosts = posts.contentApi.map(({ body, id, title }, i) => (
    <>
      {" "}
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
        <li key={i} style={{ textAlign: "justify", listStyleType: "none" }}>
          <h3 style={{ color: "#0637eb", fontSize: "20px" }}>
            TITLE: &nbsp; {title}
          </h3>
          <h3 style={{ color: "#d1c214", fontSize: "20px" }}>
            CONTENT: &nbsp; {body}
          </h3>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          width: "400px",
          justifyContent: "space-between",
          fontSize: "20px",
          margin: "10px"
        }}
      >
        <Link to={`/editPost/${id}`} className="button">
          Edit Post
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
          DELETE POST
        </button>
      </div>
    </>
  ));

  return <>{renderedPosts}</>;
};