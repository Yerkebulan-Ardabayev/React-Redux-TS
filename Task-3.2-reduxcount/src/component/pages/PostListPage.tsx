import { FC, useState } from "react";
import { AddNewPost } from "../addNewField/AddNewPost";
import { RenderPost } from "../renderApiField/RenderPost";

export const PostListPage: FC<{}> = () => {
  const [showByClick, setShowByClick] = useState<boolean>(false);

  const showFieldAddNewPost = () => {
    setShowByClick((current) => !current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        style={{
          width: "100px",
          color: "#00df38",
          backgroundColor: "#0034df",
          borderRadius: "5px"
        }}
        type="button"
        onClick={showFieldAddNewPost}
      >
        ADD NEW POST
      </button>
     
      <div style={{ width: "500px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "20px" }}>POSTS</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px"
          }}
        >
          <RenderPost />
        </div>
      </div>
      {showByClick ? <AddNewPost /> : false}
    </div>
  );
};
