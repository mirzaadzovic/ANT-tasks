import APIService from "../../services/APIService";

export const FETCH_PROGRAMS_REQUEST = "FETCH_PROGRAMS_REQUEST";
export const fetchProgramsRequest = () => {
  return {
    type: FETCH_PROGRAMS_REQUEST,
  };
};

export const FETCH_PROGRAMS_SUCCESS = "FETCH_PROGRAMS_SUCCESS";
export const fetchProgramsSucces = (data) => {
  return {
    type: FETCH_PROGRAMS_SUCCESS,
    payload: data,
  };
};

export const FETCH_PROGRAMS_FAIL = "FETCH_PROGRAMS_FAIL";
export const fetchProgramsFail = () => {
  return {
    type: FETCH_PROGRAMS_FAIL,
  };
};

export const SET_PROGRAM = "SET_PROGRAM";
export const setProgram = (id) => {
  return {
    type: SET_PROGRAM,
    payload: id,
  };
};

export const fetchPrograms = () => {
  return (dispatch) => {
    dispatch(fetchProgramsRequest);
    APIService.getAll("/programs")
      .then((data) => {
        dispatch(fetchProgramsSucces(data));
      })
      .catch((err) => dispatch(fetchProgramsFail()));
  };
};
