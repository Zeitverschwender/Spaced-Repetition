import React, { Component } from "react";

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

  cancelOnClick = (e) => {
    e.preventDefault();
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
            <select
              defaultValue=""
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="create-item-buttons">
              <button
                className="create"
                disabled={
                  !(this.state.newItem.title && this.state.newItem.interval)
                }
              >
                Create
              </button>
              <button className="more-options">More Options</button>
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

export default CreateItem;
