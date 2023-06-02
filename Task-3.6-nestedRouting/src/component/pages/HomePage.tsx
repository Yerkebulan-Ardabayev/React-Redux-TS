import { FC, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store/store";
import { FetchApiPosts } from "../fetch/FetchApiPosts";
import { FetchApiTodos } from "../fetch/FetchApiTodos";
import { FetchApiUsers } from "../fetch/FetchApiUser";
import { Preloader } from "../preloader/Preloader";
import { RenderPost } from "../renderApiField/RenderPost";
import { RenderedUser } from "../renderApiField/RenderedUser";
import { RenderedTodoList } from "../renderApiField/RenderTodo";
import { DndContext } from "@dnd-kit/core";

const HomePage: FC<{}> = () => {
  const posts = useAppSelector((state: RootState) => state.posts);
  const users = useAppSelector((state: RootState) => state.user);
  const todo = useAppSelector((state: RootState) => state.todo);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-around"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {posts.postError && (
          <h2 style={{ fontSize: "20px" }}>{posts.postError}</h2>
        )}
        <div style={{ marginBottom: "50px" }}>
          {posts.postLoading ? <Preloader /> : <FetchApiPosts />}
        </div>
        <div style={{ marginBottom: "50px" }}>
          {posts.postLoading ? <Preloader /> : <FetchApiTodos />}
        </div>
        <div style={{ marginBottom: "50px" }}>
          {posts.postLoading ? <Preloader /> : <FetchApiUsers />}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <h2 style={{ fontSize: "20px" }}>REDUX POST</h2>
          <div style={{ marginRight: "54px" }}>
            {posts.postLoading ? (
              <Preloader />
            ) : (
              <DndContext>
                <RenderPost />
              </DndContext>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {todo.todoError && (
            <h2 style={{ fontSize: "20px" }}>{todo.todoError}</h2>
          )}
          <h2 style={{ fontSize: "20px" }}>REDUX TODO</h2>
          <div style={{ marginRight: "37px" }}>
            {todo.todoLoading ? <Preloader /> : <RenderedTodoList />}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {users.userError && (
            <h2 style={{ fontSize: "20px" }}>{users.userError}</h2>
          )}
          <h2 style={{ fontSize: "20px" }}>REDUX USER</h2>
          {users.userLoading ? <Preloader /> : <RenderedUser />}
        </div>
      </div>
    </div>
  );
};

export { HomePage };
