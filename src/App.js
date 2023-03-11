import './App.css';
import React, { useState, useEffect } from "react";
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen'

function App() {
  // Setting up state for login status and token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // Checking for token in local Storage
  useEffect(() => {
    const stoken = localStorage.getItem('token');
    if (stoken) {
      setIsLoggedIn(true);
      setToken(stoken);
    }
  }, []);

  // Function to handle user login
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setToken(token);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken('');
    window.location.href = '/login';
  };

  // Setting up a timeout to automatically log user out after 5 minutes of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 5 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  // Rendering different components depending on login status
  return (
    <>
      {isLoggedIn ? (
        <MainScreen token={token} handleLogout={handleLogout} />
      ) : (
        <LoginScreen handleLogin={handleLogin} />
      )}

    </>
  );
}

export default App;
