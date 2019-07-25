import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, Button, Container } from 'react-bootstrap';

import logo from './images/brainz-logo-1.png';

import KillCount from './components/killCount';
import LandingPage from './components/landingPage';


class App extends Component {
  state = {
    isLoggedIn: false,
    id: 0,
    first_name: '',
    last_name: '',
    email: ''
  }

  changeLoginState = (user) => {
    const { login, id, first_name, last_name, email } = user;
    this.setState({
      isLoggedIn: login,
      id,
      first_name,
      last_name,
      email
    })
  }

  render() {
    const { isLoggedIn } = this.state

    return (
      <Router>
        <Nav className="navbar shadow-lg navbar-expand-lg navbar-light">
          <Link className="navbar-brand text-white" to="/">
            <img className="navLogo" src={logo} alt='Go Hybrid Logo' />
          </Link>
          <Button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-alert"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <Nav className="navbar-nav mr-auto">
              <Nav.Item className="nav-item active ">
                <Link className="nav-link text-white" to="/">Home<span className="sr-only"></span></Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="navbar-collapse collapse" id="navbarColor03" >
            {isLoggedIn === true ?
              <Nav className="navbar-nav ml-auto">
                <Nav.Item className="nav-item">
                  <Link className="nav-link text-white" to="/users">Your Comparisons</Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                  <Link className="nav-link text-white" to="/users/logout">Logout</Link>
                </Nav.Item>
              </Nav>
              :
              <Nav className="navbar-nav ml-auto">
                <Nav.Item className="nav-item">
                  <Link className="nav-link text-white" to="/users/login">Login</Link>
                </Nav.Item>
                <Nav.Item className="nav-item my-2 my-lg-0">
                  <Link className="nav-link text-white" to="/users/register">Register</Link>
                </Nav.Item>
              </Nav>
            }
          </div>
        </Nav>
        <Route path='/' exact component={LandingPage} />
        <Route path='/scores' exact component={KillCount} />
        {/* <Route path='/users/:login_or_register?' component={} /> */}
      </Router>
    )
  }
}

export default App;
