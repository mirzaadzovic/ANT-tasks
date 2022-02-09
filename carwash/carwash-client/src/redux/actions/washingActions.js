export const SET_WASHING_PROGRAM = "SET_WASHING_PROGRAM";
export const setWashingProgram = (program) => {
  return {
    type: SET_WASHING_PROGRAM,
    payload: program,
  };
};

export const RESET_WASHING_PROGRAM = "RESET_WASHING_PROGRAM";
export const resetWashingProgram = () => {
  return {
    type: RESET_WASHING_PROGRAM,
  };
};

export const SET_DRYING_BASIC = "BASIC_SET_DRYING";
export const setDryingBasic = (useDrying) => {
  return {
    type: SET_DRYING_BASIC,
    payload: useDrying,
  };
};

export const SET_WAX_BASIC = "BASIC_SET_WAX";
export const setWaxBasic = (useWax) => {
  return {
    type: SET_WAX_BASIC,
    payload: useWax,
  };
};

export const SET_MINUTES_SELF_SERVICE = "SET_MINUTES_SELF_SERVICE";
export const setMinutesSelfService = (mins) => {
  return {
    type: SET_MINUTES_SELF_SERVICE,
    payload: mins,
  };
};

export const SET_ACTIVE_FOAM = "SET_ACTIVE_FOAM";
export const setActiveFoam = (foam) => {
  return {
    type: SET_ACTIVE_FOAM,
    payload: foam,
  };
};
