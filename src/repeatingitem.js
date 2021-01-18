import React, { Component } from "react";

import PropTypes from "prop-types";

export class RepeatingItem extends Component {
  render() {
    return <React.Fragment>Content</React.Fragment>;
  }
}

RepeatingItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RepeatingItem;
