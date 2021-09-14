import React from "react";
import loading from "./loading.gif";
import "./RandomQuote.css";

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [[]],
      showLoader: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.downloadQuote();
  }

  componentDidMount() {
    this.downloadQuote();
  }

  downloadQuote = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/randomquote",
      //"http://localhost:53886/randomquote",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ quotes: data }))
      .then((_) => this.setState({ showLoader: false }));
  };

  getLoader = () => {
    return (
      <div id="loading-div">
        <img src={loading} width="20" height="20" alt="loading..." />
      </div>
    );
  };

  getQuote() {
    if (this.state.showLoader) {
      return this.getLoader();
    } else {
      return `${this.state.quotes[1]} -   `;
    }
  }

  getAuthorLink() {
    var url =
      "/Authors/" + this.state.quotes[0].toString().split(" ").join("-");
    return (
      <>
        <a href={url}>
          <u>{this.state.quotes[0]}</u>{" "}
        </a>
        <button onClick={this.handleSubmit}>reload</button>
      </>
    );
  }

  render() {
    return (
      <div id="random-quote" class>
        {this.getQuote()}
        {this.getAuthorLink()}
      </div>
    );
  }
}

export default RandomQuote;
