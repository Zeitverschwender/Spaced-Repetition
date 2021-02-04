import React, { Component } from "react";

import PropTypes from "prop-types";

import StatusIcons from './components/statusicons';

export class RepeatingItem extends Component {
  render() {
    return (
      <div className="repeating-item-wrapper">
        <div className="repeating-item" onClick={() => this.props.onItemClick(this.props.item)}>
          <div className="streak-part">
            <span className="streak">Streak</span>
            <span className={`streak-count ${this.props.item.streakPassed? "streak-passed":""}`}>{this.props.item.streak.toString()}</span>
          </div>
          <div className="vertical-sep"></div>
          <div className="item-details">
            <span className="item-title" title={this.props.item.title}>{this.props.item.title}</span>
            <StatusIcons item={this.props.item} size="1.25rem" />
          </div>
          <div className="item-end">
            <span className={"next-notification" + (this.props.item.streakPassed? " streak-passed":"")}>{this.props.item.nextNotification}</span>
          </div>
        </div>
        <div className={`continue-streak-items ${this.props.item.streakPassed? "":"hidden"}`}>
          <div className="blue-button" onClick={() => this.props.onContinueStreak(this.props.item)}>Coninue Streak</div>
          <div className="red-button" onClick={() => this.props.onResetStreak(this.props.item)}>Reset Streak</div>
        </div>
      </div>
    );
  }
}
RepeatingItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func,
  onResetStreak: PropTypes.func,
  onContinueStreak: PropTypes.func,
};

export default RepeatingItem;
