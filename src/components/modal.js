import React from "react";

export default props => (
  <div className="overlay">
    <div className="modal">
      <div className="title"> {props.text}</div>
      <div className="button" onClick={props.onClick}>
        Play again
      </div>
    </div>
  </div>
);
