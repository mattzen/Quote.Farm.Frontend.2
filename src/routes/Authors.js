import React from "react";
import loading from "./loading.gif";
import "./Authors.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
      <div id="authors-table">
          {this.getLoader()}
          {this.state.authors.map(function (arg) {
            return arg.map(function (author, index) {
              let url = "/Authors/" + author.split(" ").join("-");
              return (
                  <Link key = {author} to={url}>    <Button variant="contained" >{author}</Button></Link>
              );

            });
          })}
      </div>
    );
  }
}

export default Authors;
