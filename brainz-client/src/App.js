import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import KillCount from './components/killCount';
import LandingPage from './components/landingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={LandingPage} />
        <Route path='/scores' exact component={KillCount} />
        {/* <Route path='/users/:login_or_register?' component={} /> */}
      </Router>
    </div>
  );
}

export default App;
