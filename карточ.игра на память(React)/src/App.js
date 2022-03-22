// import logo from "./logo.svg";
import "./App.css";
// 2. импорт (себе) useState (`использовать состояние`) из react. useState - Возвращает значение с сохранением состояния и функцию для его обновления
import { useState } from "react";

// массив src img
const cardImages = [
  { src: "/img/card1-1.png" },
  { src: "/img/card2-1.png" },
  { src: "/img/card3-1.png" },
  { src: "/img/card4-1.png" },
  { src: "/img/card5-1.png" },
  { src: "/img/card6-1.png" },
  { src: "/img/card7-1.png" },
  { src: "/img/card8-1.png" },
  { src: "/img/card9-1.png" },
  { src: "/img/cover.png" },
];

function App() {
  // 2. перем. массива cards и setCards (`набор карт`) приравниваем к useState с массивом
  const [cards, setCards] = useState([]);
  // 2. перем. массива turns (`переворот`) и setTurns (`набор переворотов`) приравниваем к useState с 0
  const [turns, setTurns] = useState(0);

  // 2. shuffle cards (`тасовать карты`)
  const shuffleCards = () => {
    // перем shuffleCards (`тасовать карты`) это массив который с помошью spread (... оператора расширения) создаёт 2 копии массива src img
    const shuffledCards = [...cardImages, ...cardImages]
      // sort(`сортировка`) random - 0.5. ??? зачем 0.5 хз
      .sort(() => Math.random() - 0.5)
      // map (Вызывает определенную функцию обратного вызова для каждого элемента массива и возвращает массив, содержащий результаты). Вызов fn для card, созд массив и random проставл id
      .map((card) => ({ ...card, id: Math.random() }));

    // для набора карт вызов shuffledCards с 2мя дублями массива src img, рандомным пербором и рандомной проставкой id
    setCards(shuffledCards);
    setTurns(0);
  };

  // в консоль выводим по 2 эл карты src img и их id переворота
  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {/* <button >New Game</button> */}
      {/* 2. по клик вызов shuffleCards*/}
      <button onClick={shuffleCards}>New Game</button>
      {/* до редачить */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
