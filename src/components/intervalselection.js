import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";

import CreateInterval from "./createinterval";

import { NotificationQueueContext } from "./notificationqueue";
import Backend from "../services/backend";

const IntervalSelection = forwardRef((props, ref) => {
  const [isCreateIntervalShown, setIsCreateIntervalShown] = useState(false);
  const [defaultIntervals, setDefaultIntervals] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [currentValue, setCurrentValue] = useState("");

  const createNotification = useContext(NotificationQueueContext);
  useEffect(() => {
    const _backend = new Backend();
    _backend.getDefaultIntervals(
      (data) => setDefaultIntervals(data),
      createNotification
    );
    _backend.getIntervals((data) => setIntervals(data), createNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            setIntervals([...intervals, newInterval])
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
};

export default IntervalSelection;
