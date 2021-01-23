import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./createitem.scss";

export class CreateItem extends Component {
  state = {
    intervals: [],
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
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "repeatingintervals")
      .then((res) => {
        this.setState({ intervals: res.data });
      })
      .catch((err) => {
        alert(`couldn't add item. error: ${err}`);
      });
  }

  createOnClick = (e) => {
    axios
      .post(process.env.REACT_APP_API_URL + "repeatingitems", {
        title: this.state.newItem.title,
        interval: this.state.newItem.interval,
      })
      .then((res) => {
        this.props.onAddItem(res.data);
        this.exitCreation();
      })
      .catch((err) => {
        alert(`couldn't get intervals. error: ${err}`);
      });
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
              {this.state.intervals.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title} ({item.days.toString()})
                </option>
              ))}
            </select>
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

CreateItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default CreateItem;
