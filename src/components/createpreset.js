import React from "react";
import PropTypes from "prop-types";

function CreatePreset(props) {
  return (
    <div className="overaly-back" onClick={() => props.hideMe()}>
      <div
        className="overaly-content"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

CreatePreset.propTypes = {
  hideMe: PropTypes.func.isRequired,
};

export default CreatePreset;
