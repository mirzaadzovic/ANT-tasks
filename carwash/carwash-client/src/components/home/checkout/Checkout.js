import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectWashingOptions,
  selectWashingProgram,
} from "../../../redux/reducers/washingReducer";
import "./Checkout.css";

const Checkout = () => {
  const program = useSelector(selectWashingProgram);
  const options = useSelector(selectWashingOptions);

  useEffect(() => {
    console.log(program);
    console.log(options);
  }, []);

  return (
    <div className="checkout">
      <p>Use drying: {options?.useDrying ? "2KM" : "NO"}</p>
      Use wax: {options?.useWaxProtection ? "2KM" : "NO"}
    </div>
  );
};

export default Checkout;
