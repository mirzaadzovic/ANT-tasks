import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basicWashData } from "../../../consts/washingData";
import { resetWashingProgram } from "../../../redux/actions/washingActions";
import { selectWashingOptions } from "../../../redux/reducers/washingReducer";
import "./BasicWash.css";
import BasicWashOptions from "./BasicWashOptions";

const BasicWash = () => {
  const options = useSelector(selectWashingOptions);
  const [step, setStep] = useState(0);
  const [text, setText] = useState(basicWashData[0].text);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const dispatch = useDispatch();

  const nextStep = (answer) => {
    setStep((old) => old + 1);

    if (step < basicWashData.length - 1) {
      setText(basicWashData[step + 1].text);
      setBtnDisabled(false);
    } else {
      setCheckout(true);
    }

    const { action } = basicWashData[step];
    dispatch(action(answer));
  };

  const resetStates = () => {
    setStep(0);
    setText(basicWashData[0].text);
    setBtnDisabled(true);
    setCheckout(false);

    dispatch(resetWashingProgram());
  };
  const reset = () => {
    resetStates();
  };

  const title = checkout ? "Click to checkout" : text;
  return (
    <div className="basicWash">
      <h4 className="program-txt">{title}</h4>
      {checkout ? (
        <div>
          <button onClick={() => console.log(options)}>Options</button>
        </div>
      ) : (
        <BasicWashOptions nextStep={nextStep} />
      )}
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
