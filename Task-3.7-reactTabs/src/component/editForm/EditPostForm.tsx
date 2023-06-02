import React, { ChangeEvent, useState } from "react";
import { postUpdated } from "../../redux/slice/postsSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store/store";
import { useNavigate, useParams } from "react-router-dom";

export const EditPostForm: React.FC<{}> = () => {
  const posts = useAppSelector((state: RootState) => state.posts.contentApi);
  const { postId } = useParams();
  const navigate = useNavigate();

  const postTitle =
    (postId && posts && posts.find((post) => post.id === +postId)?.title) || "";
  const postContent =
    (postId && posts && posts.find((post) => post.id === +postId)?.body) || "";

  const [content, setContent] = useState(postContent);
  const [title, setTitle] = useState(postTitle);
  const dispatch = useAppDispatch();

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onSavePostClicked = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (postId && (content || title)) {
      dispatch(postUpdated({ id: +postId, body: content, title: title }));
      navigate("/posts");
    }
  };

  console.log(posts);
  return (
    <section>
      <h2>Edit Post</h2>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
        onSubmit={onSavePostClicked}
      >
        <label htmlFor="editTitle">Title:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="editTitle"
          name="editTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="editContent">Content:</label>
        <input
          style={{ width: "250px", margin: "20px" }}
          id="editContent"
          name="editContent"
          value={content}
          onChange={onContentChanged}
        />
        <button style={{ width: "100px", margin: "5px" }} type="submit">
          Save Post
        </button>
      </form>
    </section>
  );
};
