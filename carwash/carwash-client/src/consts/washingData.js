import { setDryingBasic, setWaxBasic } from "../redux/actions/washingActions";

export const basicWashData = [
  {
    text: "Do you want to use drying? (2 KM)",
    action: setDryingBasic,
  },
  {
    text: "Do you want to use wax protection? (2KM)",
    action: setWaxBasic,
  },
];

const selfServiceData = [
  {
    text: "Choose minutes",
  },
];
