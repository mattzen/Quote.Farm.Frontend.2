import React from "react";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      quotes : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  GetQuote = (author) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      // "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/Authors/" + search,
      "http://localhost:53886/search/" + this.state.value,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ quotes: data }));
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div id="search">
        <div id="search-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
