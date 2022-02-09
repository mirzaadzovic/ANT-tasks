import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logInUser,
  registerUser,
  userReset,
} from "../../redux/actions/userActions";
import { selectUser, selectUserError } from "../../redux/reducers/userReducer";
import Logo from "../logo/Logo";
import "./Login.css";

const Login = ({ loggedInUser, login, error, resetUserError, register }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    redirectIfLoggedIn();
    return () => {
      if (!loggedInUser?.customerId) resetUserError();
    };
  }, [loggedInUser, error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(username, password);
  };

  function redirectIfLoggedIn() {
    if (error) {
      setShowError(true);
      setPassword("");
    }
    if (loggedInUser?.customerId) navigate("/");
  }

  return (
    <div className="login">
      <Logo />
      <h1>{registration ? "Register" : "Login"}</h1>
      {showError && <p className="error">Wrong username or password</p>}
      <form>
        <input
          className="input login__input"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input login__input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {registration ? (
          <button
            type="submit"
            onClick={async (e) => await handleRegister(e)}
            className="btn login__button"
          >
            Register
          </button>
        ) : (
          <button
            type="submit"
            onClick={async (e) => await handleLogin(e)}
            className="btn login__button"
          >
            Login
          </button>
        )}
        {registration ? (
          <p
            className="link login__link"
            onClick={() => setRegistration(!registration)}
          >
            Already have an account? Login...
          </p>
        ) : (
          <p
            className="link login__link"
            onClick={() => setRegistration(!registration)}
          >
            Don't have an account? Register...
          </p>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: selectUser(state),
    error: selectUserError(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(logInUser(username, password)),
    resetUserError: () => dispatch(userReset()),
    register: (username, password) =>
      dispatch(registerUser({ username: username, password: password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
