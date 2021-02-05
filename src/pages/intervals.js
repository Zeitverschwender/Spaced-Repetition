import React, { useContext } from "react";

import { IntervalsContext } from "../App";

import "./intervals.scss";

const getFormattedDays = (days) => {
  const output = [];
  days.forEach((element) => {
    if (element > 30) {
      output.push(`${element / 30}m`);
    } else {
      output.push(`${element}d`);
    }
  });
  return output;
};

export default function Intervals() {
  const { intervals } = useContext(IntervalsContext);
  return (
    <div className="content">
      <div className="repeating-list">
        {intervals.length === 0 ? (
          <div className="repeating-item loading-item">LOADING...</div>
        ) : (
          intervals.map((item) => (
            <div key={item._id} className="repeating-item">
              <span className="interval-list-title">{item.title}</span>
              <span className="interval-list-info">{`${getFormattedDays(
                item.days
              ).join(", ")}`}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
