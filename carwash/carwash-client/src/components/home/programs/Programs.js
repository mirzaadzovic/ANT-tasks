import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import paths from "../../../consts/paths";
import {
  fetchPrograms,
  setProgram,
} from "../../../redux/actions/programsActions";
import {
  selectProgramLoading,
  selectPrograms,
} from "../../../redux/reducers/programsReducer";
import "./Programs.css";

const Programs = ({ programs, loading, getPrograms }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getPrograms();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  const handleProgram = (program) => {
    setProgram(program);
    navigate(paths[program.programId - 1]);
  };

  const reset = (action) => {
    action();
  };

  return (
    <div className="programs">
      <h4 className="program-txt">Choose washing programme</h4>
      {programs.map((p, idx) => (
        <button
          key={idx}
          className="btn programs__button"
          onClick={() => handleProgram(p)}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
};

const mapSateToProps = (state) => {
  return {
    programs: selectPrograms(state),
    loading: selectProgramLoading(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPrograms: () => dispatch(fetchPrograms()),
    setProgram: (program) => dispatch(setProgram(program)),
  };
};
export default connect(mapSateToProps, mapDispatchToProps)(Programs);
