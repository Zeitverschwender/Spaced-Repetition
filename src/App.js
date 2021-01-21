import React, { Component } from "react";
import axios from "axios";

import {RepeatingItem} from "./models/repeatingitem";

import RepeatingList from "./repeatinglist";

import "./App.scss";

class App extends Component {
  state = {
    repeatingItems: []
  };

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + 'repeatingitems')
      .then(res => {
        const items = [];
        res.data.forEach(item => {
          items.push(Object.assign(new RepeatingItem(), item));
        });
        this.setState({ repeatingItems:  items});
      }).catch((err) => {
          alert(`couldn't get items. error: ${err}`)
      })
  }

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
