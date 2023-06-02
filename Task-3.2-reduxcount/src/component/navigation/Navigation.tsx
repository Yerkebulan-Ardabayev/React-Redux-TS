import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navigation: FC<{}> = () => {
  return (
    <>
      <header>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/todoList">TO DO LIST</NavLink>
        <NavLink to="/posts">LIST OF POSTS </NavLink>
        <NavLink to="/userList">CUSTOMER</NavLink>
      </header>
    </>
  );
};

export { Navigation };
