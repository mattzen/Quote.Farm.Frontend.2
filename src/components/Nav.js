import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Author from "./Author.js";
import Authors from "./Authors.js";
import TestComp from "./TestComp";
import "./Nav.css";
import SearchResult from "./SearchResult";
import Home from "./Home.js";

export default function Nav(props) {
  return (
    <Router>
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
