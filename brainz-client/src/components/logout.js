import React, { Component } from "react";
import { Redirect } from "react-router-dom";


class Logout extends Component {
    loggedInToLogout = () => {
        //Reset user state
        this.props.changeLoginState({
            login: false,
            id: 0,
            first_name: "",
            last_name: "",
            email: ""
        })

        return <Redirect to="/" />
    }

    render() {
        return (
            this.loggedInToLogout()
        )
    }
}

export default Logout;