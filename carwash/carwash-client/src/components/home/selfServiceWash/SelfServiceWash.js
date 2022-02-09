import React from "react";
import { useDispatch } from "react-redux";
import { selfServiceData } from "../../../consts/washingData";
import "./SelfServiceWash.css";

const SelfServiceWash = () => {
  const dispatch = useDispatch();

  function handleProgram(id) {
    dispatch(selfServiceData.action(id));
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
