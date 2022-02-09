import {
  SET_DRYING_BASIC,
  SET_MINUTES_SELF_SERVICE,
  SET_WAX_BASIC,
  SET_ACTIVE_FOAM,
  SET_WASHING_PROGRAM,
  RESET_WASHING_PROGRAM,
  RESET_WASHING,
} from "../actions/washingActions";

const initialState = {
  program: null,
  options: {},
  price: 0,
};

export const selectWashingOptions = (state) => state.washing.options;
export const selectWashingProgram = (state) => state.washing.program;
export const selectWashingPrice = (state) => state.washing.price;

const washingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WASHING_PROGRAM:
      return {
        ...state,
        program: action.payload,
        price: Number(action.payload.price),
      };
    case SET_DRYING_BASIC:
      return {
        ...state,
        options: { ...state.options, useDrying: action.payload },
        price: action.payload ? state.price + Number(2) : state.price,
      };
    case SET_WAX_BASIC:
      return {
        ...state,
        options: { ...state.options, useWaxProtection: action.payload },
        price: action.payload ? state.price + Number(2) : state.price,
      };
    case SET_MINUTES_SELF_SERVICE:
      return {
        ...state,
        options: { ...state.options, minutes: action.payload },
        price: Number(action.payload),
      };
    case SET_ACTIVE_FOAM:
      return {
        ...state,
        options: {
          ...state.options,
          foamType: action.payload,
        },
        price: Boolean(action.payload)
          ? state.price + Number(4)
          : state.price + Number(2),
      };
    case RESET_WASHING_PROGRAM:
      return {
        ...state,
        price: state.program?.price,
      };
    case RESET_WASHING:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default washingReducer;
