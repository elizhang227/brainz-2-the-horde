import React, { Component } from 'react';
import io from 'socket.io-client';

class Scores extends Component {
    state = {
        endpoint: 'http://192.168.86.205:3000',
        response: false,
        initial: false
    }

    componentDidMount = () => {
        const { endpoint } = this.state;
        const socket = io(endpoint);
        socket.on('test', data => {
            if (this.state.initial === false) {
                this.setState({ response: data })
                this.componentWillUnmount = () => {
                    console.log('this is test to see if it works')
                    socket.disconnect();
                }
            }
            console.log('this is data', data)
            if (data.length > this.state.response.length) {
                this.setState({
                    response: data,
                })
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
