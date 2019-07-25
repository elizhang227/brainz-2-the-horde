import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameMode extends Component {
    state = {
        
    }

    render() {
        return (
            <div>
                <h2>Choose Your Difficulty:</h2>
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            </div>
        )
    }

}

export default GameMode;