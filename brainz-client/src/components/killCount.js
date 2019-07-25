import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class KillCount extends Component {
    state = {
        kills: []
    }

    async componentDidMount() {
        const kills = await this.loadData();
        this.setState({
            kills: kills
        })
    }

    loadData = async () => {
        const url = 'http://localhost:3000/v1/all'
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    render() {
        const { kills } = this.state;
        return (
            <div>
                <h1>Kill Score</h1>
                <ul>
                    {kills.map((kill, index) => 
                        <li key={`kill${index}`}>
                            {kill.kill_count}
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default KillCount;