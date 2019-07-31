import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import io from 'socket.io-client';

import MainContainer from "../sharedComponents/mainContainer"

import "../App.css";

class Profile extends Component {
    state = {
        endpoint: '10.150.41.155:3000',
        loginMessage: "",
        myScores: []
    }

    async componentDidMount() {
        const myScores = await this.loadMyScores();
        this.setState({ 
            myScores: myScores
        });
        if (!!this.props.user.isLoggedIn) {
            this.getProfile();
        }
    }

    loadMyScores = async () => {
        const url = `http://10.150.41.155:3000/my-scores/${this.props.user.id}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    getProfile = async () => {
        const url = "http://localhost:3000/users/";
        
        const { endpoint } = this.state;
        const socket = io(endpoint);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.props.user)
            })

            //socket.emit('send-id', this.props.user.id);
            socket.disconnect();

            const data = await response.json();
            const { loginMessage } = data;

            this.setState({
                loginMessage
            })
        } catch (err) {

            console.log(err)
        }
    }

    displayProfile = () => {
        const { user } = this.props;
        const { myScores } = this.state;

        switch (user.isLoggedIn) {
            case true:
                return (
                    <MainContainer>
                        <h4 className="quotes">{this.state.loginMessage}</h4>
                        <h1 className="scoresHeader display-6">Your Scores:</h1>
                        <ul>
                            {myScores.map((data, index) => {
                                return (
                                    <li key={`data${index}`}>
                                        Wave: {data.wave} Kills: {data.kills}
                                    </li>
                                )
                            })}
                        </ul>
                    </MainContainer>
                )
            default:
                return <Redirect to="/" />
        }
    }

    render() {
        return (
            this.displayProfile()
        )
    }
}

export default Profile;