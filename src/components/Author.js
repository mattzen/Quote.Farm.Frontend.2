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
      toolTipLoader : false,
      toolTipText: ''
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

  handleClick(click){
    window.open(click.target.id, '_blank');
    window.focus();
  }

  handleMouseEnter(){
    console.log(url);
    //var url = url.target.id;
    //var url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + this.state.author + "&limit=5";
    //var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza";
    var url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+this.state.author.split("-").join("_");
    console.log(url);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(json) {
        // Initialize the DOM parser
       // var parser = new DOMParser();

        // Parse the text
        //var doc = parser.parseFromString(html, "text/html");

        var doc = JSON.parse(json);

        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        // var docArticle = doc.querySelector('article').innerHTML;

        console.log(doc);
        return doc.query.pages[Object.keys(doc.query.pages)[0]].extract;
    })
    .then((parsed) =>  {
       this.setState({showAuthorsTooltip : true, toolTipLoader : false, toolTipText : parsed })
      })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });

    
  }

  handleMouseOut(){
    this.setState({showAuthorsTooltip : false, toolTipLoader : false });
  }
  
  render() {
    const tooltipStyle = {
      visibility: this.state.showAuthorsTooltip ? 'visible' : 'hidden',
      width: "350px",
      height: "auto",
      position: "absolute",
      backgroundColor: "#504444",
      animation: this.state.showAuthorsTooltip ? "fadein 1s": "fadeout 1s",
      borderRadius : "10px",
      overflow: "hidden",
      fontSize: "14px",
      padding: "10px",
      color: "white"
    }
  
    let wikiLink = "https://en.wikipedia.org/wiki/" + this.state.author.toString().split('-').join('_');
    return (
      <div id="authorPage">
        <div id="author">{this.state.author.toString().split('-').join(' ')}
        <a id= "wiki-link" onMouseLeave={this.handleMouseOut} onMouseEnter={this.handleMouseEnter} onClick={this.handleClick} id={wikiLink}>wiki
        <div style={tooltipStyle}  id="wiki-tooltip">{this.getToolTipLoader()}{this.state.toolTipText}</div></a></div>
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
