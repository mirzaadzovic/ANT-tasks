import React from "react";

const BasicWashOptions = ({ nextStep }) => {
  return (
    <div className="basicWash__options">
      <button className="btn" onClick={() => nextStep(true)}>
        YES
      </button>
      <button className="btn" onClick={() => nextStep(false)}>
        NO
      </button>
    </div>
  );
};

export default BasicWashOptions;
