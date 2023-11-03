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
    try {
    } catch (error) {
      console.log("Registration error: ", error);
    }
  };

  const registrationForm = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={handleFirstNameInput}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={handleLastNameInput}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailInput}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordInput}
        required
      />

      <label htmlFor="passwordAgain">Password Again:</label>
      <input
        type="password"
        id="passwordAgain"
        value={password2}
        onChange={handlePassword2Input}
        required
      />
      <button>Register</button>
    </form>
  );

  return <>{isLoading ? <h1>Loading...</h1> : registrationForm}</>;
};
export default Register;
