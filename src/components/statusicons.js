import React from "react";
import PropTypes from "prop-types";

function StatusIcons(props) {
  return (
    <div className="item-icons" style={{fontSize:props.size}}>
      <span className="material-icons">notifications</span>
      {props.item.description && (
        <span className="material-icons">subject</span>
      )}
    </div>
  );
}

StatusIcons.propTypes = {
  item: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
};

export default StatusIcons;
