import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import xhr from 'xhr';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    xhr("http://localhost:8888/user", (err, resp, body) => {
      this.setState({users: JSON.parse(body)});
    });
  }

  render() {
    const users = _.map(this.state.users, (user, key) => {
      return (
        <div key={key}>{user.username}</div>
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {users}
      </div>
    );
  }
}

export default App;
