import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TodoList } from "./component/pages/TodoListPage ";
import { NotFoundPage } from "./component/pages/NotFoundPage";
import { PostListPage } from "./component/pages/PostListPage";
import { HomePage } from "./component/pages/HomePage";
import { Layout } from "./component/pages/Layout";
import { UserList } from "./component/pages/UserListPage";
import { FC } from "react";
import { EditPostForm } from "./component/editForm/EditPostForm";
import { EditToDoForm } from "./component/editForm/EditToDoForm";
import { EditUserForm } from "./component/editForm/EditUserForm";
import { ExampleDnDBeauty } from "./component/examplesDnDBeauty/ExampleDnDBeauty";

const App: FC<{}> = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="example" element={<ExampleDnDBeauty />} />
          <Route path="todoList" element={<TodoList />} />
          <Route path="posts" element={<PostListPage />} />
          <Route path="userList" element={<UserList />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/editToDo/:todoId" element={<EditToDoForm />} />
          <Route path="/editUser/:userId" element={<EditUserForm />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
