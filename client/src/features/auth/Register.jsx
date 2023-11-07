import { useState } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handlePassword2Input = (e) => setPassword2(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password != password2) {
        throw new Error("Password fields do not match");
      }
      const result = await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }).unwrap();
      const { tokens } = result;
      dispatch(setCredentials({ ...tokens }));
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/dashboard");
    } catch (error) {
      console.log("Registration error: ", error);
    }
  };

  const registrationForm = (
    <section className="register-form">
      <form className="form" onSubmit={handleSubmit}>
        <h4>Register</h4>

        <div className="form-row">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="form-input"
            value={firstName}
            onChange={handleFirstNameInput}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="form-input"
            value={lastName}
            onChange={handleLastNameInput}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={handleEmailInput}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={handlePasswordInput}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="passwordAgain" className="form-label">
            Password Again:
          </label>
          <input
            type="password"
            id="passwordAgain"
            className="form-input"
            value={password2}
            onChange={handlePassword2Input}
            required
          />
        </div>

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </section>
  );

  return <>{isLoading ? <h1>Loading...</h1> : registrationForm}</>;
};
export default Register;
