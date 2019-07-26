import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import MainContainer from "../sharedComponents/mainContainer"

import "../App.css";

class Profile extends Component {
    state = {
        loginMessage: ""
    }

    componentDidMount = () => {
        if (!!this.props.user.isLoggedIn) {
            this.getProfile();
        }
    }

    getProfile = async () => {
        const url = "http://localhost:3000/users/";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.props.user)
            })

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

        switch (user.isLoggedIn) {
            case true:
                return (
                    <MainContainer>
                        <h4 className="quotes">{this.state.loginMessage}</h4>
                        <h1 className="scoresHeader display-6">Your Scores:</h1>
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