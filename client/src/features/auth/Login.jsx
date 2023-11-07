import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { selectCurrentUserId } from "./authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      const { tokens } = result;
      dispatch(setCredentials({ ...tokens }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const loginForm = (
    <section className="login-form">
      <form className="form" onSubmit={handleSubmit}>
        <h4>Login</h4>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={handleEmailInput}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            onChange={handlePwdInput}
            value={password}
            required
          />
        </div>

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </section>
  );

  return <div>{isLoading ? <h1>Loading...</h1> : loginForm}</div>;
};
export default Login;
