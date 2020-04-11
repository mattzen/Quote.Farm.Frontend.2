import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Author from "./Author.js";
import Authors from "./Authors.js";

export default function Nav() {
  return (
    <Router>
      <div>
      <nav>
      <Link to="/Authors">All Authors</Link>
          {/* <Link to="/Authors/Adolf-Hitler">Adolf Hitler</Link>
          <Link to="/Authors/Albert-Einstein">Albert Einstein</Link> */}
        </nav>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Authors/:author" component = {Author}>
          </Route>
          <Route path="/Authors/" component = {Authors}>
          </Route>
          <Route path="/search/:searchPhrase" component = {Author}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
