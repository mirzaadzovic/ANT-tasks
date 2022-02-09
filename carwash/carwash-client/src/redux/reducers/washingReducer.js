import {
  SET_DRYING_BASIC,
  SET_MINUTES_SELF_SERVICE,
  SET_WAX_BASIC,
  SET_ACTIVE_FOAM,
  SET_WASHING_PROGRAM,
} from "../actions/washingActions";

const initialState = {
  program: null,
  options: {},
};

export const selectWashingOptions = (state) => state.washing.options;
export const selectWashingProgram = (state) => state.washing.program;

const washingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WASHING_PROGRAM:
      return {
        ...state,
        program: action.payload,
      };
    case SET_DRYING_BASIC:
      return {
        ...state,
        options: { ...state.options, useDrying: action.payload },
      };
    case SET_WAX_BASIC:
      return {
        ...state,
        options: { ...state.options, useWaxProtection: action.payload },
      };
    case SET_MINUTES_SELF_SERVICE:
      return {
        ...state,
        options: { ...state.options, minutes: action.payload },
      };
    case SET_ACTIVE_FOAM:
      return {
        ...state,
        options: { ...state.options, foamType: action.payload },
      };
    default:
      return state;
  }
};

export default washingReducer;
