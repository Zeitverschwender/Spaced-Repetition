import React from "react";
import PropTypes from "prop-types";

function StatusIcons(props) {
  return (
    <div className="item-icons" style={{ fontSize: props.size }}>
      <span
        title="Notifications: On"
        className={"material-icons " + props.notificationsClass}
        onClick={() => props.onNotificationClick()}
      >
        notifications
      </span>
      {props.item.description && (
        <span title="Has Description" className="material-icons">
          subject
        </span>
      )}
    </div>
  );
}

StatusIcons.propTypes = {
  item: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  onNotificationClick: PropTypes.func,
  notificationsClass: PropTypes.string,
};
StatusIcons.defaultProps = {
  onNotificationClick: () => {},
  notificationsClass: "",
};

export default StatusIcons;
