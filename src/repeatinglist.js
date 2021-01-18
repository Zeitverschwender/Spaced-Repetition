import React, { Component } from "react";
import PropTypes from "prop-types";

import { RepeatingItem } from "./repeatingitem";

export class RepeatingList extends Component {
  render() {
    return (
      <div className="repeating-list">
        {this.props.repeatingItems.map((item) => (
          <RepeatingItem key={item.id} item={item}></RepeatingItem>
        ))}
      </div>
    );
  }
}

RepeatingList.propTypes = {
  repeatingItems: PropTypes.array.isRequired,
};

export default RepeatingList;
