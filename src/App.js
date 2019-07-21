import React, { Component } from 'react';
import './App.css';

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

  getInfo() {

    fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver=1.0')
      .then(res => res.json())
      .then(res => {
        var i = res["sol_keys"][6];
        console.log(res);

        this.setState({ date: res[i].Last_UTC.slice(0, 10) })
        this.setState({ tempHi: res[i].AT.mx });
        this.setState({ tempLo: res[i].AT.mn });
        this.setState({ season: res[i].Season });
        this.setState({ windspeed: res[i].HWS.av });
        this.setState({ WD: res[i].WD[0].compass_point })
      });
  }

  render() {
    return (


      <div className="App">

        <header className="App-header">
          <img id="curiosity" src={"https://i.pinimg.com/originals/2f/be/9a/2fbe9a273ed63cd9a227bd803b3da834.png"} alt={"Error"} />
          <h1>Mars Weather Report</h1>
          <img id="insight" src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3790f880-23f3-4236-a8e7-3f4505e8a002/dcal5xw-dd8763a1-1ada-4673-a028-4fce89a3e045.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM3OTBmODgwLTIzZjMtNDIzNi1hOGU3LTNmNDUwNWU4YTAwMlwvZGNhbDV4dy1kZDg3NjNhMS0xYWRhLTQ2NzMtYTAyOC00ZmNlODlhM2UwNDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8giKQzEcU-0uaqgbRb5OBx0J5w0m3w5OdGUAIPpGyVo"} alt={"Error"} />
        </header>

        <div className="content">
          <div className="Info-container">
            <h1>Last Updated:</h1>
            <h3>{this.state.date}</h3>
            <h1>Temperature:</h1>
            <h3>High: {Math.round(this.state.tempHi * 9 / 5 + 32)} °F</h3>
            <h3>Low: {Math.round(this.state.tempLo * 9 / 5 + 32)} °F</h3>
            <h1>Wind Speed:</h1>
            <h3>{this.state.WD} - {Math.round(this.state.windspeed)} mph </h3>
            <h1>Season:</h1>
            <h3> {this.state.season.toUpperCase()}</h3>
          </div>
          <div className="Info-container">
            <h1>InSight Lander</h1>
            <p>
              The Interior Exploration using Seismic Investigations, Geodesy and Heat Transport (InSight) mission is a robotic lander designed to study the deep interior of the planet Mars. It was manufactured by Lockheed Martin, is managed by NASA's Jet Propulsion Laboratory, and most of its scientific instruments were built by European agencies. The mission launched on 5 May 2018 at 11:05 UTC aboard an Atlas V-401 rocket and successfully landed[14] at Elysium Planitia on Mars on 26 November 2018 at 19:52:59 UTC. InSight traveled 483 million km (300 million mi) during its journey.
              </p>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
