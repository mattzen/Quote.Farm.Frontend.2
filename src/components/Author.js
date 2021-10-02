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
      showAuthorsTooltip: false,
      toolTipLoader: false,
      toolTipText: "",
      picId: "",
      toolTipAuthorCache: "",
      wikiLink: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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

  getToolTipLoader = () => {
    if (this.state.toolTipLoader) {
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
    if (this.state.author !== props.match.params.author) {
      this.setState({
        author: props.match.params.author,
        quotes: [],
        showLoader: true,
      });
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
      .then((data) => this.setState({ quotes: data, showLoader: false }));
  };

  handleClick() {
    window.open(
      "https://en.wikipedia.org/wiki/" + this.state.author.split("-").join("_"),
      "_blank"
    );
    window.focus();
  }

  processText = (text) => {
    var splittedText = text.split(" ");
    var count = splittedText.length;
    console.log(count);
    return text.slice(0, 500);
    
  };

  async handleMouseEnter() {

    //var url = url.target.id;
    //var url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + this.state.author + "&limit=5";
    //var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza";

    var authorName = this.state.author.split("-").join("_");

    var wikiLink = "https://en.wikipedia.org/wiki/"+authorName;

    if (this.state.toolTipAuthorCache == "") {
      this.setState({ toolTipAuthorCache: authorName, wikiLink : wikiLink });
    }

    if (this.state.toolTipAuthorCache !== authorName) {
      var url =
        "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +
        authorName;
      var picUrl =
        "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageimages&format=json&pithumbsize=100&titles=" +
        authorName;

      console.log(url);
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      Promise.all([
        fetch(picUrl, requestOptions)
          .then((response) => {
            return response.text();
          })
          .then((json) => {
            var doc = JSON.parse(json);
            if (
              doc.query.pages[Object.keys(doc.query.pages)[0]].thumbnail !==
              undefined
            ) {
              this.setState({
                showAuthorsTooltip: true,
                toolTipLoader: false,
                picId:
                  doc.query.pages[Object.keys(doc.query.pages)[0]].thumbnail
                    .source,
                toolTipAuthorCache: authorName,
              });
            } else {
              this.setState({
                showAuthorsTooltip: true,
                toolTipLoader: false,
                picId: "none",
                toolTipAuthorCache: authorName,
              });
            }
          })
          .catch(function (err) {
            console.log("Failed to fetch page: ", err);
          }),
        fetch(url, requestOptions)
          .then((response) => {
            return response.text();
          })
          .then((json) => {
            var doc = JSON.parse(json);
            if (
              doc.query.pages[Object.keys(doc.query.pages)[0]].extract !=
              undefined
            ) {
              this.setState({
                showAuthorsTooltip: true,
                toolTipLoader: false,
                toolTipText:
                  this.processText(doc.query.pages[Object.keys(doc.query.pages)[0]].extract),
                toolTipAuthorCache: authorName,
              });
            } else {
              this.setState({
                showAuthorsTooltip: true,
                toolTipLoader: false,
                toolTipText: "not found",
                toolTipAuthorCache: authorName,
              });
            }
          })
          .catch(function (err) {
            console.log("Failed to fetch page: ", err);
          }),
      ]);
    } else {
      this.setState({
        showAuthorsTooltip: true,
        toolTipLoader: false,
      });
    }
  }

  checkForPic = () => {
    if (this.state.picId != "none") {
      return (
        <img
          style={{
            float: "left",
            marginRight: "8px",
            padding: "5px",
          }}
          alt="Not Found"
          src={this.state.picId}
        ></img>
      );
    }
  };

  handleMouseOut() {
    this.setState({ showAuthorsTooltip: false, toolTipLoader: false });
  }

  render() {
    const tooltipStyle = {
      visibility: this.state.showAuthorsTooltip ? "visible" : "hidden",
      width: "50vw",
      height: "auto",
      position: "absolute",
      backgroundColor: "#504444",
      animation: this.state.showAuthorsTooltip ? "fadein 1s" : "fadeout 1s",
      borderRadius: "10px",
      overflow: "hidden",
      fontSize: "14px",
      padding: "10px",
      color: "white",
    };

    return (
      <div id="authorPage">
        <div id="author">
          {this.state.author.toString().split("-").join(" ")}

          <a
            id="wiki-link"
            onMouseLeave={this.handleMouseOut}
            // onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
          >
            wiki
            <div style={tooltipStyle} id="wiki-tooltip">
              {this.getToolTipLoader()}
              {this.checkForPic()}
              {this.state.toolTipText}... <a style={{color:"white", fontWeight:"bold", fontSize:"14px"}}id="read-more-style" href={this.state.wikiLink}>read more</a>
            </div>
          </a>
        </div>
        <div id="quotes">
          {this.getLoader()}
          {this.state.quotes.map(function (element, index) {
            return <div key={index}>{"- " + element}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Author;
