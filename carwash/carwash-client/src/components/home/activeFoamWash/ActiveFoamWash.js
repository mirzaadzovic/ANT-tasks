import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeFoamData } from "../../../consts/washingData";
import { resetWashingProgram } from "../../../redux/actions/washingActions";
import "./ActiveFoamWash.css";

const ActiveFoamWash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => dispatch(resetWashingProgram()), []);

  function handleProgram(id) {
    dispatch(activeFoamData.action(id));
    navigate("/checkout");
  }
  return (
    <div className="activeFoamWash">
      <h4 className="program-txt">{activeFoamData.text} (1KM/min)</h4>
      {activeFoamData.options.map((p, idx) => (
        <button
          key={idx}
          className="btn programs__button"
          onClick={() => handleProgram(idx)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default ActiveFoamWash;
