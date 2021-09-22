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
        backgroundColor: "grey",
        color: "white"
    }

    show = () => {
       this.setState( { active : !this.state.active});
    }

    render() {

        return (
            <div className="App" id="App" style = { this.state.active? this.switchStyleDark: this.switchStyleLight}>


                <div id="right-app" style = { this.state.active? this.switchStyleDark: this.switchStyleLight}>
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
                    <Nav>
                        <div id="random-quote-div">
                            <RandomQuote/>
                        </div>
                    </Nav>
                </div>

            </div>
        );
    }
}

export default App;
