import React, { useState } from "react";
import PropTypes from "prop-types";

import "./createinterval.scss";

function CreateInterval(props) {
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState([[1, "day"]]);
  return (
    <div className="overaly-back" onClick={props.hideMe}>
      <div
        className="overaly-content create-preset-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-preset-header">
          <span className="create-preset-title">CREATE INTERVAL</span>
          <span
            className="material-icons details-buttons"
            title="Exit"
            onClick={props.hideMe}
          >
            close
          </span>
        </div>
        <div className="horizontal-sep" />
        <div className="intervals-creation">
          <input
            type="text"
            placeholder="Interval title"
            id="preset-title"
            maxLength="128"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>You will get a notification</h3>
          <div className="create-preset-values">
            {interval.map(([number, unit], i) => {
              return (
                <div key={i} className="create-preset-value">
                  <span
                    className="material-icons preset-reorder-item"
                    title="Re-order"
                  >
                    drag_indicator
                  </span>
                  <span className="preset-value-start-text">
                    {i === 0 ? "First After" : "Then After"}
                  </span>
                  <input type="number" defaultValue={number} min="1" max="30" />
                  <select defaultValue={unit}>
                    <option value="day">DAY(S)</option>
                    <option value="month">MONTH(S)</option>
                  </select>
                  <span
                    className="material-icons preset-remove-item"
                    title="Remove Item"
                  >
                    clear
                  </span>
                </div>
              );
            })}
            <div className="create-preset-add-item">
              <span
                className="material-icons preset-add-item-icon"
                title="Add Item"
              >
                add
              </span>
            </div>
          </div>
        </div>
        <div className="create-preset-footer">
          <div className="horizontal-sep" />
          <div className="blue-button">CREATE</div>
        </div>
      </div>
    </div>
  );
}

CreateInterval.propTypes = {
  hideMe: PropTypes.func.isRequired,
};

export default CreateInterval;
