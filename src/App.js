import React from "react";
import "./App.css";
import Search from "./routes/Search.js";
import Nav from "./Nav.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App" id="App">
        <div id="header-div">
          <div id="header-logo">Quotes.Farm</div>
          <div> <Search></Search></div>
        </div>
        <Nav></Nav>
      </div>
    );
  }
}

export default App;
