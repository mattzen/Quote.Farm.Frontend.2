import React from "react";
import "./Author.css";

class Author extends React.Component {
  constructor({match}) {
    super();
    this.state = {
      author: match.params.author,
      quotes: ["Loading..."],
    };
  }

  componentDidMount() {
    this.GetQuote();
  }

  componentWillReceiveProps = (props) => {
    this.state.author = props.match.params.author;
    this.GetQuote();
  }

  GetQuote = (author) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
       "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/Authors/" + this.state.author,
      //"http://localhost:53886/authors/" + this.state.author,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ quotes: data }));
  };

  render() {
    return (
      <div id="authorPage">
        <div id="author">{this.state.author}</div>
        <div id="quotes">
          {this.state.quotes.map(function (element, index) {
            return <div>{"- " + element}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Author;
