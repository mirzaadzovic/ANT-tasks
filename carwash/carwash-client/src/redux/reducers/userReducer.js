import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_RESET,
} from "../actions/userActions";

const initialState = {
  loggedInUser: null,
  loading: false,
  error: "",
};

export const selectUser = (state) => state.user.loggedInUser;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loggedInUser: action.payload,
        loading: false,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      console.log(action.payload);
      return {
        loggedInUser: null,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return initialState;

    case USER_RESET:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export default userReducer;
