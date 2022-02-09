import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";
import { selectUser } from "../../redux/reducers/userReducer";
import Logo from "../logo/Logo";
import "./Home.css";

function Home({ user, logout }) {
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    console.log(user);
    if (!user?.customerId) navigate("/login");
  }, [user]);

  function handleLogout() {
    logout();
  }

  return (
    <div className="home">
      <div className="home__header">
        <Logo />
        <div className="home__headerOptions">
          <h5>{user?.username}</h5>
          <p className="link" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>
      <Routes>
        <Route path="kec" element={<h1>kec</h1>} />
        <Route path="dvica" element={<h1>dvica</h1>} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
