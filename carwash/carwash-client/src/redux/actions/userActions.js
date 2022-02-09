import APIService from "../../services/APIService";
import AuthService from "../../services/AuthService";
import { selectUserError } from "../reducers/userReducer";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const userLoginSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const userLoginFaulire = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const USER_RESET = "USER_RESET";
export const userReset = () => ({
  type: USER_RESET,
});

export const USER_LOGOUT = "USER_LOGOUT_SUCCESS";
export const userLogoutSucces = () => ({
  type: USER_LOGOUT,
});

export const fetchLoggedInUser = () => {
  return (dispatch) => {
    dispatch(userLoginRequest);
    AuthService.getLoggedInUser()
      .then((data) => dispatch(userLoginSuccess(data)))
      .catch((err) => {
        dispatch(userLoginFaulire("Not logged in"));
        dispatch(userReset());
      });
  };
};

export const logInUser = (email, password) => {
  return (dispatch) => {
    dispatch(userLoginRequest);
    AuthService.logIn(email, password)
      .then((data) => dispatch(userLoginSuccess(data)))
      .catch((err) => {
        dispatch(userLoginFaulire("Not logged in"));
      });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    await AuthService.logOut();
    dispatch(userLogoutSucces());
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    await APIService.post("/auth/register", user)
      .then((data) => dispatch(userLoginSuccess(data)))
      .catch((err) => {
        console.log(err);
        userLoginFaulire(err.toString());
      });
  };
};
