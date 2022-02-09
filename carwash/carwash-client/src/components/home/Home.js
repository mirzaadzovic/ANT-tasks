import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { activeFoamPath, basicWashPath } from "../../consts/paths";
import { logoutUser } from "../../redux/actions/userActions";
import { selectUser } from "../../redux/reducers/userReducer";
import Logo from "../logo/Logo";
import BasicWash from "./basicWash/BasicWash";
import "./Home.css";
import Programs from "./programs/Programs";

function Home({ user, logout }) {
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!user?.customerId) navigate("/login");
  }, [user]);

  function handleLogout() {
    logout();
  }

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__logo">
          <Logo />
        </div>
        <div className="home__headerOptions">
          <h4>{user?.username}</h4>
          <p className="link" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>

      <div className="home__body">
        <Routes>
          <Route path="/" element={<Programs />} />
          <Route path={basicWashPath} element={<BasicWash />} />
          <Route path={activeFoamPath} element={<h1>ACTIVE FOAM</h1>} />
        </Routes>
      </div>
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
