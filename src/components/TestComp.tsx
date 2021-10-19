import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TestComp(): JSX.Element {
  var [val, setVal] = React.useState([[""]]);

  const appendToList = (val1: string): string[][] => {
    return [...val, [val1]];
  };

  var [dateTime, setdateTime] = React.useState(new Date());

  React.useEffect(() => {
    //var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      //clearInterval(timerID);
    };
  });

  type Quote = {
    authorsName: string;
    quote: string;
    likes?: number;
    genre?: string;
    tags?: string[];
  };

  const quoteProcessor = (quote: Quote): JSX.Element => {
    return (
      <div>
        {" "}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {quote.genre}
            </Typography>
            <Typography variant="h5" component="div">
              {quote.quote}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"By " + quote.authorsName}
            </Typography>
            <Typography variant="body2">
              {quote.likes}
              <br />
              {quote.tags &&
                quote.tags.map((element) => <span>{element}</span>)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  };

  function tick(): void {
    setdateTime(new Date());
  }

  const printSomething = (obj: string): JSX.Element => {
    return <>{"HELLO WORLD"}</>;
  };

  return (
    <div style={{ display: "flex" }}>
      {/* <div>
        {dateTime.toLocaleTimeString()}
        <button
          style={{ width: "200px", height: "50px" }}
          onClick={() => {
            setVal(appendToList(dateTime.toLocaleTimeString()));
          }}
        >
          click me!
        </button>
      </div> */}

      <div style={{ display: "flex" }}> {val}</div>
      <div>{quoteProcessor({ authorsName: "Matt", quote: "hello world" })}</div>
      <div>
        {quoteProcessor({ authorsName: "Tom", quote: "beutiful world!" })}
      </div>
    </div>

    // <div>
    //   <PrimarySearchAppBar />
    // </div>
  );
}
