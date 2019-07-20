import React, { Component } from 'react';
import './App.css';
import Weather from './components/weather.js';


class App extends Component {

  state = {
    temp: "",
    wind: "",
    date: ""
  };

  componentDidMount() {
    fetch(`https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver1.0`)
      .then(response => response.json())
      .then(json => this.setState({ Weather: json }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={"https://i.pinimg.com/originals/2f/be/9a/2fbe9a273ed63cd9a227bd803b3da834.png"} />
          <h1>Mars Weather Forecast</h1>
        </header>
        <Weather />

        




      </div>
    );
  }
}

export default App;
