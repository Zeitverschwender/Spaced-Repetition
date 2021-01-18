import React, { Component } from "react";

import RepeatingList from "./repeatinglist";

import "./App.scss";

class App extends Component {
  state = {
    repeatingItems: [
      {
        id: 1,
        title: "title 1"
      },
      {
        id: 2,
        title: "title 2"
      },
      {
        id: 3,
        title: "title 3"
      }
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
          <a href="https://github.com/Zeitverschwender/Spaced-Repetition">
            Github
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
