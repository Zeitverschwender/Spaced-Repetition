import React from "react";
import PropTypes from "prop-types";

import "./edititem.scss";

function EditItem(props) {
  const newItem = {_id: props.item._id};
  let saveOnClick = (e) => {
    e.preventDefault();
    props.editItem(newItem);
    props.hideEditDetails();
  };
  return (
    <div className="item-details-back" onClick={props.hideEditDetails}>
      <div
        className="item-details-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="before-sep">
          <input
            type="text"
            required
            minLength="1"
            defaultValue={props.item.title}
            className="title-textbox"
            onChange={(e) => (newItem.title = e.target.value.trim())}
          ></input>
          <span className="material-icons details-edit" onClick={saveOnClick}>
            save
          </span>
          <span
            className="material-icons details-buttons"
            onClick={props.hideEditDetails}
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
          onChange={(e) => (newItem.description = e.target.value.trim())}
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
};

export default EditItem;
