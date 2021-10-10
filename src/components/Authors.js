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
      hiddenFields :[{}],
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
      .then((data) =>
        this.setState({
          showLoader: false,
          authors: data,
          hiddenFields: this.getHiddenFieldsArray(data)
        })
      );
  };


  getHiddenFieldsArray = (data) => {
    var y = data.map((element) => {
      return { element: element[0][0], show: false}
    })
    return y;
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

  getList = (authList) => {

  };

  headerClicked = (id) => {
    console.log(id);
      console.log(this.state.hiddenFields);

    let newa = this.state.hiddenFields;
    newa[id].show = !newa[id].show;

      this.setState({hiddenFields : newa})
  }

  render() {
    return (
      <div id="authors-table">
        {this.getLoader()}
        {this.state.authors.map((arg, index) => (
          <div key={arg} className={"author-groups"}>
            <div className="author-groups-header">
              <span className={"group-title"}>
                {arg[0] ? arg[0][0] : ""}
              </span>
              <Button variant="contained"
                onClick={() => {
                  return this.headerClicked(index);
                }}
              >
                {this.state.hiddenFields[index].show ? "hide" : "expand"}
              </Button>
            </div>
            <div className="author-groups-body" 
            style = {{display : this.state.hiddenFields[index].show ? "flex" : "none" }} >
              {arg.map((a) => (
                <Link key={a} to={"Authors/" + a.split(" ").join("-")}>
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
