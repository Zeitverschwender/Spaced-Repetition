import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./createinterval.scss";
import Backend from "../services/backend";
import { NotificationQueueContext } from "./notificationqueue";

const MAX_VALUE = 30;
function CreateInterval(props) {
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState([[1, "day", 0]]);
  const [itemIDCounter, setItemIDCounter] = useState(0);
  const [addingInterval, setAddingInterval] = useState(false);
  const [invalidItems, setInvalidItems] = useState([]);

  const backend = new Backend();

  const createNotification = useContext(NotificationQueueContext);

  const getNewItem = () => {
    const [lastItemNumber, lastItemUnit] = interval[interval.length - 1];
    setItemIDCounter(itemIDCounter + 1);
    if (lastItemUnit === "month") {
      return [
        Math.min(MAX_VALUE, lastItemNumber + 1),
        "month",
        itemIDCounter + 1,
      ];
    } else {
      return lastItemNumber + 1 > MAX_VALUE
        ? [1, "month", itemIDCounter + 1]
        : [lastItemNumber + 1, "day", itemIDCounter + 1];
    }
  };

  const isBiggerThan = (item1, item2) => {
    if (item1[1] === item2[1]) {
      return item1[0] - item2[0] > 0;
    }
    return item1[1] === "month";
  };

  useEffect(() => {
    updateValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  const valueBetweenLimits = () => {
    const newInvalidItems = [];
    for (let i = 0; i < interval.length; i++) {
      if (interval[i][0] <= 0 || interval[i][0] > MAX_VALUE) {
        newInvalidItems.push(i);
      }
    }
    return newInvalidItems;
  };
  const correctValueOrder = () => {
    const newInvalidItems = [];
    for (let i = 1; i < interval.length; i++) {
      const element = interval[i];
      const prevElement = interval[i - 1];
      if (!isBiggerThan(element, prevElement)) {
        newInvalidItems.push(i);
      }
    }
    return newInvalidItems;
  };

  const updateValidity = () => {
    setInvalidItems([...valueBetweenLimits(), ...correctValueOrder()]);
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

  const handleReOrder = (result) => {
    if (!result.destination) return;
    const newInterval = [...interval];
    newInterval.splice(
      result.destination.index,
      0,
      ...newInterval.splice(result.source.index, 1)
    );
    setInterval(newInterval);
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
          <DragDropContext onDragEnd={handleReOrder}>
            <Droppable droppableId="newIntervalItems">
              {(provided, snapshot) => (
                <div
                  className={
                    "create-preset-values" +
                    (snapshot.isDraggingOver
                      ? " create-preset-values-dragging"
                      : "")
                  }
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {interval.map(([number, unit, id], i) => (
                    <Draggable key={id} draggableId={id.toString()} index={i}>
                      {(provided) => (
                        <div
                          className={
                            "create-preset-value" +
                            (invalidItems.indexOf(i) > -1
                              ? " create-preset-value-invalid"
                              : "")
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                            className={
                              "material-icons preset-remove-item" +
                              (i === 0 ? " disabled" : "")
                            }
                            title="Remove Item"
                            onClick={(e) => {
                              e.preventDefault();
                              interval.splice(i, 1);
                              setInterval([...interval]);
                            }}
                          >
                            clear
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
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
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="create-preset-footer">
          <div className="horizontal-sep" />
          <div
            className={
              "blue-button" +
              (title.length === 0 ||
              interval.length === 0 ||
              addingInterval ||
              invalidItems.length !== 0
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
