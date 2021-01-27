import React from "react";
import PropTypes from "prop-types";

import "./confirmbox.scss";

function ConfirmBox(props) {
  return (
    <div className="overaly-back" onClick={() => props.hideMe()}>
      <div className="confirm-box-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-box-msg">{props.msg}</div>
        <div className="horizontal-sep"></div>
        <div className="confirm-box-options">
          <div
            className="yes-button"
            onClick={() => {
              props.callOnYes();
              props.hideMe();
            }}
          >
            YES
          </div>
          <div
            className="no-button"
            onClick={() => {
              (props.callOnNo || (() => {}))();
              props.hideMe();
            }}
          >
            NO
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmBox.propTypes = {
  msg: PropTypes.string.isRequired,
  callOnYes: PropTypes.func.isRequired,
  callOnNo: PropTypes.func,
  hideMe: PropTypes.func.isRequired,
};

export default ConfirmBox;
