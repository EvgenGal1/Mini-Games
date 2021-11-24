import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// !
console.log("1");

// Square - КЛАССОВЫЙ компонент (Клетка) - опред класс, наследуется от React.Component - рендерит по одному элементу <button>
// добав. в метод render на {this.props.value} для числа в квадр
// измен тег кнп для отбраж. «клик» в консоли
// + конструктор к классу чтобы инициал и сохран сост
// измен render для отображ текущего значения из состояния при клике
// заменим обработчик onClick this.setState({value: 'X'})
// убир констр(Board хран сост игры)измен onClick и state(приним проп1 и проп2)
// class Square extends React.Component {
//   // + констр для инициал и сохран сост
//   // constructor(props) {
//   // super всегда при объяв констр подкласса. все класс.компон. с констр. начин с super(props)
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//   // убир констр(Board хран сост игры)
//   render() {
//     // !
//     console.log("8.1 S-1");
//     return (
//       <button
//         className="square"
//         // измен тег кнп - видим «клик» в консоли. передаём функцию в качестве значения пропа
//         onClick={() =>
//           //   {
//           //   // !
//           //   console.log("клик");
//           // }
//           // заменим обработчик onClick - this.setState({value: 'X'}). вызывая this.setState, React, перерендерит Square при клике <button>. this.state.value станет X
//           // this.setState({ value: "Х" })
//           // измен onClick(приним проп2)
//           this.props.onClick()
//         }
//       >
//         {/* добав. в render - this.props.value - число внутри каждого отрендеренного квадрата */}
//         {/* {this.props.value} */}
//         {/* измен render для отображ текущего значения из состояния - this.state.value*/}
//         {this.state.value}
//         {/* измен state(приним проп1)  */}
//         {this.props.value}
//       </button>
//     );
//   }
// }
// Square - ФУНКЦИОНАЛЬНЫЙ компонент (Клетка) - простой способ напис компон(содерж метод render и не имеют собств состояния). функция приним props и возвращ то что отрендерено
// сразу заменили this.props на props оба раза, когда обращались к ним. укорочен onClick
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// !
console.log("2");

// Board - классовый компонент (Поле) - рендерит 9 компонентов Square
// передаем данные(проп) из родит Board в дочер Square
// +констр с 9 эл.(squares квадр) со знач null для хран сост игры в родителе
// измен метод renderSquare чтобы читать данные из массива squares для передачи в кажд Square текущ значен(проп1 value: X,O,null)
// измен метод renderSquare для передачт fn(handleClick проп2) в Square чтоб вызывал при клике по нему(будет обнов Board)
// процес - onClick из DOM <button> указ React устан обработчик события - клик вызовет onClick из Square render() - onClick вызовет this.props.onClick(), проп onClick в Board - Board передаст в Square onClick={() => this.handleClick(i)}, Square при клике вызывает handleClick(i) у Board
// соглашение об именах — on[Имя события] для пропсов, отвечающих за события, и handle[Имя события] для методов обрабатывающих события.
// + метод handleClick
// теперь состояние хран в Board(позволит опред победителя), при изменен Board перерендер компонентов Square. Square получ все значения из Board и уведом о клик. Square стал управляемым.
// в handleClick .slice() создаёт копии массива для избежания прямой мутации массива что позволит созран предыдущ сост игры и обращ к ним позже
// По-умолчанию установим первый ход за «X», xIsNext: true
// обновим метод handleClick для инверсии значения xIsNext, «X» или «O»
// изменим текст «status» в методе render для отображения хода след. игрока
// + calculateWinner, опред. побед. игра закончена. fn получает массив из 9 клеток, проверяет победителя и возвращает 'X', 'O' или null
// измен render + вызов calculateWinner(squares) для проверки выйгрыша и вывода смс о победителе
// изменить handleClick для игнор клик и выхода из fn е/и победа или клетка заполнена
// Игра готова
class Board extends React.Component {
  // +констр с squares
  constructor(props) {
    super(props);
    this.state = {
      // fill - измен все эл массива (не обязат)от нач до конеч
      squares: Array(9).fill(null),
      // первый ход за «X»
      xIsNext: true,
    };
  }
  // + метод handleClick
  handleClick(i) {
    const squares = this.state.squares.slice();
    // slice - Возвращает копию массива (не обязат)от нач до конеч
    // squares[i] = "Х";
    // игнор клик и выхода из fn е/и победа или клетка заполнена
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // инверсии xIsNext, на «X» или «O»
    squares[i] = this.state.xIsNext ? "Х" : "О";
    this.setState({
      squares: squares,
      // инверсии xIsNext, на «X» или «O»
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    // !
    console.log("7.3 B-3");
    // передаем данные(проп) из Board в Square(вниз).
    // return <Square value={i} />;
    // измен метод renderSquare чтобы читать данные из массива squares(проп1)
    // измен метод renderSquare для передачт fn()handleClick в Square(проп2)
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    // !
    console.log("7.1 B-1");
    // const status = "Next player: X";
    // ход след. игрока
    // const status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    // вызов calculateWinner(squares) для проверки выйгрыша и вывода смс о победителе
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Выиграл " + winner;
    } else {
      status = "Слудующий ход: " + (this.state.xIsNext ? "Х" : "О");
    }
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

// опред. побед. игра закончена. fn получает массив из 9 клеток, проверяет победителя и возвращает 'X', 'O' или null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
