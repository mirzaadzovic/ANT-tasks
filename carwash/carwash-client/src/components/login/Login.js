import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logInUser, userReset } from "../../redux/actions/userActions";
import { selectUser, selectUserError } from "../../redux/reducers/userReducer";
import Logo from "../logo/Logo";
import "./Login.css";

const Login = ({ loggedInUser, login, error, resetUserError }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

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

  function redirectIfLoggedIn() {
    console.log(loggedInUser);
    if (error) {
      setShowError(true);
      setPassword("");
    }
    if (loggedInUser?.customerId) navigate("/");
  }

  return (
    <div className="login">
      <Logo />
      <h1>Login</h1>
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
        <button
          type="submit"
          onClick={async (e) => await handleLogin(e)}
          className="btn login__button"
        >
          Login
        </button>
        <Link className="link login__link" to="/register">
          Don't have an account? Register...
        </Link>
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
    login: (email, password) => dispatch(logInUser(email, password)),
    resetUserError: () => dispatch(userReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
