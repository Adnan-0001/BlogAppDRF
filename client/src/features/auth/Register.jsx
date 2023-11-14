import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils";
import { useRegisterMutation } from "./authApiSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handlePassword2Input = (e) => setPassword2(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password != password2) {
        showToast({
          message: "Password fields do not match!",
          type: "error",
        });
        throw new Error("Password fields do not match");
      }
      const result = await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        client_domain: window.location.origin, // sending current site domain
      }).unwrap();

      setEmail("");
      setPassword("");
      setPassword2("");
      setFirstName("");
      setLastName("");

      showToast({
        message: "Verification email sent, check your inbox!",
        type: "info",
      });

      navigate("/login");
    } catch (err) {
      console.log("Registration error: ", err);

      const emailError = err?.data?.email;

      if (err.status === 400 && emailError) {
        if (emailError) {
          showToast({ message: emailError[0], type: "error" });
          return;
        }
      }
      showToast({ message: "Something went wrong!", type: "error" });
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
