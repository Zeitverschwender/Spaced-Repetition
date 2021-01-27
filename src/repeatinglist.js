import React, { Component } from "react";
import PropTypes from "prop-types";

import { RepeatingItem } from "./repeatingitem";
import { RepeatingItem as RItem } from "./models/repeatingitem";
import { CreateItem } from "./components/createitem";

const LOADING_ITEM = new RItem(0, "Loading..", "");
export class RepeatingList extends Component {
  render() {
    return (
      <div className="repeating-list">
        {this.props.repeatingItems.length === 0 && (
          <div className="loading-item">
            <RepeatingItem
              key={LOADING_ITEM._id}
              item={LOADING_ITEM}
              onItemClick={() => {}}
            ></RepeatingItem>
          </div>
        )}
        {this.props.repeatingItems.map((item) => (
          <RepeatingItem
            key={item._id}
            item={item}
            onItemClick={this.props.onItemClick}
          ></RepeatingItem>
        ))}
        <CreateItem
          intervals={this.props.intervals}
          onAddItem={this.props.onAddItem}
        ></CreateItem>
      </div>
    );
  }
}

RepeatingList.propTypes = {
  repeatingItems: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  intervals: PropTypes.array.isRequired,
};

export default RepeatingList;
