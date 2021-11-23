import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// !
console.log("1");

// Square - классовый компонент (Клетка) - рендерит по одному элементу <button>, добав. в метод render на {this.props.value} для числа в квадр, измен тег кнп для отбраж. «клик» в консоли, + конструктор к классу чтобы инициал и сохран сост, измен render для отображ текущего значения из состояния при клике, заменим обработчик onClick this.setState({value: 'X'}),
class Square extends React.Component {
  // + констр для инициал и сохран сост
  constructor(props) {
    // super всегда при объяв констр подкласса
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    // !
    console.log("8.1 S-1");
    return (
      <button
        className="square"
        // измен тег кнп - видим «клик» в консоли. передаём функцию в качестве значения пропа
        onClick={() =>
          //   {
          //   // !
          //   console.log("клик");
          // }
          // Заменим обработчик onClick - this.setState({value: 'X'}). вызывая this.setState, React, перерендерит Square при клике <button>. this.state.value станет X
          this.setState({ value: "X" })
        }
      >
        {/* добав. в render - this.props.value - число внутри каждого отрендеренного квадрата */}
        {/* {this.props.value} */}
        {/* измен render для отображ текущего значения из состояния - this.state.value*/}
        {this.state.value}
      </button>
    );
  }
}
// !
console.log("2");

// Board - классовый компонент (Поле) - рендерит 9 компонентов Square, передаем данные(проп) из родит Board в дочер Square,
class Board extends React.Component {
  renderSquare(i) {
    // !
    console.log("7.3 B-3");
    // передаем данные(проп) из Board в Square.
    return <Square value={i} />;
  }
  render() {
    // !
    console.log("7.1 B-1");
    const status = "Next player: X";
    // !
    console.log("7.2 B-2");
    // рендерит 9 компонентов Square
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
// !
console.log("3");

// Game - классовый компонент (Игра) - рендерит поле c заглушками,
class Game extends React.Component {
  render() {
    // !
    console.log("6.1 G-1");
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
// !
console.log("4");
// ========================================
// !
console.log("5");
ReactDOM.render(<Game />, document.getElementById("root"));
// !
console.log("9");
