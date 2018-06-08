import React, { Component } from 'react';
import './App.css';
import Icon from './images/icon.png';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  fetch = () => {
    axios.get('https://fcc-weather-api.glitch.me/api/current?lat=59.9139&lon=10.7522')
      .then((res) => {
        console.log(res);
        this.setState(...this.state, {
          city: res.data.name,
          temp: res.data.main.temp,
          desc: res.data.weather[0].description
        })
      })
      .catch(err => console.log(err))
  }

  date = (date) => {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    var dayName = days[date.getDay()];
    var day = date.getDate();
    var monthIndex = date.getMonth();
  
    this.setState(...this.state, {
      date: `${dayName} ${day} ${monthNames[monthIndex]}`
    })
  }
  

  componentDidMount() {
    this.fetch();
    this.date(new Date());
  }


  render() {
    return (
      <div className="App">
        <img className="icon" src={Icon} alt="sunny icon" />
        <div className="details">
          <h1>{this.state.temp}°</h1>
          <h2>{this.state.desc}</h2>
          <p>{this.state.city}, {this.state.date}</p>
        </div>
      </div>
    );
  }
}

export default App;
