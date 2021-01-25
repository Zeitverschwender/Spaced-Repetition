import React, { Component } from "react";
import axios from "axios";

import { RepeatingItem } from "./models/repeatingitem";

import RepeatingList from "./repeatinglist";
import Sidemenu from "./components/sidemenu";
import ItemFullDetails from "./components/itemfulldetails";

import "./App.scss";

class App extends Component {
  state = {
    repeatingItems: [],
    isSideMenuShown: false,
    isFullDetailsShown: false,
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
      isFullDetailsShown:true,
      clickedItem
    });
  };

  hideSideMenu = () => this.setState({isSideMenuShown: false});
  hideFullDetails = () => this.setState({isFullDetailsShown: false});

  render() {
    return (
      <div className="main-wrapper">
        <header>
          <div
            className="side-menu-button"
            onClick={() => this.setState({ isSideMenuShown: true })}
          >
            <span className="material-icons">menu</span>
          </div>
          <span className="title">Spaced Repetition</span>
        </header>
        {this.state.isSideMenuShown && <Sidemenu hideSideMenu={this.hideSideMenu} />}
        {this.state.isFullDetailsShown && <ItemFullDetails item={this.state.clickedItem} hideFullDetails={this.hideFullDetails}/>}
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
