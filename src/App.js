import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import {RepeatingItem} from "./models/repeatingitem";

import RepeatingList from "./repeatinglist";

import "./App.scss";
import AboutPage from "./AboutPage";
import githubIcon from "./assets/images/github.svg";
import homeIcon from "./assets/images/home.svg";
import aboutIcon from "./assets/images/info.svg";

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
        <BrowserRouter>
        <header>
        <Link to="/">
          <span className="title">Spaced Repetition</span>
          </Link>
        </header>
          <switch>
            <Route exact path="/">
              <div className="content">
                <RepeatingList repeatingItems={this.state.repeatingItems}></RepeatingList>
              </div>
            </Route>
            <Route exact path="/About">
              <AboutPage></AboutPage>
            </Route>
          </switch>
          <footer>
          <a href="https://github.com/Zeitverschwender/Spaced-Repetition" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon}></img>Github
          </a>
          <Link to="/About">
          <img src={aboutIcon}></img><span>About us</span>
          </Link>
        </footer>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
