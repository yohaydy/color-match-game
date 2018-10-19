import React, { Component } from "react";
import Modal from "./modal";

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      board: null,
      match: false,
      timeLeft: 0,
      startTime: Date.now()
    };
    this.restartGame = this.restartGame.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    const { config } = this.props;
    this.setState({
      board: generateBoard(config.width, config.height),
      config
    });
    this.runUpdateTime = setInterval(this.updateTime, 1000);
  }

  updateTime() {
    const { timeLeft, config, startTime, match } = this.state;
    if (timeLeft >= 0 && !match) {
      this.setState({ timeLeft: config.time - (Date.now() - startTime) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.runUpdateTime);
  }

  handleCellClick(x, y) {
    this.setState(state => {
      return { board: markCells(state.board, x, y), match: isMatch(state.board, state.config) };
    });
  }

  restartGame() {
    this.setState(state => ({
      board: generateBoard(state.config.height, state.config.height),
      match: false,
      startTime: Date.now(),
      timeLeft: 0
    }));
  }

  render() {
    const { onEnd } = this.props;
    const { board, timeLeft, match } = this.state;

    if (!board) {
      return null;
    }
    const rows = board.map((row, x) => (
      <div key={x} className="row">
        {row.map((cell, y) => (
          <div
            key={y}
            style={{ background: cell.selected ? "tomato" : "#444" }}
            className="cell"
            onClick={() => this.handleCellClick(x, y)}
          />
        ))}
      </div>
    ));
    const date = new Date(timeLeft);
    const formattedTime = timeLeft > 0 ? `${date.getMinutes()}:${date.getSeconds()}` : "00:00";

    return (
      <div className="game">
        {timeLeft < 0 && <Modal text="Time is over" onClick={this.restartGame} />}
        {match && <Modal text="You Won !" onClick={this.restartGame} />}
        <div className="time"> {`${formattedTime} minutes left`} </div>
        <div className="board">
          <div>{rows}</div>
        </div>
        <div className="bottom-text" onClick={onEnd}>
          {" "}
          End{" "}
        </div>
      </div>
    );
  }
}

function isMatch(board, config) {
  let curent = board[0][0].selected;
  for (let i = 0; i < config.width; i++) {
    for (let j = 0; j < config.height; j++) {
      if (curent !== board[i][j].selected) {
        return false;
      }
    }
  }
  return true;
}

function markCells(board, x, y) {
  const range = 1;
  for (let i = x - range; i <= x + range; i++) {
    if (board[i]) {
      for (let j = y - range; j <= y + range; j++) {
        if (board[i][j]) {
          board[i][j].selected = !board[i][j].selected;
        }
      }
    }
  }
  return board;
}

function generateBoard(width, height) {
  const rows = new Array(height).fill([]);
  return rows.map(row => {
    return new Array(width).fill({}).map(cell => ({
      selected: Math.random() > 0.5
    }));
  });
}
