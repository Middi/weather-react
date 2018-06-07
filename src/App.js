import React, { Component } from 'react';
import './App.css';
import Icon from './icon.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img className="icon" src={Icon} alt="sunny icon"/>
        <div className="details">
          <h1>24°</h1>
          <h2>Sunny Day</h2>
          <p>Oslo, Thursday 21 June</p>
        </div>
      </div>
    );
  }
}

export default App;
