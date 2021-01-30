import React from "react";
import PropTypes from "prop-types";

import "./createpreset.scss";

function CreatePreset(props) {
  return (
    <div className="overaly-back" onClick={props.hideMe}>
      <div
        className="overaly-content create-preset-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-preset-header">
          <span className="create-preset-title">CREATE PRESET</span>
          <span
            className="material-icons details-buttons"
            title="Exit"
            onClick={props.hideMe}
          >
            close
          </span>
        </div>
        <div className="horizontal-sep" />
        <div className="create-preset-footer">
          <div className="horizontal-sep" />
          <div className="blue-button">CREATE</div>
        </div>
      </div>
    </div>
  );
}

CreatePreset.propTypes = {
  hideMe: PropTypes.func.isRequired,
};

export default CreatePreset;
