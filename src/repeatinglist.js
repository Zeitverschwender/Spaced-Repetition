import React, { Component } from "react";
import PropTypes from "prop-types";

import { RepeatingItem } from "./repeatingitem";
import { RepeatingItem as RItem } from "./models/repeatingitem";
import CreateItem from "./components/createitem";

const LOADING_ITEM = new RItem({ _id: 0, title: "LOADING", description: "" });
export class RepeatingList extends Component {
  render() {
    return (
      <div className="repeating-list">
        {!this.props.repeatingItemsReceived ? (
          <div className="loading-item">
            <RepeatingItem
              key={LOADING_ITEM._id}
              item={LOADING_ITEM}
              onItemClick={() => {}}
            ></RepeatingItem>
          </div>
        ) : (
          this.props.repeatingItems.map((item) => (
            <RepeatingItem
              key={item._id}
              item={item}
              onItemClick={this.props.onItemClick}
              onResetStreak={this.props.onResetStreak}
              onContinueStreak={this.props.onContinueStreak}
            ></RepeatingItem>
          ))
        )}
        <CreateItem onAddItem={this.props.onAddItem}></CreateItem>
      </div>
    );
  }
}

RepeatingList.propTypes = {
  repeatingItems: PropTypes.array.isRequired,
  repeatingItemsReceived: PropTypes.bool.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onResetStreak: PropTypes.func.isRequired,
  onContinueStreak: PropTypes.func.isRequired,
};

export default RepeatingList;
