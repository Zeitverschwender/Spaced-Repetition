import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { RepeatingItem } from "./models/repeatingitem";
import Sidemenu from "./components/sidemenu";

import RepeatingList from "./repeatinglist";
import ItemFullDetails from "./components/itemfulldetails";
import EditItem from "./components/edititem";
import ConfirmBox from "./components/confirmbox";
import Backend from "./services/backend";

import "./App.scss";
import LoginRedirect from "./pages/loginredirect";

class App extends Component {
  state = {
    repeatingItems: [],
    intervals: [],
    isSideMenuShown: false,
    isFullDetailsShown: false,
    isEditDetailsShown: false,
    clickedItem: null,
    confirmBox: {
      msg: "",
      onYes: null,
      onNo: null,
      isShown: false,
    },
  };

  componentDidMount() {
    this._backend = new Backend();
    const alertUser = (err) => alert(`couldn't get items. error: ${err}`);
    this._backend.getRepeatingItems((items) => {
      this.setState({ repeatingItems: items });
    }, alertUser);
    this._backend.getIntervals((data) => {
      this.setState({ intervals: data });
    }, alertUser);
  }

  enableScrolling() {
    document.body.style.overflow = null;
    document.body.style.webkitOverflowScrolling = null;
  }
  disableScrolling() {
    document.body.style.overflow = "hidden";
    document.body.style.webkitOverflowScrolling = "touch";
  }

  componentWillUnmount() {
    this.enableScrolling();
  }

  onAddItem = (item, callback) => {
    this._backend.createItem(
      item,
      (item) => {
        this.setState({
          repeatingItems: [
            ...this.state.repeatingItems,
            Object.assign(new RepeatingItem(), item),
          ],
        });
        callback();
      },
      (err) => {
        alert(`couldn't get intervals. error: ${err}`);
      }
    );
  };
  onItemClick = (clickedItem) => {
    this.setState({
      isFullDetailsShown: true,
      clickedItem,
    });
    this.disableScrolling();
  };

  editItem = (newItem) => {
    this._backend.editItem(
      newItem,
      (data) => {
        const editedItemIndex = this.state.repeatingItems.findIndex(
          (element) => element._id === newItem._id
        );
        this.state.repeatingItems.splice(
          editedItemIndex,
          1,
          Object.assign(this.state.repeatingItems[editedItemIndex], newItem)
        );

        this.setState({
          repeatingItems: this.state.repeatingItems,
        });
      },
      (err) => {
        alert(`couldn't get intervals. error: ${err}`);
      }
    );
  };

  deleteItem = (item) => {
    this._backend.deleteItem(
      item._id,
      (data) => {
        this.state.repeatingItems.splice(
          this.state.repeatingItems.findIndex(
            (element) => element._id === item._id
          ),
          1
        );
        this.setState({
          repeatingItems: this.state.repeatingItems,
          isEditDetailsShown: false,
          isFullDetailsShown: false,
        });
      },
      (err) => {
        alert(`couldn't delete. error: ${err}`);
      }
    );
  };

  hideSideMenu = () => {
    this.setState({ isSideMenuShown: false });
    this.enableScrolling();
  };
  hideFullDetails = () => {
    this.setState({ isFullDetailsShown: false });
    this.enableScrolling();
  };
  showEditDetails = () => {
    this.setState({ isEditDetailsShown: true });
  };
  hideEditDetails = () => {
    this.setState({ isEditDetailsShown: false });
  };

  showConfirmBox = (msg, onYes, onNo) => {
    this.setState({
      confirmBox: { msg, onYes, onNo, isShown: true },
    });
  };

  hideConfirmBox = () => {
    this.setState({ confirmBox: { ...this.state.confirmBox, isShown: false } });
  };

  render() {
    return (
      <Router>
        <div className="main-wrapper">
          <header>
            <div
              className="side-menu-button"
              onClick={() => {
                this.setState({ isSideMenuShown: true });
                this.disableScrolling();
              }}
            >
              <span className="material-icons">menu</span>
            </div>
            <span className="title">Spaced Repetition</span>
          </header>

          <Switch>
            <Route path="/loginRedirect" component={LoginRedirect} />
            <Route path="/">
              {this.state.isSideMenuShown && (
                <Sidemenu hideSideMenu={this.hideSideMenu} />
              )}
              {this.state.isFullDetailsShown && (
                <ItemFullDetails
                  item={this.state.clickedItem}
                  hideFullDetails={this.hideFullDetails}
                  showEditDetails={this.showEditDetails}
                />
              )}
              {this.state.isEditDetailsShown && (
                <EditItem
                  item={this.state.clickedItem}
                  hideEditDetails={this.hideEditDetails}
                  editItem={this.editItem}
                  deleteItem={this.deleteItem}
                  showConfirmBox={this.showConfirmBox}
                />
              )}
              {this.state.confirmBox.isShown && (
                <ConfirmBox
                  msg={this.state.confirmBox.msg}
                  callOnYes={this.state.confirmBox.onYes}
                  callOnNo={this.state.confirmBox.onNo}
                  hideMe={this.hideConfirmBox}
                />
              )}
              <div className="content">
                <RepeatingList
                  repeatingItems={this.state.repeatingItems}
                  onAddItem={this.onAddItem}
                  onItemClick={this.onItemClick}
                  intervals={this.state.intervals}
                ></RepeatingList>
              </div>
            </Route>
          </Switch>
          <footer>
            <a
              href="https://github.com/Zeitverschwender/Spaced-Repetition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
