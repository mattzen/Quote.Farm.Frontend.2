import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Author from "./Author.js";
import Authors from "./Authors.js";
import AuthorsTables from "./AuthorsTables.js";
import "./Nav.css";
import Button from "@mui/material/Button";

export default function Nav(props) {
  return (
    <Router>
      <div id="router-div">
        <nav id="navigation">
            {props.children}
            <Link to="/Authors"> <Button variant="contained">List all authors</Button></Link>
        </nav>
          <Switch>
            <Route path="/Authors/:author" component={Author}></Route>
            <Route path="/search/:searchPhrase" component={Author}></Route>
            <Route path="/Authors/" component={Authors}></Route>
            <Route path="/AuthorsTables/" component={AuthorsTables}></Route>
          </Switch>
      </div>
    </Router>
  );
}