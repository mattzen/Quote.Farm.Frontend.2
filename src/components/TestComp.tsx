import React, { useState, useEffect, useCallback } from "react";

export default function TestComp() {
  var [state1, setState1] = useState([["hello"], ["world"]]);
  const setStateFn1 = (val1: string, val2: string): string[][] => {
    return [...state1, [val1, val2]];
  };

  var [state2, setState2] = useState();

  useCallback(
    () => {
      //callback
    },
    []
    //[input],
  );
  useEffect(
    () => {
      //effect
      return () => {
        //cleanup
      };
    } // [input]
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        <button
          style={{ width: "200px", height: "50px" }}
          onClick={() => {
            //setState1(setStateFn1(" ", "morda"));
          }}
        >
          click me!
        </button>
      </div>
      <div style={{ display: "flex" }}> {state1}</div>
    </div>
  );
}
