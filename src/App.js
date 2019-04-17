/****************************************************************************
 * 
 * Purpose : To route to all the paths
 * 
 * @description
 * @file : App.js
 * @author : Deepthi V <deepthiv286@gmail.com>
 * @version : 1.0
 * @since : 10/04/2019
 * 
 ****************************************************************************/
import React, { Component } from 'react';
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import QuestionApproval from './components/QuestionApproval';

/**
 * importing required files
 */
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/QuesApproval" component={QuestionApproval} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
