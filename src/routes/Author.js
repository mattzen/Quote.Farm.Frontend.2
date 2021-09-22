import React from "react";
import "./Author.css";
import loading from "./loading.gif";

class Author extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      author: match.params.author,
      quotes: [],
      showLoader: true,
    };
  }
  getLoader = () => {
    if (this.state.showLoader) {
      return (
        <div id="loading-div">
          <img src={loading} width="20" height="20" alt="loading..." />
        </div>
      );
    }
  };

  componentDidMount() {
    this.GetQuote();
  }

  componentWillReceiveProps = (props) => {
    if(this.state.author !== props.match.params.author) {
      this.setState({author: props.match.params.author, quotes: [], showLoader: true});
      this.GetQuote();
    }
  };

  GetQuote = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/Authors/" +
        this.state.author,
      //"http://localhost:53886/authors/" + this.state.author,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ quotes: data , showLoader : false}));
  };

  render() {
    return (
      <div id="authorPage">
        <div id="author">{this.state.author.toString().split('-').join(' ')}</div>
        <div id="quotes">
          {this.getLoader()}
          {this.state.quotes.map(function (element, index) {
            return <div>{"- " + element}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Author;
