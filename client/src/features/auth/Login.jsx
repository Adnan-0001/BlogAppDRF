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

  const id = useSelector(selectCurrentUserId);
  console.log("id now is", id);

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );

  return <div>{isLoading ? <h1>Loading...</h1> : loginForm}</div>;
};
export default Login;
