import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../navigation/Navigation";

const Layout: FC<{}> = () => {
  return (
    <>
      <Navigation />
      <main className="container">
        <Outlet />
      </main>
      <footer className="container">
        {new Date().toLocaleDateString("ru-RU") + "г."}
      </footer>
    </>
  );
};

export { Layout };
