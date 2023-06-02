import { FC, useState } from "react";
import { AddNewToDo } from "../addNewField/AddNewToDo";
import { RenderedTodoList } from "../renderApiField/RenderTodo";

export const TodoList: FC<{}> = () => {
  const [showByClick, setShowByClick] = useState<boolean>(false);

  const showFieldAddNewToDo = () => {
    setShowByClick((current) => !current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        style={{
          width: "100px",
          margin: "5px",
          color: "#00df38",
          backgroundColor: "#0034df",
          borderRadius: "5px"
        }}
        type="button"
        onClick={showFieldAddNewToDo}
      >
        ADD NEW TODO
      </button>
      <div style={{ width: "600px", margin: "0 auto", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "20px" }}>TODOS</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px"
          }}
        >
          <RenderedTodoList />
        </div>
      </div>
      <div>
        {showByClick ? <AddNewToDo /> : false}
      </div>
    </div>
  );
};
