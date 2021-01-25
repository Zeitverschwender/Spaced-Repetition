import React from "react";

import PropTypes from "prop-types";

import StatusIcons from "./statusicons";

import "./itemfulldetails.scss";

export default function ItemFullDetails(props) {
  return (
    <div className="item-details-back" onClick={(e) => props.hideFullDetails()}>
      <div
        className="item-details-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="before-sep">
          <h2 className="full-title"> {props.item.title} </h2>
          <span className="material-icons details-exit">close</span>
        </div>

        <div className="horizontal-sep"></div>
        <div className="details-status-icons">
          <StatusIcons item={props.item} size="2.25rem" />
        </div>
        <div className="item-details-desc">
          {props.item.description || (
            <span className="no-desc">No Description...</span>
          )}
        </div>
      </div>
    </div>
  );
}
ItemFullDetails.propTypes = {
  item: PropTypes.object.isRequired,
  hideFullDetails: PropTypes.func.isRequired,
};
