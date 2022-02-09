import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import paths from "../../../consts/paths";
import { fetchPrograms } from "../../../redux/actions/programsActions";
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
  const handleProgram = (id) => {
    navigate(paths[id - 1]);
  };

  return (
    <div className="programs">
      <h4 className="program-txt">Choose washing programme</h4>
      {programs.map((p, idx) => (
        <button
          key={idx}
          className="btn programs__button"
          onClick={() => handleProgram(p.programId)}
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
  };
};
export default connect(mapSateToProps, mapDispatchToProps)(Programs);
