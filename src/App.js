import React, { Component } from 'react';
import './App.css';
import Icon from './images/icon.png';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
    coords : {
      lat: '49.9139',
      lon: '32.7522'
    }
    };
  }

  geo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      this.setState(...this.state, {
        coords: {
          lat: lat,
          lon: lon
        }
      })
      this.fetch();
    }, pos => {

      var url = "https://cors-anywhere.herokuapp.com/https://ipinfo.io/geo";
      axios.get(url)
      .then(res => {
        var loc = res.loc.split(',');
        var lat = loc[0];
        var lon = loc[1];

        this.setState(...this.state, {
          coords: {
            lat: lat,
            lon: lon
          }
        })
        this.fetch();
      })
      .catch(err => console.log(err))
      })
  }

  fetch = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://fcc-weather-api.glitch.me/api/current?lat=${this.state.coords.lat}&lon=${this.state.coords.lon}`)
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
    this.geo();
    this.date(new Date());
  }


  render() {
    return (
      <div className="App">
        <img className="icon" src={Icon} alt="sunny icon" />
        <div className="card">
          {this.state.city
            ?
            <div className="details">
              <h1>{Math.floor(this.state.temp)}°</h1>
              <h2>{this.state.desc}</h2>
              <p>{this.state.city}, {this.state.date}</p>
            </div>
            :
            <div className="spinner">
              <div className="right-side">
                  <div className="bar"></div>
              </div>
              <div className="left-side">
                  <div className="bar"></div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
