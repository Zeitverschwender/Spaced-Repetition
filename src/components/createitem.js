import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./createitem.scss";

import IntervalSelection from "./intervalselection";

export default function CreateItem(props) {
  const [isCreateItemShown, setIsCreateItemShown] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [isAllOptionsShown, setIsAllOptionsShown] = useState(false);

  const titleTextbox = useRef(null);

  useEffect(() => {
    if (isCreateItemShown) {
      titleTextbox.current.focus();
    }
  }, [isCreateItemShown]);

  const exitCreation = () => {
    titleTextbox.current.value = "";
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
      <div
        className="create-item"
        style={{ display: isCreateItemShown ? "" : "none" }}
      >
        <input
          type="text"
          className="input-stylized"
          ref={titleTextbox}
          placeholder="Item title"
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <IntervalSelection
          onIntervalChange={(interval) => setNewItem({ ...newItem, interval })}
          className="interval"
          selectClassName={
            "create-item-select" +
            (newItem.interval ? "" : " select-placeholder")
          }
        />
        {isAllOptionsShown && (
          <div className="all-options">
            <textarea
              className="input-stylized"
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
                    isNotificationsOn: e.target.checked,
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

      {!isCreateItemShown && (
        <div className="create-item-button" onClick={createItemOnClick}>
          <span className="material-icons">add</span>Create Item
        </div>
      )}
    </React.Fragment>
  );
}

CreateItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};
