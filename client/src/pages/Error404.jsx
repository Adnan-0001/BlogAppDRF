import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <section className="section">
      <h2>404</h2>
      <p>page not found</p>
      <Link to="/">back home</Link>
    </section>
  );
};
export default Error404;
