import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/home/Home";
import { useSelector } from "react-redux";
import { selectUserLoading } from "./redux/reducers/userReducer";

function App() {
  const loading = useSelector(selectUserLoading);
  return (
    <div className="app">
      {loading ? (
        "Loading..."
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
