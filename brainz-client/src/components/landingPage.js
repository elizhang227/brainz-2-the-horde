import React, { Component } from "react";
import { Link } from "react-router-dom";
import ScrollableAnchor from 'react-scrollable-anchor'
import AOS from 'aos';

import Move1 from "../videos/move1.mp4";
import Move2 from "../videos/move2.mp4";
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
        AOS.init()

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

                            <div className="instruction-card" data-aos="fade-right"
                                data-aos-offset="500"
                                data-aos-duration="500">
                                <div className="instruction-card-stacking">
                                    <div className="instruction-card-image-back-stack">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="instruction-card-image-stacked">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move2} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="instruction-card-gif">
                                    <div className="instruction-card-title">
                                        <h4>MOVING</h4>
                                        <p>AVOID ZOMBIES</p>
                                    </div>
                                    <div className="arrow">
                                        <i className="fas fa-play"></i>
                                    </div>
                                    <div className="card-gif-container">
                                        <p>Use the W,A,S,D keys to move.</p>
                                        <ul>
                                            <li><b>W</b> - Move Up</li>
                                            <li><b>A</b> - Move Left</li>
                                            <li><b>S</b> - Move Down</li>
                                            <li><b>D</b> - Move Right</li>
                                        </ul>
                                        <div className="card-gif">
                                            <img src={keyPress} alt="Key Press" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="instruction-card info-left" data-aos="fade-left"
                                data-aos-offset="500"
                                data-aos-duration="500">
                                <div className="instruction-card-stacking">
                                    <div className="instruction-card-image-back-stack">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="instruction-card-image-stacked">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move2} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="instruction-card-gif">
                                    <div className="instruction-card-title">
                                        <h4>AIMING</h4>
                                        <p>AIM FOR THE HEAD</p>
                                    </div>
                                    <div className="arrow">
                                        <i className="fas fa-play"></i>
                                    </div>
                                    <div className="card-gif-container">
                                        <p>Move your mouse around to place the reticle on the zombies.</p>
                                        <div className="card-gif">
                                            <img src={aim} alt="Key Press" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="instruction-card" data-aos="fade-right"
                                data-aos-offset="500"
                                data-aos-duration="500">
                                <div className="instruction-card-stacking">
                                    <div className="instruction-card-image-back-stack">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move1} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="instruction-card-image-stacked">
                                        <video className="videoContainer" autoPlay loop>
                                            <source className="gameSelectionVideo" src={Move2} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="instruction-card-gif">
                                    <div className="instruction-card-title">
                                        <h4>SHOOTING</h4>
                                        <p>GO IN FOR THE KILL</p>
                                    </div>
                                    <div className="arrow">
                                        <i className="fas fa-play"></i>
                                    </div>
                                    <div className="card-gif-container">
                                        <p>Left click with your mouse to shoot. <br /><br /><b>TIP:</b> The faster you click, the more you can shoot</p>
                                        <div className="card-gif">
                                            <img src={shoot} alt="Key Press" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollableAnchor>
            </div >
        )
    }
}

export default LandingPage;