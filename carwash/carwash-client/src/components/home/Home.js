import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  activeFoamPath,
  basicWashPath,
  selfServicePath,
} from "../../consts/paths";
import { fetchLoggedInUser, logoutUser } from "../../redux/actions/userActions";
import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from "../../redux/reducers/userReducer";
import { selectWashingPrice } from "../../redux/reducers/washingReducer";
import Logo from "../logo/Logo";
import ActiveFoamWash from "./activeFoamWash/ActiveFoamWash";
import BasicWash from "./basicWash/BasicWash";
import Checkout from "./checkout/Checkout";
import "./Home.css";
import Programs from "./programs/Programs";
import SelfServiceWash from "./selfServiceWash/SelfServiceWash";

function Home({ user, logout, loading, price }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  function handleLogout() {
    logout();
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__logo">
          <Logo />
        </div>
        <div className="home__headerOptions">
          <div className="home__user">
            <h4>{user?.username}</h4>
            <p className="link" onClick={handleLogout}>
              Logout
            </p>
          </div>
        </div>
      </div>
      {price > 0 && <p className="home__price">Total Price: {price}KM</p>}

      <div className="home__body">
        <Routes>
          <Route path="/" element={<Programs />} />
          <Route path={basicWashPath} element={<BasicWash />} />
          <Route path={activeFoamPath} element={<ActiveFoamWash />} />
          <Route path={selfServicePath} element={<SelfServiceWash />} />
          <Route path={"/checkout"} element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    error: selectUserError(state),
    loading: selectUserLoading(state),
    price: selectWashingPrice(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
    fetchUser: () => dispatch(fetchLoggedInUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
