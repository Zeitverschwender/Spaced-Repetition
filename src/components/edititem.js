import React from "react";
import PropTypes from "prop-types";

import "./edititem.scss";

function EditItem(props) {
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
          ></input>
          <span className="material-icons details-edit">save</span>
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
};

export default EditItem;
