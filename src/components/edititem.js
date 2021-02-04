import React, { useState } from "react";
import PropTypes from "prop-types";

import "./edititem.scss";
import IntervalSelection from "./intervalselection";
import StatusIcons from "./statusicons";

function EditItem(props) {
  const [newItem, setnewItem] = useState({
    _id: props.item._id,
    isNotificationsOn:
      props.item.isNotificationsOn === null ||
      props.item.isNotificationsOn === undefined
        ? true
        : props.item.isNotificationsOn,
  });
  const [dataChanged, setDataChanged] = useState(false);
  const saveOnClick = (e) => {
    e.preventDefault();
    props.editItem(newItem);
    props.hideEditDetails();
  };
  const deleteOnClick = (e) => {
    e.preventDefault();
    props.showConfirmBox("Are you sure you want to delete this item?", () => {
      props.deleteItem(props.item);
    });
  };
  const onBackClick = (e) => {
    e.preventDefault();
    if (dataChanged) {
      props.showConfirmBox(
        "Are you sure you want to exit without saving?",
        () => {
          props.hideEditDetails();
        }
      );
    } else {
      props.hideEditDetails();
    }
  };

  const updateNewItem = (key, value) => {
    const editedItem = { ...newItem };
    editedItem[key] = value;
    setnewItem(editedItem);
    setDataChanged(true);
  };
  return (
    <div className="overlay-back" onClick={onBackClick}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="before-sep">
          <input
            type="text"
            required
            minLength="1"
            maxLength="128"
            defaultValue={props.item.title}
            className="title-textbox"
            onChange={(e) => updateNewItem("title", e.target.value.trim())}
          ></input>
          <span
            className={
              "material-icons details-edit" + (dataChanged ? "" : " disabled")
            }
            title="Save"
            onClick={saveOnClick}
          >
            save
          </span>
          <span
            className="material-icons details-buttons"
            title="Delete"
            onClick={deleteOnClick}
          >
            delete
          </span>
          <span
            className="material-icons details-buttons"
            title="Exit"
            onClick={onBackClick}
          >
            close
          </span>
        </div>
        <div className="horizontal-sep"></div>
        <div className="details-status-icons">
          <StatusIcons
            item={props.item}
            size="2.25rem"
            onNotificationClick={() =>
              updateNewItem("isNotificationsOn", !newItem.isNotificationsOn)
            }
            notificationsClass={
              newItem.isNotificationsOn
                ? "status-icon-clickable"
                : "status-icon-disabled"
            }
          />
        </div>
        <textarea
          className="desc-textbox"
          placeholder={
            props.item.description ? "" : "A description of your item."
          }
          defaultValue={props.item.description}
          maxLength="520"
          onChange={(e) => updateNewItem("description", e.target.value.trim())}
        ></textarea>
        <div className="item-details-footer">
          <div className="horizontal-sep"></div>
          <div className="item-details-footer-content">
            <span className="preset-text">INTERVAL</span>
            <IntervalSelection
              onIntervalChange={(interval) =>
                updateNewItem("interval", interval)
              }
              className="edit-item-interval"
              selectClassName="edit-item-interval-select"
              defaultValue={props.item.interval}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  hideEditDetails: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  showConfirmBox: PropTypes.func.isRequired,
};

export default EditItem;
