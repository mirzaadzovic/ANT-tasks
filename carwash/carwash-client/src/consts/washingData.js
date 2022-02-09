import {
  setActiveFoam,
  setDryingBasic,
  setMinutesSelfService,
  setWaxBasic,
} from "../redux/actions/washingActions";

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

export const selfServiceData = {
  text: "Choose minutes",
  options: ["2", "5", "10"],
  action: setMinutesSelfService,
};

export const activeFoamData = {
  text: "Choose active foam type",
  options: ["Dr. Active (2KM)", "Nano Pro (4KM)"],
  action: setActiveFoam,
};
