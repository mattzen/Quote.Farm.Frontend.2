import React from "react";
import loading from "./loading.gif";
import "./Authors2.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Authors2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [[]],
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      showLoader: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    //e.preventDefault();
  }

  componentDidMount() {
    this.GetAuthors2(this.handleClick);
  }

  GetAuthors2 = (handleEvent) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      //"https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/authors",
      "http://localhost:53886/authors/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ authors: data }))
      .then((_) => this.setState({ showLoader: false }));
  };

  getLoader = () => {
    if (this.state.showLoader) {
      return (
        <div id="loading-div">
          <img src={loading} alt="loading..." />
        </div>
      );
    }
  };

  render() {
    return (
      <div id="authors-table" class>
        <div id="authors-table-header">Authors2</div>

        <div id="flex-container" class="flex-container2">
          {this.getLoader()}
          {this.state.authors.map(function (arg) {
            return arg.map(function (author) {
              let url = "/Authors/" + author.split(" ").join("-");
              return (
                <div>
                  <Link to={url}>{author}</Link>
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default Authors2;
