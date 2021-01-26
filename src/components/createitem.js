import React, { Component } from "react";
import PropTypes from "prop-types";

import "./createitem.scss";

export class CreateItem extends Component {
  state = {
    isCreateItemShown: false,
    newItem: {
      title: "",
      interval: "",
    },
  };

  constructor(props) {
    super(props);
    this.createItemTextbox = React.createRef();
  }

  createOnClick = (e) => {
    this.props.onAddItem(
      {
        title: this.state.newItem.title,
        interval: this.state.newItem.interval,
      },
      () => this.exitCreation()
    );
  };

  exitCreation = () => {
    this.setState({
      isCreateItemShown: false,
    });
    this.setState({
      newItem: {
        title: "",
        interval: "",
      },
    });
  };

  cancelOnClick = (e) => {
    e.preventDefault();
    this.exitCreation();
  };
  createItemOnClick = (e) => {
    e.preventDefault();
    this.setState(
      {
        isCreateItemShown: true,
      },
      () => this.createItemTextbox.current.focus()
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isCreateItemShown && (
          <div className="create-item">
            <input
              type="text"
              ref={this.createItemTextbox}
              placeholder="Item title"
              onChange={(e) =>
                this.setState({
                  newItem: { ...this.state.newItem, title: e.target.value },
                })
              }
            />
            <div className="interval">
              <select
                defaultValue=""
                className={
                  this.state.newItem.interval ? "" : "select-placeholder"
                }
                onChange={(e) =>
                  this.setState({
                    newItem: {
                      ...this.state.newItem,
                      interval: e.target.value,
                    },
                  })
                }
              >
                <option value="" disabled hidden>
                  Interval
                </option>
                {this.props.intervals.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title} ({item.days.toString()})
                  </option>
                ))}
              </select>
            </div>
            <div className="create-item-buttons">
              <button
                className="create"
                disabled={
                  !(this.state.newItem.title && this.state.newItem.interval)
                }
                onClick={this.createOnClick}
              >
                Create
              </button>
              <button className="more-options">
                <span className="material-icons">tune</span>
              </button>
              <button className="cancel" onClick={this.cancelOnClick}>
                <span className="material-icons">close</span>
              </button>
            </div>
          </div>
        )}
        {!this.state.isCreateItemShown && (
          <div className="create-item-button" onClick={this.createItemOnClick}>
            <span className="material-icons">add</span>Create Item
          </div>
        )}
      </React.Fragment>
    );
  }
}

CreateItem.propTypes = {
  intervals: PropTypes.array.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default CreateItem;
