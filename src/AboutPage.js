import React, { Component } from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import "./AboutPage.scss";

import githubIcon from "./assets/images/github.svg";
import Ebbinghaus from "./assets/images/Ebbinghaus.jpg";

class AboutPage extends Component {
    state = {
        dummyText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in diam fermentum, feugiat dui at, bibendum lectus. Nunc mollis imperdiet elit, interdum molestie nunc luctus mollis. Integer molestie turpis non sem malesuada blandit. Proin maximus, odio at vestibulum condimentum, mi augue laoreet justo, in congue sem massa id sapien. Pellentesque id dolor nec enim rutrum porttitor eget id urna. Suspendisse sapien erat, iaculis ac efficitur eu, tristique ut massa. Cras tellus lectus, feugiat eget ipsum at, posuere eleifend libero. Sed sit amet lorem aliquam, faucibus lectus in, venenatis quam. Vestibulum eget mauris non purus sollicitudin interdum. Sed ut tellus et lorem pellentesque feugiat. Nam vulputate ligula at leo facilisis tempus. Maecenas dictum quis felis non dignissim.",
        dummyTeam : [
            "Member",
            "Member",
            "Member",
            "Member",
        ],
    }
    render() {

        //var teamMembers = this.state.dummyTeam.map((teamMember,index) => <Zoom duration={1000}><div><img src={githubIcon}></img><span>{teamMember} {index + 1}</span></div></Zoom>)
        var teamMembers = this.state.dummyTeam.map((teamMember,index) => index%2 == 0? <Fade right duration={1000}><div><img src={githubIcon}></img><span>{teamMember} {index + 1}</span></div></Fade>:<Fade left duration={1000}><div><img src={githubIcon}></img><span>{teamMember} {index + 1}</span></div></Fade>)

        return (
        <div className="about-main-wrapper">
            <header>
                <span className="title">Spaced Repetition</span>
            </header>
            <div className="about-content">
                <div className="hook-wrapper">
                    <TransitionGroup>
                    <h2>Lorem ipsum much?</h2>
                    <div  className="hook">
                        <Fade left duration={2000}><p>{this.state.dummyText}</p></Fade>
                        <Fade right duration={2000}><img src={Ebbinghaus}></img></Fade>
                    </div>
                    </TransitionGroup>
                </div>
                    <TransitionGroup>
                    <div className="about-product-wrapper">
                        <Zoom opposite={true}>
                        <h2>About Lorem ipsum</h2>
                        <p className="about-product">{this.state.dummyText}</p>
                        </Zoom>
                    </div>
                    </TransitionGroup>
                <div className="about-team-wrapper">
                    <TransitionGroup>
                    <h2>About the team</h2>
                    <div className="about-team">{teamMembers}</div>
                    </TransitionGroup>
                </div>
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

export default AboutPage;