import React, { Component } from "react";
import axios from "axios";

import { RepeatingItem } from "./models/repeatingitem";

import RepeatingList from "./repeatinglist";
import Sidemenu from "./components/sidemenu";
import ItemFullDetails from "./components/itemfulldetails";
import EditItem from "./components/edititem";

import "./App.scss";

class App extends Component {
  state = {
    repeatingItems: [],
    isSideMenuShown: false,
    isFullDetailsShown: false,
    isEditDetailsShown: false,
    clickedItem: null,
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "repeatingitems")
      .then((res) => {
        const items = [];
        res.data.forEach((item) => {
          items.push(Object.assign(new RepeatingItem(), item));
        });
        this.setState({ repeatingItems: items });
      })
      .catch((err) => {
        alert(`couldn't get items. error: ${err}`);
      });
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

  onAddItem = (item) => {
    this.setState({
      repeatingItems: [
        ...this.state.repeatingItems,
        Object.assign(new RepeatingItem(), item),
      ],
    });
  };
  onItemClick = (clickedItem) => {
    this.setState({
      isFullDetailsShown: true,
      clickedItem,
    });
    this.disableScrolling();
  };

  hideSideMenu = () => {
    this.setState({ isSideMenuShown: false });
    this.enableScrolling();
  };
  hideFullDetails = () => {
    this.setState({ isFullDetailsShown: false});
    this.enableScrolling();
  };
  showEditDetails = () => {
    this.setState({ isEditDetailsShown: true });
  };
  hideEditDetails = () => {
    this.setState({ isEditDetailsShown: false });
  };

  render() {
    return (
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
          />
        )}
        <div className="content">
          <RepeatingList
            repeatingItems={this.state.repeatingItems}
            onAddItem={this.onAddItem}
            onItemClick={this.onItemClick}
          ></RepeatingList>
        </div>
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
    );
  }
}

export default App;
