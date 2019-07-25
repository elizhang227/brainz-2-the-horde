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
            </div>
        )
    }

}

export default LandingPage;