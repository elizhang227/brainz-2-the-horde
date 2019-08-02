import React, { Component } from "react";
import { Link } from "react-router-dom";
import ScrollableAnchor from 'react-scrollable-anchor'

import HomePageMain from "../images/home-page.png";
import StartGif from "../images/start.gif"
import AimGif from "../images/aiming.gif"
import keyPress from "../images/wasd-fixed.gif"
import aim from "../images/computer-mouse.gif"
import shoot from "../images/mouse-click.gif"
import instructions from "../images/instructions.gif"

class LandingPage extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <section id="first" className="First">
                    <img className="homePage" src={HomePageMain} alt="" />
                    <Link className="start" to="/games" ><img src={StartGif} alt="Start Gif" /></Link>
                    <a className='instructions-link' href="#second" ><img src={instructions} alt="instructions" /></a>
                </section>

                <ScrollableAnchor id="second">
                    <section className="Second">
                        <h2>How To Survive</h2>
                        <div className="instructions">
                            <div className="instruction-card">

                                <div className="instruction-card-gifs">
                                    <div className="instruction-card-image">
                                        <img src={AimGif} alt="Aim Gif" />
                                    </div>
                                    <div className="instruction-card-gif">
                                        <div className="instruction-card-title">
                                            <h4>MOVING</h4>
                                        </div>
                                        <div className="arrow">
                                            <i className="fas fa-play"></i>
                                        </div>
                                        <div className="card-gif-container">
                                            <div className="card-gif">
                                                <img src={keyPress} alt="Key Press" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="instruction-card">

                                <div className="instruction-card-gifs">
                                    <div className="instruction-card-image">
                                        <img src={AimGif} alt="Aim Gif" />
                                    </div>
                                    <div className="instruction-card-gif">
                                        <div className="instruction-card-title">
                                            <h4>AIMING</h4>
                                        </div>
                                        <div className="arrow">
                                            <i className="fas fa-play"></i>
                                        </div>
                                        <div className="card-gif-container">
                                            <div className="card-gif aim">
                                                <img src={aim} alt="Aim" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="instruction-card">

                                <div className="instruction-card-gifs">
                                    <div className="instruction-card-image">
                                        <img src={AimGif} alt="Aim Gif" />
                                    </div>
                                    <div className="instruction-card-gif">
                                        <div className="instruction-card-title">
                                            <h4>SHOOTING</h4>
                                        </div>
                                        <div className="arrow">
                                            <i className="fas fa-play"></i>
                                        </div>
                                        <div className="card-gif-container">
                                            <div className="card-gif aim">
                                                <img src={shoot} alt="Shoot Gif" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollableAnchor>
            </div>
        )
    }
}

export default LandingPage;