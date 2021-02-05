import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";

import CreateInterval from "./createinterval";

import { IntervalsContext } from "../App";

const IntervalSelection = forwardRef((props, ref) => {
  const [isCreateIntervalShown, setIsCreateIntervalShown] = useState(false);
  const [currentValue, setCurrentValue] = useState(props.defaultValue);

  const { intervals, defaultIntervals, setIntervals } = useContext(
    IntervalsContext
  );

  useImperativeHandle(ref, () => ({
    clear() {
      setCurrentValue("");
    },
  }));

  return (
    <React.Fragment>
      {isCreateIntervalShown && (
        <CreateInterval
          hideMe={() => setIsCreateIntervalShown(false)}
          onAddNewInterval={(newInterval) =>
            setIntervals([newInterval, ...intervals])
          }
        ></CreateInterval>
      )}
      <div className={props.className}>
        <select
          className={props.selectClassName}
          value={currentValue}
          onChange={(e) => {
            let value = e.target.value;
            if (value === "create-item") {
              value = "";
              e.target.value = "";
              setIsCreateIntervalShown(true);
            }
            props.onIntervalChange(value);
            setCurrentValue(value);
          }}
        >
          <option value="" disabled hidden>
            Interval
          </option>
          {[...intervals, ...defaultIntervals].map((item) => (
            <option key={item._id} value={item._id}>
              {item.title} ({item.days.toString()})
            </option>
          ))}
          <option value="create-item">Create Item ...</option>
        </select>
      </div>
    </React.Fragment>
  );
});

IntervalSelection.propTypes = {
  onIntervalChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
};

IntervalSelection.defaultProps = {
  defaultValue: "",
};

export default IntervalSelection;
