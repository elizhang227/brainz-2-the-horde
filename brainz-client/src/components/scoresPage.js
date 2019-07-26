import React, { Component } from 'react';
import io from 'socket.io-client';


class Scores extends Component {
    state = {
        endpoint: 'http://10.150.41.155:3000',
        response: false
    }

    componentDidMount = () => {
        const { endpoint } = this.state;
        const socket = io(endpoint);
        //if (socket.on('test').connected === false)
        socket.on('test', data => {
        this.setState({ response: data })
        console.log('this is data', data)
        if (data.length > this.state.response.length) {
            this.setState({ response: data})
            console.log('changed')
        } else {
            console.log('still the same')
        }
        })
    }

    render() {
        const { response } = this.state;
        //console.log('this is response', response)
        return (
        <div>
            <h2>f00k dis</h2>
            {(response !== false) ? 
            <ul>
            {response.map((data, index) => {
                return (
                <li key={`data${index}`}>
                    USERID: {data.user_id} Wave: {data.wave} Kills: {data.kills}
                </li>
                )
            })}
            </ul>
            : ''
            }
        </div>
        );
    }
}

export default Scores;
