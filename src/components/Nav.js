import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Author from "./Author.js";
import Authors from "./Authors.js";
import TestComp from "./TestComp";
import "./Nav.css";
import Button from "@mui/material/Button";
import SearchResult from "./SearchResult";
import Home from "./Home.js";

export default function Nav(props) {
  return (
    <Router>
      <div id="menu">
        <Link to="/Authors" id="listAll" className="menu-items">
          <Button variant="outline-primary">List all authors</Button>
        </Link>
        <Link to="/search/Love" id="love" className="menu-items">
          <Button variant="outline-danger">Love Quotes</Button>
        </Link>
        <Link to="/search/Wisdom" id="wisdom" className="menu-items">
          <Button variant="outline-success">Wisdom Quotes</Button>
        </Link>
        <Link to="/search/Philosophy" id="philosophy" className="menu-items">
          <Button variant="outline-dark">Philosophy Quotes</Button>
        </Link>
        <Link to="/search/Inspiration" id="inspiration" className="menu-items">
          <Button variant="outline-dark">Inspiration Quotes</Button>
        </Link>
        <Link to="/search/Life" id="life" className="menu-items">
          <Button variant="outline-dark">Life Quotes</Button>
        </Link>
        <Link to="/search/Success" id="success" className="menu-items">
          <Button variant="outline-dark">Success Quotes</Button>
        </Link>
      </div>
      <div id="router-div">
        <nav id="navigation">{props.children}</nav>
        <Switch>
          <Route path="/Authors/:author" component={Author}></Route>
          <Route path="/test123" component={TestComp} />
          <Route path="/search/:searchPhrase" component={SearchResult}></Route>
          <Route path="/Authors/" component={Authors}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}
