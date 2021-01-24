import React, { Component } from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import "./AboutPage.scss";

import githubIcon from "./assets/images/github.svg";
import Ebbinghaus from "./assets/images/Ebbinghaus.jpg";

class AboutPage extends Component {
    state = {
        productInfo: "Spaced Repetition is an app that helps you remember newly acquired knowledge through a method that was scientifically proven to result in higher rates of learning. It is based on the spaced repetition learning method that was built to help people acquire knowledge (mostly new vocabulary) easily",
        theoryInfo : "\"I just learned this last week, HOW DID I FORGET IT ALREADY?\". This can happen due to what's called a forgetting curve. Discovered by Hermann Ebbinghaus, the forgetting curve shows how newly acquired information can be lost rather quickly over time. It is said that half the information learned is lost every couple of days if not reviewed. Luckily, the spaced repetition method is able to solve this by reminding you with the required info periodically in a set of intervals to help you save this knowledge and almost never lost it again",
        team : [
            "Sameh Amnoun",
            "Mohamed Said",
            "Ahmed Sadek",
            "Remon Isaac",
        ],
    }
    render() {

        //var teamMembers = this.state.dummyTeam.map((teamMember,index) => <Zoom duration={1000}><div><img src={githubIcon}></img><span>{teamMember} {index + 1}</span></div></Zoom>)
        var teamMembers = this.state.team.map((teamMember,index) => index%2 === 0? <Fade right duration={1000}><div><img src={githubIcon}></img><span>{teamMember}</span></div></Fade>:<Fade left duration={1000}><div><img src={githubIcon}></img><span>{teamMember}</span></div></Fade>)

        return (
        <div className="about-main-wrapper">
            <div className="about-content">
            <div className="about-product-wrapper">
                <TransitionGroup>
                        <Zoom bottom duration={1000}>
                        <h1>About Spaced Repetition</h1>
                        <p className="about-product">{this.state.productInfo}</p>
                        </Zoom>
                </TransitionGroup>
                </div>

                <div className="hook-wrapper">
                    <TransitionGroup>
                    <h1>SCIENCE of remembering</h1>
                    <div  className="hook">
                        <Fade left duration={2000}><p>{this.state.theoryInfo}</p></Fade>
                        <Fade right duration={2000}><img src={Ebbinghaus} alt="Ebbinghaus"></img></Fade>
                    </div>
                    </TransitionGroup>
                </div>

                <div className="about-team-wrapper">
                    <TransitionGroup>
                    <h2>About the team</h2>
                    <div className="about-team">{teamMembers}</div>
                    </TransitionGroup>
                </div>
            </div>
        </div>
         );
    }
}

export default AboutPage;