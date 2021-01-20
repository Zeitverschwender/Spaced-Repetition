import React, { Component } from "react";

import {RepeatingItem} from "./models/repeatingitem";

import RepeatingList from "./repeatinglist";

import "./App.scss";

class App extends Component {
  state = {
    repeatingItems: [
      new RepeatingItem(1, "A normal title", 5),
      new RepeatingItem(2, "Short", 54),
      new RepeatingItem(3, "A longer than normal title", 12),
    ]
  };

  render() {
    return (
      <div className="main-wrapper">
        <header>
          <span className="title">Spaced Repetition</span>
        </header>
        <div className="content">
          <RepeatingList repeatingItems={this.state.repeatingItems}></RepeatingList>
        </div>
        <footer>
          <a href="https://github.com/Zeitverschwender/Spaced-Repetition" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
