import React from "react";
import loading from "./loading.gif";
import "./Authors.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

class Authors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [[]],
      showLoader: true,
    };
    this.headerClicked = this.headerClicked.bind(this);
  }

  getAuthorDiv = (num) => {
    return <div id={num}>{num.toUpper()}. </div>;
  };

  componentDidMount() {
    this.GetAuthors();
  }

  GetAuthors = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://99tpj0um53.execute-api.us-east-2.amazonaws.com/dev/QuoteFarmApi-Test/Authors",
      //"http://localhost:53886/authors/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ showLoader: false, authors: data }));
  };

  getLoader = () => {
    if (this.state.showLoader) {
      return (
        <div id="loading-div">
          <img src={loading} width="20" height="20" alt="loading..." />
        </div>
      );
    }
  };

  getList = (authList) => {

  };

  headerClicked = (props) => {
    console.log(props);
  }

  render() {
    return (
      <div id="authors-table">
        {this.getLoader()}
        {this.state.authors.map((arg) => (
          <div key = {arg} className= {"author-groups"}>
             <div className = "author-groups-header">
               <span className="gourp-title">{arg[0] ? arg[0][0] : ""}</span>
               <button onClick={this.headerClicked}>expand</button>
               </div>
               <div className = "author-groups-body">
            {arg.map((a) => (
              <Link key={a} to = {"Authors/" + a.split(" ").join("-")} >
                <Button variant="contained">{a}</Button>
              </Link>
            ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // render() {
  //   return (
  //     <div id="authors-table">
  //       {this.getLoader()}
  //       {this.state.authors.map(arg => {
  //            return (arg.map((author, index) => {
  //             let url = "/Authors/" + author.split(" ").join("-");
  //             return (
  //               <Link key={author} to={url}>
  //                 <Button variant="contained">{author}</Button>
  //               </Link>
  //             );
  //           }))
  //       })}
  //     </div>
  //   );
  // }
}

export default Authors;
