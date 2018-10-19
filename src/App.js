import React, { Component } from "react";
import "./App.css";
import Menu from "./components/menu";
import Game from "./components/game";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: true
    };
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  startGame(config) {
    this.setState({
      config,
      showMenu: false
    });
  }

  endGame() {
    this.setState({ showMenu: true });
  }

  render() {
    const { showMenu, config } = this.state;
    if (showMenu) {
      return <Menu onStart={this.startGame} />;
    }
    return <Game config={config} onEnd={this.endGame} />;
  }
}

export default App;
