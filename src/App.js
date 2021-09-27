import React from "react";
import "./App.css";
import Search from "./components/Search.js";
import Nav from "./components/Nav.js";
import RandomQuote from "./components/RandomQuote.js";
import Switch from '@mui/material/Switch';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active : false,
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

    switchStyleLight  = {

        backgroundColor: "white",
        color: "black"
    }

    switchStyleDark = {
        backgroundColor: "rgb(0 0 0 / 87%)",
        color: "#ababab"
    }

    show = () => {
       this.setState( { active : !this.state.active});
    }

    render() {

        return (
            <div className="App" id="App" style = { this.state.active? this.switchStyleDark: this.switchStyleLight}>
                    <Nav>
                        <div id="header-div">
                            <div id="header-logo">
                                <div>
                                    <a href="/">Quotes.Farm</a>
                                    <Switch id="switch-component" onChange={this.show}>
                                    </Switch>
                                </div>
                            </div>
                            <Search></Search>
                        </div>
                        <div id="random-quote-div">
                            <RandomQuote/>
                        </div>
                    </Nav>
            </div>
        );
    }
}

export default App;
