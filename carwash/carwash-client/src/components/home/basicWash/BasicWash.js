import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { basicWashData } from "../../../consts/washingData";
import { resetWashingProgram } from "../../../redux/actions/washingActions";
import { selectWashingOptions } from "../../../redux/reducers/washingReducer";
import "./BasicWash.css";
import BasicWashOptions from "./BasicWashOptions";

const BasicWash = () => {
  const [step, setStep] = useState(0);
  const [text, setText] = useState(basicWashData[0].text);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextStep = (answer) => {
    setStep((old) => old + 1);

    if (step < basicWashData.length - 1) {
      console.log(step);
      setText(basicWashData[step + 1].text);
      setBtnDisabled(false);
    } else navigate("/checkout");
    const { action } = basicWashData[step];
    dispatch(action(answer));
  };

  const resetStates = () => {
    setStep(0);
    setText(basicWashData[0].text);
    setBtnDisabled(true);

    dispatch(resetWashingProgram());
  };
  const reset = () => {
    resetStates();
  };

  return (
    <div className="basicWash">
      <h4 className="program-txt">{text}</h4>
      <BasicWashOptions nextStep={nextStep} />
      <button
        onClick={reset}
        className={`btn basicWash__reset ${btnDisabled ? "btn-disabled" : ""}`}
        disabled={btnDisabled}
      >
        Reset
      </button>
    </div>
  );
};

export default BasicWash;
