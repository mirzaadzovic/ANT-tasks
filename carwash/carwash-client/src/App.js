import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
