import React, { Component } from "react";

import PropTypes from "prop-types";

import StatusIcons from './components/statusicons';

export class RepeatingItem extends Component {
  render() {
    return (
      <div className="repeating-item" onClick={() => this.props.onItemClick(this.props.item)}>
        <div className="streak-part">
          <span className="streak">Streak</span>
          <span className="streak-count">{this.props.item.getStreak()}</span>
        </div>
        <div className="vertical-sep"></div>
        <div className="item-details">
          <span className="item-title" title={this.props.item.title}>{this.props.item.title}</span>
          <StatusIcons item={this.props.item} size="1.25rem" />
        </div>
        <div className="item-end">
          <span>after {this.props.item.getNextNotification()}</span>
        </div>
      </div>
    );
  }
}

RepeatingItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func,
};

export default RepeatingItem;
