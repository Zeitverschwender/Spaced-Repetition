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
  const [iscreateIntervalShown, setIsCreateIntervalShown] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const { intervals, defaultIntervals, setIntervals } = useContext(
    IntervalsContext
  );
  return (
    <React.Fragment>
      {iscreateIntervalShown && clickedItem && (
        <CreateInterval
          hideMe={() => setIsCreateIntervalShown(false)}
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
      <div className="content">
        {intervals.length === 0 ? (
          <div className="repeating-list">
            <div className="repeating-item loading-item">LOADING...</div>
          </div>
        ) : (
          <React.Fragment>
            <h2 className="my-intervals-titles">MY INTERVALS</h2>
            <div className="repeating-list">
              {intervals.map((item) => (
                <div
                  key={item._id}
                  className="repeating-item"
                  onClick={() => {
                    setClickedItem(item);
                    setIsCreateIntervalShown(true);
                  }}
                >
                  <span className="interval-list-title">{item.title}</span>
                  <span className="interval-list-info">{`${getFormattedDays(
                    item.days
                  ).join(", ")}`}</span>
                </div>
              ))}
            </div>
            <h2 className="my-intervals-titles">GLOBAL INTERVALS</h2>
            <div className="repeating-list">
              {defaultIntervals.map((item) => (
                <div
                  key={item._id}
                  className="repeating-item no-pointer-cursor"
                >
                  <span className="interval-list-title">{item.title}</span>
                  <span className="interval-list-info">{`${getFormattedDays(
                    item.days
                  ).join(", ")}`}</span>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
