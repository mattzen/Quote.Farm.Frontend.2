import React from "react";
import "./Author.css";
import loading from "./loading.gif";

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

    }

    componentWillReceiveProps = (props) => {
        this.setState({
            searchPhrase: props.match.params.searchPhrase,
            result: [],
            showLoader: true,
        });
    };

    GetSearchResult = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(
            "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/search/" +
            this.state.searchPhrase,
            //"http://localhost:53886/authors/" + this.state.searchPhrase,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => this.setState({result: data, showLoader: false}));
    };

    render() {
        return (
            <div id="search result">
                {this.state.searchPhrase}
            </div>
        );
    }
}

export default SearchResult;
