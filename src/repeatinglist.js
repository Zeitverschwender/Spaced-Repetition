import React, { Component } from "react";
import PropTypes from "prop-types";

import { RepeatingItem } from "./repeatingitem";
import { RepeatingItem as RItem } from "./models/repeatingitem";

const LOADING_ITEM = new RItem(0, "Loading..", "");
export class RepeatingList extends Component {
  createItemOnClick(e) {
    e.preventDefault();
    alert('create item clicked');
  }
  render() {
    return (
      <div className="repeating-list">
        {this.props.repeatingItems.length === 0 && (
          <div className="loading-item">
            <RepeatingItem
              key={LOADING_ITEM._id}
              item={LOADING_ITEM}
            ></RepeatingItem>
          </div>
        )}
        {this.props.repeatingItems.map((item) => (
          <RepeatingItem key={item._id} item={item}></RepeatingItem>
        ))}
        <div className="create-item" onClick={this.createItemOnClick}>
          <span className="material-icons">add</span>Create Item
        </div>
      </div>
    );
  }
}

RepeatingList.propTypes = {
  repeatingItems: PropTypes.array.isRequired,
};

export default RepeatingList;
