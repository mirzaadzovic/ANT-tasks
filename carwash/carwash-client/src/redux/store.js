import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchLoggedInUser } from "./actions/userActions";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
  user: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(fetchLoggedInUser());

export default store;
