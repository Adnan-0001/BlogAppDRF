import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const SharedLayout = () => {
  return (
    <section className="section">
      <Header />
      <Outlet />
    </section>
  );
};
