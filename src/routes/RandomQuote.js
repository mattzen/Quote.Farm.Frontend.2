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
      return `${this.state.quotes[1]} - ${this.state.quotes[0]}`;
    }
  }

  render() {
    return (
      <div id="random-quote" class>
        <div>
          {this.getQuote()} <button onClick= {this.handleSubmit}>reload</button>
        </div>
      </div>
    );
  }
}

export default RandomQuote;
