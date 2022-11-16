import React, { useState } from "react";

import "./src/GameOfFifteen.scss"

class Game extends React.Component {
  constructor(context, cellSize) {
    //  constructor(props) {
    super(cellSize);
    //  this.state = {  }
    this.state = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];
    // }

    this.color = "#FFB93B";

    this.context = context;
    this.cellSize = cellSize;

    this.clicks = 0;
  }

  getClicks() {
    return this.clicks;
  }
  cellView(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2);
  }
  render() {
    return <p>12</p>;
  }
}

export const GameOfFifteen = () => {
  const [fifteen, setFifteen] = useState(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
    // [1, 2, 3, 4],
    // [5, 6, 7, 8],
    // [9, 10, 11, 12],
    // [13, 14, 15, 0]
  );
  // console.log('field.length ', fifteen.length);
  let clicks = 0;
  const getClicks = () => {
    return clicks;
  };
  const cellView = (x, y) => {
    this.context.fillStyle = this.color;
    this.context.fillRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2);
  };
  return (
    <div className="GameOfFifteen">
      <div className="GameOfFifteen__descript"></div>
      <div className="GameOfFifteen__content">
        {/* <Game /> */}
        {/* // ! по видео - https://www.youtube.com/watch?v=U4E8ubLnGvI */}
        <h1>Игра в "Пятнашки"</h1>
        <div className="GameOfFifteen__fifteen">
          {
            fifteen.flat().map((item) => (
              <button key={item} className="item"><span>{item}</span></button>
              // 4. div.card убрали в SingleCard.js
              // в компонент SingleCard передаём card с id
              // 5. передаём handleChoice
              // 8. флаг переворота карты = е/и эл.итерац. = 1му|2ум выбору, или они равны
              // 10. флаг `отключения` от переворота (для задержки при 2х откр.картах)
              // <SingleCard
              //   key={card.id}
              //   card={card}
              //   handleChoice={handleChoice}
              //   flipped={card === choiceOne || card === choiceTwo || card.matched}
              //   disabled={disabled}
              // />
            ))
          }
        </div>
        <div className="GameOfFifteen__setting"><button className="btn btn-single">Перемешать</button></div>
      </div>
    </div>
  );
};
// export {GameOfFifteen}

// class qwe extends React.Component {
//  //constructor(props) {
// //super(props);
//  //this.state = {  }
//  //}
// render() {
// return (
// <div className="qwe">
// <div className="qwe__descript"></div>
// <div className="qwe__content"></div>
// </div>
// );
// }
// }
