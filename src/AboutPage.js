import React, { Component } from "react";

import {Slide,Zoom} from 'react-awesome-reveal';

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

        var teamMembers = this.state.team.map((teamMember,index) => index%2 === 0? <Slide direction="right" duration={1000} key={index}><div><img src={githubIcon} alt="Loading..."></img><span>{teamMember}</span></div></Slide>:<Slide direction="left" duration={1000} key={index}><div><img src={githubIcon} alt="Loading..."></img><span>{teamMember}</span></div></Slide>)

        return (
        <div className="about-main-wrapper">
            <div className="about-content">
                <div className="about-product-wrapper">
                    <h1>About Spaced Repetition</h1>
                    <Zoom direction="up" duration={800}>
                    <p className="about-product">{this.state.productInfo}</p>
                    </Zoom>
                </div>

                <div className="hook-wrapper">
                    <h1>SCIENCE of remembering</h1>
                    <div  className="hook">
                        <Slide direction="left" duration={1500}><p>{this.state.theoryInfo}</p></Slide>
                        <Slide direction="right" duration={1500}><img src={Ebbinghaus} alt="Ebbinghaus" className="hook-image"></img></Slide>
                    </div>
                </div>

                <div className="about-team-wrapper">
                    <h2>About the team</h2>
                    <div className="about-team">{teamMembers}</div>
                </div>
            </div>
        </div>
         );
    }
}

export default AboutPage;