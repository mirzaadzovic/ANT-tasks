import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selfServiceData } from "../../../consts/washingData";
import { resetWashingProgram } from "../../../redux/actions/washingActions";
import "./SelfServiceWash.css";

const SelfServiceWash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => dispatch(resetWashingProgram()), []);

  function handleProgram(id) {
    const price = selfServiceData.options[id];
    dispatch(selfServiceData.action(price));
    navigate("/checkout");
  }
  return (
    <div className="selfServiceWash">
      <h4 className="program-txt">{selfServiceData.text} (1KM/min)</h4>
      {selfServiceData.options.map((p, idx) => (
        <button
          key={idx}
          className="btn programs__button"
          onClick={() => handleProgram(idx)}
        >
          {p} mins
        </button>
      ))}
    </div>
  );
};

export default SelfServiceWash;
