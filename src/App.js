import React, { Component } from 'react';
import './App.css';
import rover from './images/rover.png';
import lander from './images/lander.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      tempHi: '',
      tempLo: '',
      windspeed: '',
      season: '',
      WD: ''
    };
    this.getInfo();
  }

  //Pulling data from the InSight lander and setting the corresponding state to gathered information.
  getInfo() {
    fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver=1.0')
      .then(res => res.json())
      .then(res => {
        //Creating varible to "point" to the latest available data.
        var i = res["sol_keys"][res["sol_keys"].length - 1];
        //Another useful variable to help explore the array of 'wind direction'.
        var windObj = res[i].WD;

        console.log(res);
        console.log(`Data from Sol Day: ` + i);
        //Setting state for each parameter to be displayed.
        this.setState({ date: res[i].First_UTC.slice(0, 10) })
        this.setState({ tempHi: res[i].AT.mx });
        this.setState({ tempLo: res[i].AT.mn });
        this.setState({ season: res[i].Season });
        this.setState({ windspeed: res[i].HWS.av });
        this.setState({ WD: res[i].WD[Object.keys(windObj)[7]].compass_point })
      });
  }

  render() {
    return (


      <div className="App">

        <header className="App-header">
          <img id="curiosity" src={rover} alt="Mars Curiosity Rover" />
          <h1>Mars Weather Report</h1>
          <img id="insight" src={lander} alt="Mars InSight Lander" />
        </header>

        <div className="content">
          <div className="Info-container">
            <h1>Last Updated:</h1>
            <h3>{this.state.date}</h3>
            <h1>Temperature:</h1>
            <h3>High: {Math.round(this.state.tempHi * 9 / 5 + 32)} °F</h3>
            <h3>Low: {Math.round(this.state.tempLo * 9 / 5 + 32)} °F</h3>
            <h1>Wind Speed:</h1>
            <h3>{this.state.WD}  {Math.round(this.state.windspeed)} mph </h3>
            <h1>Season:</h1>
            <h3> {this.state.season.toUpperCase()}</h3>
          </div>
          <div className="Info-container">
            <h1>InSight Lander</h1>
            <p>
              The Interior Exploration using Seismic Investigations, Geodesy and Heat Transport (InSight) mission is a robotic lander designed to study the deep interior of the planet Mars. It was manufactured by Lockheed Martin, is managed by NASA's Jet Propulsion Laboratory, and most of its scientific instruments were built by European agencies. The mission launched on 5 May 2018 at 11:05 UTC aboard an Atlas V-401 rocket and successfully landed at Elysium Planitia on Mars on 26 November 2018 at 19:52:59 UTC. InSight traveled 483 million km (300 million mi) during its journey.

              </p>
          </div>
        </div>

        <div className="dailypicture">
          <h1>Raw Image Collection:</h1>
        </div>

      </div>
    );
  }
}

export default App;
