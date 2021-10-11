import React from "react";
import "./Author.css";
import loading from "./loading.gif";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

class SearchResult extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      searchPhrase: match.params.searchPhrase,
      result: [[]],
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
    this.GetSearchResult(this.state.searchPhrase);
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      searchPhrase: props.match.params.searchPhrase,
      result: [[]],
      showLoader: true,
    });
    this.GetSearchResult(props.match.params.searchPhrase);
  };

  GetSearchResult = (keyword) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/search/" +keyword,
      //"http://localhost:53886/search/" + keyword,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ result: data, showLoader: false }))
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  render() {
    return (
      <div id="search result">
        {"Search results for " + this.state.searchPhrase}
        {this.getLoader()}
        {this.state.result.map((elems, index) => {
          return (
            <div className="search-result">
              <span>{index + 1 + ". "}</span>
              {elems.map((val, index) => {
                return (
                  <div className="search-result-row">
                    {index == 1 ? (
                      <Button   variant="outlined"
                      size="small"
                      style={{ margin: "5px" }}>
                        <Link to={"/Authors/" + val.split(" ").join("-")}>
                          {val}
                        </Link>
                      </Button>
                    ) : (
                    (index < 3) ? val : ""
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchResult;
