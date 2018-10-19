import React, { Component } from "react";

export default class Menu extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onStart({
      width: parseFloat(document.getElementById("width").value) || 5,
      height: parseFloat(document.getElementById("height").value) || 5,
      time: parseFloat(document.getElementById("time").value)*1000 || 300*1000
    });
  }
  render() {
    return (
      <div className="settings">
        <div className="title">React ColorMatch </div>
        <div className="input-group">
          <label className="label">Horizontal Cells: </label>
          <input id="height" type="number" placeholder={5} />
        </div>
        <div className="input-group">
          <label className="label">Vertical Cells: </label>
          <input id="width" type="number" placeholder={5} />
        </div>
        <div className="input-group">
          <label className="label">Allowed time (in seconds): </label>
          <input id="time" type="number" placeholder={300} />
        </div>

        <div className="button" onClick={this.handleClick}>
          Start Game !
        </div>
      </div>
    );
  }
}
