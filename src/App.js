import React, { Component } from "react";

import RepeatingList from "./repeatinglist";

import "./App.scss";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="main-wrapper">
        <header>
          <span className="title">Spaced Repetition</span>
        </header>
        <div className="content">
          <RepeatingList></RepeatingList>
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
