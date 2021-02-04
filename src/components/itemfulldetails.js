import React from "react";

import PropTypes from "prop-types";

import StatusIcons from "./statusicons";

import "./itemfulldetails.scss";

export default function ItemFullDetails(props) {
  return (
    <div className="overlay-back" onClick={(e) => props.hideFullDetails()}>
      <div
        className="overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="before-sep">
          <h2 className="full-title"> {props.item.title} </h2>
          <span
            className="material-icons details-edit"
            title="Edit"
            onClick={() => props.showEditDetails()}
          >
            create
          </span>
          <span
            className="material-icons details-buttons"
            title="Exit"
            onClick={props.hideFullDetails}
          >
            close
          </span>
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
        <div className="item-details-footer">
          <div className={`continue-streak-details ${props.item.streakPassed? "":"hidden"}`}>
            <div className="blue-button" onClick={() => {props.onContinueStreak(props.item)}}>Continue Streak</div>
            <div className="red-button" onClick={() => {props.onResetStreak(props.item)}}>Reset Streak</div>
          </div>
          <div className="horizontal-sep"></div>
          <div className="item-details-footer-content">
            <div className="details-streak">
              <span className="streak">Streak</span>
              <span className={`streak-count ${props.item.streakPassed? "streak-passed":""}`}>{props.item.streak.toString()}</span>
            </div>
            <div className={`next-notification ${props.item.streakPassed? "streak-passed":""}`}>
              {props.item.nextNotification}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ItemFullDetails.propTypes = {
  item: PropTypes.object.isRequired,
  hideFullDetails: PropTypes.func.isRequired,
  showEditDetails: PropTypes.func.isRequired,
  onResetStreak: PropTypes.func.isRequired,
  onContinueStreak: PropTypes.func.isRequired,
};
