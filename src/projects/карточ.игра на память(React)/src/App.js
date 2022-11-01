// import logo from "./logo.svg";
import "./App.css";
// 2. импорт (себе) useState (`использовать состояние`) из react. useState - Возвращает значение с сохранением состояния и функцию для его обновления
import { useState, useEffect } from "react";
// 4. компонент SingleCard
import SingleCard from "./components/SingleCard";

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
  // 2. масс.сост. перетасовынных карт
  // ??? разобраться что за массивы
  const [cards, setCards] = useState([]);
  // 2. сост. числа переворотов
  const [turns, setTurns] = useState(0);
  // 5. сост. карт - `выборОдин` и `выборДва`
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // в консоль выводим по 2 эл карты src img и их id переворота
  // console.log("cards ", cards);
  // console.log("turns ", turns);

  // 2. shuffle cards (`тасовать карты`)
  const shuffleCards = () => {
    // перем shuffleCards (`тасовать карты`) это массив который с помошью spread (... оператора расширения) создаёт 2 копии массива src img
    const shuffledCards = [...cardImages, ...cardImages]
      // sort(`сортировка`) random - 0.5. ??? зачем 0.5 хз
      .sort(() => Math.random() - 0.5)
      // map (Вызывает определенную функцию обратного вызова для каждого элемента массива и возвращает массив, содержащий результаты). Вызов fn для card, созд массив и random проставл id
      .map((card) => ({ ...card, id: Math.random() }));

    // для набора карт вызов shuffledCards с 2мя дублями массива src.img, рандомным пербором и рандомной проставкой id
    setCards(shuffledCards);
    // сброс числа переворотов
    setTurns(0);
  };

  // 6. Сравните 2 выбранных карты
  useEffect(
    () => {
      // сравн.ток. е/и есть оба значения
      if (choiceOne && choiceTwo) {
        // при совпад. путей
        if (choiceOne.src === choiceTwo.src) {
          console.log("карты совпадают ", choiceOne.src, " = ", choiceTwo.src);
          // вызов сброса
          resetTurn();
        } else {
          console.log(
            "карты НЕ совпадают ",
            choiceOne.src,
            " != ",
            choiceTwo.src
          );
          resetTurn();
        }
      }
    },
    // обе карты в масс.зависим. для отслеж.измен.
    [choiceOne, choiceTwo]
  );

  // 5. `сделать выбор`. вывод карты, е/и choiceOne`выбор один` true то запись в `выбор два` иначе в один
  const handleChoice = (card) => {
    // ? менят выбраную карту
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // 6. Сбросить выбора карт и увелич. число оборотов
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    // возвращаем div.App с заголовком, кнп с атр запуск fn()shuffleCards, div.card-grid
    <div className="App">
      <h1>Magic Match</h1>
      {/* <button >New Game</button> */}
      {/* 2. по клик вызов shuffleCards*/}
      <button onClick={shuffleCards}>New Game</button>

      {/* 3. Добыв div.card-grid, где для кажой card + div.card.key.card.id > img.front.src.card,  img.back.src.cover.png */}
      <div className="card-grid">
        {cards.map((card) => (
          // 4. div.card убрали в SingleCard.js
          // в компонент SingleCard передаём card с id
          // 5. передаём handleChoice
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>

      {/* до редачить. 0 */}
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
