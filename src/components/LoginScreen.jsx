import React, { useState } from "react";
import "../styles/LoginScreen.css";

const LoginScreen = () => {
  // Initializing state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Event handlers for email and password input fields
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login button event
  const handleLogin = () => {
    // Validating email and password
    if (email === "example@gmail.com" && password === "123456") {
      // Generating token for authenticated user and storing it in local storage
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("token", token);
      // Redirecting to dashboard page i.e MainScreen component
      window.location.href = "/dashboard";
    } else {
      // Displaying error message if invalid email or password is entered
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <>
      {errorMsg && <p>{errorMsg}</p>}
      <div className="outer-container">
        <input
          className="inp-form"
          type="email"
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          className="inp-form"
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <span className="option">Don't have an account ? Signup instead</span>
        <button className="btn-submit" onClick={handleLogin}>
          Submit
        </button>
        <span className="or">OR</span>
        <button className="btn-2">
          <span className="logo"></span>Login with Google
        </button>
      </div>
    </>
  );
};

export default LoginScreen;
