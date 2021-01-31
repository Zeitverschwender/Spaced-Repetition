import React from "react";
import PropTypes from "prop-types";

import "./customnotification.scss";

export default function CustomNotification(props) {
	
  return (
    <div className="custom-notification">
      <div className="notification-details">
        <div className="notification-title">{props.title}</div>
        <div className="notification-msg">{props.msg}</div>
			</div>
    	<div className="vertical-sep-auto" />
      <div onClick={() => {
				props.onCloseClick(props.id)
			}} className="remove-part material-icons">close</div>
      </div>
  );
}

CustomNotification.propTypes = {
	id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
	msg: PropTypes.string.isRequired,
	onCloseClick: PropTypes.func.isRequired
};
