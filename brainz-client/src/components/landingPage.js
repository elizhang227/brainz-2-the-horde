import React, { Component } from "react";
import { Link } from "react-router-dom";

import HomePageMain from "../images/home-page.png";
import StartGif from "../images/start.gif"

class LandingPage extends Component {
    state = {

    }

    render() {
        return (
            <section id="first" className="First">
                <img className="homePage" src={HomePageMain} alt="" />
                <Link className="start" to="/games" ><img src={StartGif} alt="Start Gif" /></Link>
            </section>
        )
    }
}

export default LandingPage;