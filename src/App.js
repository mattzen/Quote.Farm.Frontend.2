import React from "react";
import "./App.css";
import Search from "./routes/Search.js";
import Nav from "./Nav.js";
import RandomQuote from "./routes/RandomQuote.js";
import Switch from '@mui/material/Switch';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            divStyle: {
                // color: 'blue',
                // backgroundColor: 'grey',
            }
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
    }


    handleClick() {
        this.setState({
                divStyle: {
                    color: 'orange',
                    backgroundColor: 'black',
                }
            }
        )
    }

    switchStyle  = {
        display: "flex"
    }

    switchStyleDark = {
        display:"none"
    }

    render() {

        return (
            <div className="App" id="App">
                <div id="left-app" style = {this.switchStyle}>
                    <Switch id="switch-component">

                    </Switch>
                </div>
                <div id="right-app">
                    <div id="header-div">
                        <div id="header-logo">
                            <a href="/">Quotes.Farm</a>
                        </div>
                        <Search></Search>
                    </div>



                    <div id="random-quote-div">
                        {" "}
                        <RandomQuote divStyle={this.state.divStyle}/>
                    </div>
                    <Nav></Nav>
                </div>
            </div>
        );
    }
}

export default App;
