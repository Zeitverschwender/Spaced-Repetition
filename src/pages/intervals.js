import React, { useState, useContext } from "react";

import { IntervalsContext } from "../App";
import CreateInterval from "../components/createinterval";
import { convertCumulativeDaysToDayMonth } from "../utility/intervals";

import "./intervals.scss";

const getFormattedDays = (days) => {
  const output = [];
  convertCumulativeDaysToDayMonth(days).forEach(([number, unit]) => {
    output.push(`${number}${unit === "month" ? "m" : "d"}`);
  });
  return output;
};

export default function Intervals() {
  const [isCreateIntervalShown, setIsCreateIntervalShown] = useState(false);
  const [isEditIntervalShown, setIsEditIntervalShown] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const {
    intervals,
    intervalsReceived,
    defaultIntervals,
    setIntervals,
  } = useContext(IntervalsContext);
  return (
    <React.Fragment>
      {isEditIntervalShown && clickedItem && (
        <CreateInterval
          hideMe={() => setIsEditIntervalShown(false)}
          defaultItem={clickedItem}
          onAddNewInterval={(editedItem) => {
            const newIntervals = [...intervals];
            newIntervals[
              newIntervals.findIndex((item) => item._id === editedItem._id)
            ] = editedItem;
            setIntervals(newIntervals);
          }}
          onDeleteNewInterval={(itemID) => {
            const newIntervals = [...intervals];
            newIntervals.splice(
              newIntervals.findIndex((item) => item._id === itemID),
              1
            );
            setIntervals(newIntervals);
          }}
          isEdit={true}
        />
      )}
      {isCreateIntervalShown && (
        <CreateInterval
          hideMe={() => setIsCreateIntervalShown(false)}
          onAddNewInterval={(newInterval) =>
            setIntervals([newInterval, ...intervals])
          }
        ></CreateInterval>
      )}
      <div className="content">
        <h2 className="my-intervals-titles">MY INTERVALS</h2>
        <div className="repeating-list">
          {!intervalsReceived ? (
            <div className="repeating-item loading-item">LOADING...</div>
          ) : (
            <React.Fragment>
              {intervals.map((item) => (
                <div
                  key={item._id}
                  className="repeating-item"
                  onClick={() => {
                    setClickedItem(item);
                    setIsEditIntervalShown(true);
                  }}
                >
                  <span className="interval-list-title">{item.title}</span>
                  <span className="interval-list-info">{`${getFormattedDays(
                    item.days
                  ).join(", ")}`}</span>
                </div>
              ))}

              <div
                className="create-item-button"
                onClick={() => setIsCreateIntervalShown(true)}
              >
                <span className="material-icons">add</span> Create Interval
              </div>
            </React.Fragment>
          )}
        </div>
        <h2 className="my-intervals-titles">GLOBAL INTERVALS</h2>
        <div className="repeating-list">
          {!intervalsReceived ? (
            <div className="repeating-item loading-item">LOADING...</div>
          ) : (
            defaultIntervals.map((item) => (
              <div key={item._id} className="repeating-item no-pointer-cursor">
                <span className="interval-list-title">{item.title}</span>
                <span className="interval-list-info">{`${getFormattedDays(
                  item.days
                ).join(", ")}`}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
