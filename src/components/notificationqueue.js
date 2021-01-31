import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomNotification from "./customnotification";

import "./notificationqueue.scss";

export class NotificationQueue extends Component {
  render() {
    return (
      <div className="notification-queue">
        {[...this.props.notifications].map((notification) => (
          <CustomNotification
            id={notification.id}
            title={notification.title}
            msg={notification.msg}
            key={notification.id}
            onCloseClick={this.props.onNotificationCloseClick}
          />
        ))}
      </div>
    );
  }
}

NotificationQueue.propTypes = {
  notifications: PropTypes.array.isRequired,
  onNotificationCloseClick: PropTypes.func.isRequired,
};

export const NotificationQueueContext = React.createContext(
   () => {}
);

export default NotificationQueue;
