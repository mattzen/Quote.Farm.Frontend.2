import React from "react";
import loading from "./loading.gif";
import "./Authors.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Author from "./Author.js";

class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [[]],
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      showLoader: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // e.preventDefault();
  }

  componentDidMount() {
    this.GetAuthors(this.handleClick);
  }

  GetAuthors = (handleEvent) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      //"https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/authors",
      "http://localhost:53886/authors/",
      requestOptions
    ).then((response) => response.json())
    .then((data) => this.setState({ authors: data }))
    //.then(rendering())
      .then((authors) =>
        this.state.authors.map(function (element, index) {
          var div = document.createElement("div");
          div.id = "Table-" + element[0][0];
          div.className = "flex-item";
          div.style.width = "125px";
          div.style.float = "left";
          var span = document.createElement("span");
          span.id = "Table-header-" + element[0][0];
          span.style.width = "125px";

          span.innerHTML = "<h3>" + element[0][0].toLocaleUpperCase() + "</h3>";
          div.appendChild(span);
          document.getElementById("flex-container").appendChild(div);
        })
      )
      .then((links) =>
        this.state.authors.map(function (elements, index) {
          for (var i = 0; i < elements.length; i++) {
            var div = document.createElement("div");
            div.className = "link-div";

            var a = document.createElement("a");
            a.href = "/Authors/" + elements[i].split(" ").join("-");
            a.className = "links-class";
            a.innerHTML = elements[i];
            a.onclick = handleEvent;
            a.class = "active";

            div.appendChild(a);
            if (document.getElementById("Table-" + elements[i][0]) != null) {
              document
                .getElementById("Table-" + elements[i][0])
                .appendChild(div);
            }
          }
        })).then(_ => this.setState({ showLoader: false }));
  };

  getLoader = () => {
    if (this.state.showLoader) {
      return (
        <div id="loading-div">
          <img src={loading} alt="loading..." />
        </div>
      );
    }
  };

  render() {
    return (
      <div id="authors-table" class>
        <div id="authors-table-header">Authors</div>

        <div id="flex-container" class="flex-container">
          {this.getLoader()}
        </div>
      </div>
    );
  }
}

export default Authors;
