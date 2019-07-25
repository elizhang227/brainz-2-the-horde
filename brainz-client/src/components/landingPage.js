import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    state = {
        
    }

    render() {
        return (
            <div>
                <nav>
                    <a href='/'>Home</a>
                    <a href='/scores'>High Scores</a>
                    <a href='/games'>Games</a>
                </nav>
                <h1>LANDING PAGE</h1>
                <img src='../images/home-page.png' />
                {/* <img className= "homePage" src="../images/home-page.png" />
                <a className='start' href="/games" ><img src="/images/start.gif"/></a> */}
            </div>
        )
    }

}

export default LandingPage;