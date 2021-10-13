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
      timeTook: 0,
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
    this.GetSearchResult(this.state.searchPhrase, performance.now());
  }

  componentWillReceiveProps = (props) => {
    if (this.state.searchPhrase !== props.match.params.searchPhrase) {
      this.setState({
        searchPhrase: props.match.params.searchPhrase,
        result: [[]],
        showLoader: true,
      });
      this.GetSearchResult(props.match.params.searchPhrase, performance.now());
    }
  };

  GetSearchResult = (keyword, timeStart) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/search/" +
        keyword,
      //"http://localhost:53886/search/" + keyword,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          result: data,
          showLoader: false,
          timeTook: performance.now() - timeStart,
        })
      )
      .catch(function (err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  renderResult = () => {
    return <div>{}</div>;
  };

  getTimeElapsedFormatted = (timestr) => {
    return <h6>{timestr}</h6>;
  };

  render() {
    return (
      <div id="search result">
        <div className="search-result-header">
          {"Search results for " + this.state.searchPhrase}
          {": (" + this.state.result.length + " results total)"}
          <div style={{ fontSize: "15px" }}>
            {" took: " + this.state.timeTook.toFixed(3) + " ms"}
          </div>
        </div>
        {this.getLoader()}
        {this.state.result.map((elems, index) => {
          return (
            !this.getLoader() && (
              <div className="search-result" key={elems.slice(0, 20)}>
                <span>{index + 1 + ". "}</span>
                {elems.map((val, index) => {
                  return (
                    <div className="search-result-row" key={val.slice(0, 20)}>
                      {index == 1 ? (
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ margin: "5px" }}
                        >
                          <Link to={"/Authors/" + val.split(" ").join("-")}>
                            {val}
                          </Link>
                        </Button>
                      ) : (
                        ""
                      )}
                      {index === 0 ? (
                        <div style={{ color: "" }}>{val}) </div>
                      ) : (
                        ""
                      )}

                      {index === 2 ? (
                        <div style={{ color: "#00cb51ad" }}>
                          {val + " likes"}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            )
          );
        })}
      </div>
    );
  }
}

export default SearchResult;
