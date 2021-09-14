import React from "react";
import loading from "./loading.gif";
import "./Authors.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Authors extends React.Component {
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
   
  }

  componentDidMount() {
    this.GetAuthors();
  }

  GetAuthors = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/Authors",
      //"http://localhost:53886/authors/",
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
          <img src={loading} width="20" height="20" alt="loading..." />
        </div>
      );
    }
  };

  
  render() {
    return (
      <div id="authors-table" class>
        
        <div id="flex-container" class="flex-container">
          {this.getLoader()}
          {this.state.authors.map(function (arg) {
            return arg.map(function (author) {
              let url = "/Authors/" + author.split(" ").join("-");

              return (
                <div class = "link-div">
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

export default Authors;
