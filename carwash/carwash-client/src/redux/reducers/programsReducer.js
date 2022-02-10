import {
  FETCH_PROGRAMS_FAIL,
  FETCH_PROGRAMS_REQUEST,
  FETCH_PROGRAMS_SUCCESS,
} from "../actions/programsActions";

const initialState = {
  programs: [],
  loading: false,
  error: false,
};

export const selectPrograms = (state) => state.program.programs;
export const selectProgramError = (state) => state.program.error;
export const selectProgramLoading = (state) => state.program.loading;

const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGRAMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROGRAMS_SUCCESS:
      return {
        error: "",
        loading: false,
        programs: action.payload,
      };
    case FETCH_PROGRAMS_FAIL:
      return {
        ...initialState,
        error: "Error fetching programs",
      };
    default:
      return state;
  }
};

export default programReducer;
