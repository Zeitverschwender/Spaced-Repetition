import React, { useState } from "react";
import PropTypes from "prop-types";

import "./edititem.scss";

function EditItem(props) {
  const [newItem, setnewItem] = useState({ _id: props.item._id });
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
      props.showConfirmBox("Are you sure you want to exit without saving?", () => {
        props.hideEditDetails();
      });
    } else {
      props.hideEditDetails();
    }
  };
  return (
    <div className="overaly-back" onClick={onBackClick}>
      <div className="overaly-content" onClick={(e) => e.stopPropagation()}>
        <div className="before-sep">
          <input
            type="text"
            required
            minLength="1"
            maxLength="128"
            defaultValue={props.item.title}
            className="title-textbox"
            onChange={(e) => {
              setnewItem({ ...newItem, title: e.target.value.trim() });
              setDataChanged(true);
            }}
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
        <div className="details-status-icons"></div>
        <textarea
          className="desc-textbox"
          placeholder={
            props.item.description ? "" : "A description of your item."
          }
          defaultValue={props.item.description}
          maxLength="520"
          onChange={(e) => {
            setnewItem({ ...newItem, description: e.target.value.trim() });
            setDataChanged(true);
          }}
        ></textarea>
        <div className="item-details-footer">
          <div className="horizontal-sep"></div>
          <div className="item-details-footer-content">
            Preset
            <select defaultValue="">
              <option value="" disabled hidden>
                Interval
              </option>
            </select>
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
