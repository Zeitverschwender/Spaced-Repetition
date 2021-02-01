import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./createitem.scss";
import CreateInterval from "./createinterval";

export default function CreateItem(props) {
  const [isCreateItemShown, setIsCreateItemShown] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [isAllOptionsShown, setIsAllOptionsShown] = useState(false);
  const [isCreateIntervalShown, setIsCreateIntervalShown] = useState(false);

  const createItemTextbox = useRef(null);

  useEffect(() => {
    if (isCreateItemShown) {
      createItemTextbox.current.focus();
    }
  }, [isCreateItemShown]);

  const exitCreation = () => {
    setIsCreateItemShown(false);
    setNewItem({});
    setIsAllOptionsShown(false);
  };
  const toggleAllOptions = (e) => setIsAllOptionsShown(!isAllOptionsShown);
  const createOnClick = (e) => {
    props.onAddItem(newItem, () => exitCreation());
  };

  const cancelOnClick = (e) => {
    e.preventDefault();
    exitCreation();
  };
  const createItemOnClick = (e) => {
    e.preventDefault();
    setIsCreateItemShown(true);
  };
  return (
    <React.Fragment>
      {isCreateIntervalShown && (
        <CreateInterval
          hideMe={() => setIsCreateIntervalShown(false)}
        ></CreateInterval>
      )}
      {isCreateItemShown && (
        <div className="create-item">
          <input
            type="text"
            ref={createItemTextbox}
            placeholder="Item title"
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <div className="interval">
            <select
              defaultValue=""
              className={newItem.interval ? "" : "select-placeholder"}
              onChange={(e) => {
                let value = e.target.value;
                if (value === "create-item") {
                  value = "";
                  e.target.value = "";
                  setIsCreateIntervalShown(true);
                }
                setNewItem({ ...newItem, interval: e.target.value });
              }}
            >
              <option value="" disabled hidden>
                Interval
              </option>
              {props.intervals.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title} ({item.days.toString()})
                </option>
              ))}
              <option value="create-item">Create Item ...</option>
            </select>
          </div>
          {isAllOptionsShown && (
            <div className="all-options">
              <textarea
                placeholder="description"
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
              <div className="is-notifications-on">
                <label htmlFor="isNotificationsOn">Notifications</label>
                <input
                  type="checkbox"
                  defaultChecked
                  id="isNotificationsOn"
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      isNotificationsOn: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="create-item-buttons">
            <button
              className="create"
              disabled={!(newItem.title && newItem.interval)}
              onClick={createOnClick}
            >
              Create
            </button>
            <button className="more-options" onClick={toggleAllOptions}>
              <span className="material-icons" title="Toggle Full Options">
                tune
              </span>
            </button>
            <button className="cancel" onClick={cancelOnClick}>
              <span className="material-icons" title="Close">
                close
              </span>
            </button>
          </div>
        </div>
      )}
      {!isCreateItemShown && (
        <div className="create-item-button" onClick={createItemOnClick}>
          <span className="material-icons">add</span>Create Item
        </div>
      )}
    </React.Fragment>
  );
}

CreateItem.propTypes = {
  intervals: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
};
