import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import "./createinterval.scss";
import Backend from "../services/backend";
import { NotificationQueueContext } from "./notificationqueue";

const MAX_VALUE = 30;
function CreateInterval(props) {
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState([[1, "day"]]);
  const [addingInterval, setAddingInterval] = useState(false);

  const backend = new Backend();

  const createNotification = useContext(NotificationQueueContext);

  const getNewItem = () => {
    const [lastItemNumber, lastItemUnit] = interval[interval.length - 1];
    if (lastItemUnit === "month") {
      return [Math.min(MAX_VALUE, lastItemNumber + 1), "month"];
    } else {
      return lastItemNumber + 1 > MAX_VALUE
        ? [1, "month"]
        : [lastItemNumber + 1, "day"];
    }
  };

  const createOnClick = (e) => {
    e.preventDefault();

    setAddingInterval(true);

    const apiIntervalFormat = [];
    interval.forEach(([itemNumber, itemUnit]) => {
      const lastValue =
        apiIntervalFormat.length > 0
          ? apiIntervalFormat[apiIntervalFormat.length - 1]
          : 0;
      apiIntervalFormat.push(
        lastValue + itemNumber * (itemUnit === "month" ? 30 : 1)
      );
    });

    backend.createInterval(
      { title, days: apiIntervalFormat },
      (data) => {
        props.onAddNewInterval(data);
        createNotification("Success", "Interval was added.");
        props.hideMe();
      },
      (err) => {
        createNotification("Error", "Couldn't add interval.");
        setAddingInterval(false);
      }
    );
  };

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
                  <input
                    type="number"
                    defaultValue={number}
                    min="1"
                    max={MAX_VALUE}
                    onChange={(e) => {
                      e.preventDefault();
                      interval[i][0] = Number(e.target.value);
                      setInterval([...interval]);
                    }}
                  />
                  <select
                    defaultValue={unit}
                    onChange={(e) => {
                      e.preventDefault();
                      interval[i][1] = e.target.value;
                      setInterval([...interval]);
                    }}
                  >
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
            <div
              className="create-preset-add-item"
              onClick={() => setInterval([...interval, getNewItem()])}
            >
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
          <div
            className={
              "blue-button" +
              (title.length === 0 || interval.length === 0 || addingInterval
                ? " disabled"
                : "")
            }
            onClick={createOnClick}
          >
            CREATE
          </div>
        </div>
      </div>
    </div>
  );
}

CreateInterval.propTypes = {
  hideMe: PropTypes.func.isRequired,
  onAddNewInterval: PropTypes.func.isRequired,
};

export default CreateInterval;
