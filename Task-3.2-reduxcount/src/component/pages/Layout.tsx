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
      <footer className="container">2023 year</footer>
    </>
  );
};

export { Layout };
