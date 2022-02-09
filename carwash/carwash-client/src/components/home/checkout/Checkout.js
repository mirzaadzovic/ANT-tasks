import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import {
  selectWashingOptions,
  selectWashingProgram,
} from "../../../redux/reducers/washingReducer";
import APIService from "../../../services/APIService";
import "./Checkout.css";

const Checkout = () => {
  const program = useSelector(selectWashingProgram);
  const options = useSelector(selectWashingOptions);
  const user = useSelector(selectUser);

  useEffect(async () => {
    const hasDiscount = await APIService.getAll(
      "/api/washings/discount/" + user.customerId
    );
    if (hasDiscount) console.log("IMA POPUSTA");
    else console.log(hasDiscount, "Nema popusta");
  }, []);

  return (
    <div className="checkout">
      <p>Use drying: {options?.useDrying ? "2KM" : "NO"}</p>
      Use wax: {options?.useWaxProtection ? "2KM" : "NO"}
    </div>
  );
};

export default Checkout;
