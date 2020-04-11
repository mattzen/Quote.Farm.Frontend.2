import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Authors from "./Authors.js";
import Search from "./Search.js";
import { Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    //this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className="App" id="App">
        <div id="header-div">
          <div id="header-logo">Quotes.Farms</div>
          <div> <Search></Search></div>
          <div id="time">{this.state.date.toLocaleTimeString()}</div>

        </div>

        <Nav></Nav>
      </div>
    );
  }
}

export default App;
