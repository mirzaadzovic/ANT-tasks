import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../redux/reducers/userReducer";
import {
  selectWashingOptions,
  selectWashingPrice,
  selectWashingProgram,
} from "../../../redux/reducers/washingReducer";
import APIService from "../../../services/APIService";
import "./Checkout.css";

const Checkout = ({ program, options, user, price }) => {
  const [discount, setDiscount] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await APIService.getAll("/api/washings/discount", {
      customerId: user.customerId,
    });
    setDiscount(response);
  }, []);

  const submit = async () => {
    const request = {
      programId: program.programId,
      customerId: user.customerId,
      ...options,
    };
    const res = await APIService.post("/api/washings", request);
    alert("Payment successful");
    navigate("/");
  };

  const total = discount.hasDiscount ? (price * 0.8).toFixed(2) : price;

  return (
    <div className="checkout">
      <h2 className="program-txt">
        {discount.hasDiscount
          ? `You have 20% discount`
          : `No discount right now (${discount.washingsUntilDiscount} more washings until discount)`}
      </h2>
      <button className="btn programs__button" onClick={submit}>
        Pay ({total}KM)
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    program: selectWashingProgram(state),
    options: selectWashingOptions(state),
    price: selectWashingPrice(state),
  };
};
export default connect(mapStateToProps, null)(Checkout);
