import React from "react";
import "./Author.css";
import loading from "./loading.gif";
import "./SearchResult.css"
class SearchResult extends React.Component {
    constructor({match}) {
        super();
        this.state = {
            searchPhrase: match.params.searchPhrase,
            result: [],
            showLoader: true,
        };
    }

    getLoader = () => {
        if (this.state.showLoader) {
            return (
                <div id="loading-div">
                    <img src={loading} width="20" height="20" alt="loading..."/>
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
            result: [],
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
            //"http://localhost:53886/search/" + this.state.searchPhrase,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => this.setState({result: data, showLoader: false}))
            .catch(function (err) {
                console.log("Failed to fetch page: ", err);
              });
    };

    render() {
        return (
            <div id="search result">
                {"Search results for " + this.state.searchPhrase}
                {this.getLoader()}
                {this.state.result.map((elem, index)=>{
                    return <div className="search-result">{index + 1 + ". "}<span>{elem}</span></div>
                })}
            </div>
        );
    }
}

export default SearchResult;
