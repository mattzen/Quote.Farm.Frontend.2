import React from "react";
import RandomQuote from "./RandomQuote.js";

export default function Home() {
  return (
    <div id="random-quote-div">
      <RandomQuote />
    </div>
  );
};

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div id="random-quote-div">
//         <RandomQuote />
//       </div>
//     );
//   }
// }

// export default Home;
