import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { RepeatingItem } from "./models/repeatingitem";
import Sidemenu from "./components/sidemenu";

import RepeatingList from "./repeatinglist";
import ItemFullDetails from "./components/itemfulldetails";
import EditItem from "./components/edititem";
import ConfirmBox from "./components/confirmbox";
import NotificationQueue, {
  NotificationQueueContext,
} from "./components/notificationqueue";
import Backend from "./services/backend";

import "./App.scss";
import LoginRedirect from "./pages/loginredirect";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import githubIcon from "./assets/images/github.svg";

import { enableScrolling, disableScrolling } from "./utility/scrolling";
class App extends Component {
  state = {
    repeatingItems: [],
    intervals: [],
    notifications: [],
    notificationId: 1,
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
    this._backend.isUserLoggedIn(
      (isLoggedIn) => {
        if (isLoggedIn) {
          this._backend.getRepeatingItems((items) => {
            this.setState({ repeatingItems: items });
          }, this.createNotification);
          this._backend.getDefaultIntervals((data) => {
            this.setState({ intervals: data });
          }, this.createNotification);
          this._backend.getIntervals((data) => {
            this.setState({ intervals: [...this.state.intervals, ...data] });
          }, this.createNotification);
        } else {
          this.createNotification("Error: ", "Not logged in.");
        }
      },
      (err) => {
        this.createNotification("Error: ", "Could'nt check log in status.");
      }
    );
  }

  componentWillUnmount() {
    enableScrolling();
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
        this.createNotification("Error: ", "Could'nt add item.");
      }
    );
  };
  onItemClick = (clickedItem) => {
    this.setState({
      isFullDetailsShown: true,
      clickedItem,
    });
    disableScrolling();
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
        this.createNotification("Error: ", "Could'nt edit item.");
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
        this.createNotification("Error: ", "Could'nt delete item.");
      }
    );
  };

  createNotification = (title, msg) => {
    this.setState({
      notifications: [
        ...this.state.notifications,
        {
          id: this.state["notificationId"],
          title: title,
          msg: msg,
        },
      ],
      notificationId: this.state["notificationId"] + 1,
    });
  };

  closeNotification = (notificationId) => {
    this.state.notifications.splice(
      this.state.notifications.findIndex(
        (element) => element.id === notificationId
      ),
      1
    );
    this.setState({
      notifications: this.state.notifications,
    });
  };

  hideSideMenu = () => {
    this.setState({ isSideMenuShown: false });
    enableScrolling();
  };
  hideFullDetails = () => {
    this.setState({ isFullDetailsShown: false });
    enableScrolling();
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
                disableScrolling();
              }}
            >
              <span className="material-icons">menu</span>
            </div>
            <span className="title">Spaced Repetition</span>
          </header>
          <NotificationQueueContext.Provider value={this.createNotification}>
            <Sidemenu
              hideSideMenu={this.hideSideMenu}
              style={{ display: this.state.isSideMenuShown ? "" : "none" }}
            />

            <Switch>
              <Route path="/loginRedirect" component={LoginRedirect} />
              <Route path="/About">
                <AboutPage></AboutPage>
              </Route>
              <Route exact path="/">
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
              <Route path="*">
                <NotFoundPage></NotFoundPage>
              </Route>
            </Switch>
            <NotificationQueue
              notifications={this.state.notifications}
              onNotificationCloseClick={this.closeNotification}
            />
          </NotificationQueueContext.Provider>
          <footer>
            <a
              href="https://github.com/Zeitverschwender/Spaced-Repetition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="Loading..."></img>Github
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
