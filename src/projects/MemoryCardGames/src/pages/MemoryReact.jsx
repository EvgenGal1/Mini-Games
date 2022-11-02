import React from "react";
// 2. импорт useState // 6. useEffect
import { useState, useEffect } from "react";
// 4. компонент `Одиночная карта`
import SingleCard from "../components/SingleCard";

// import "./MemoryReact.scss";

export const MemoryReact = () => {
  // массив src img
  const cardImages = [
    // 7. + св-во `соответствует` с false для сравнения 2х карт
    { src: require("../img/card1-1.png"), matched: false },
    { src: require("../img/card2-1.png"), matched: false },
    { src: require("../img/card3-1.png"), matched: false },
    { src: require("../img/card4-1.png"), matched: false },
    { src: require("../img/card5-1.png"), matched: false },
    { src: require("../img/card6-1.png"), matched: false },
    { src: require("../img/card7-1.png"), matched: false },
    { src: require("../img/card8-1.png"), matched: false },
    { src: require("../img/card9-1.png"), matched: false },
    { src: require("../img/card10-1.png"), matched: false },
  ];

  // 2. масс.сост. перетасовынных карт
  // ??? разобраться что за массивы
  const [cards, setCards] = useState([]);
  // 2. сост. числа переворотов
  const [turns, setTurns] = useState(0);
  // 5. сост. карт - `выборОдин` и `выборДва`
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // 10. стат. разрешения переворота (при 2х откр.картах)
  const [disabled, setDisabled] = useState(false);

  // EG. сост. верные повороты
  const [truTurns, setTruTurns] = useState(0);
  // вычисляем % прогреса ч/з шаг, кол-во вопросов и округление
  const percentTage = Math.round((truTurns / cardImages.length) * 100);
  // сост. показа настроек
  const [settingGame, setSettingGame] = useState(false);

  // 2. `тасовать карты` - запуск игры
  const shuffleCards = () => {
    // перем shuffleCards (`тасовать карты`) это массив который с помошью spread (... оператора расширения) создаёт 2 копии массива src img
    const shuffledCards = [...cardImages, ...cardImages]
      // sort(`сортировка`) random - 0.5. ??? зачем 0.5 хз
      .sort(() => Math.random() - 0.5)
      // map (Вызывает определенную функцию обратного вызова для каждого элемента массива и возвращает массив, содержащий результаты). Вызов fn для card, созд массив и random проставл id
      .map((card) => ({ ...card, id: Math.random() }));

    // 11. сброс карт на случай выбраной одной при новом старте
    setChoiceOne(null);
    setChoiceTwo(null);
    // 2. для набора карт вызов shuffledCards с 2мя дублями массива src.img, рандомным пербором и рандомной проставкой id
    setCards(shuffledCards);
    // сброс числа переворотов
    setTurns(0);
    // сброс числа верных карт
    setTruTurns(0);
  };

  // 6. сравнение 2х выбранных карты
  useEffect(
    () => {
      // сравн.ток. е/и есть оба значения
      if (choiceOne && choiceTwo) {
        // 10. откл. возмож. переворота при 2х других картах
        setDisabled(true);
        // при совпад. путей у обеих карт
        if (choiceOne.src === choiceTwo.src) {
          // console.log("карты совпадают ", choiceOne.src, " = ", choiceTwo.src);
          // 7. в fn установки карт передаём предыдущ.сост.
          setCards((prevCards) => {
            // перебор пред.сост.
            return prevCards.map((card) => {
              // е/и пути эл.итерац. и выбраных карт совпадают
              if (card.src === choiceOne.src) {
                // EG. к верным картам + 1
                // setTruTurns((prevTurns) => prevTurns + 1); // прибавлял по 2 и 4 числа
                setTruTurns(truTurns + 1);
                // 7. в нов.масс.сост.возвращ. `соответствие` true (по 2 карты)
                return { ...card, matched: true };
              } else {
                // е/и пути не совпад, возвращ просто масс
                return card;
              }
            });
          });
          // 6. вызов сброса
          resetTurn();
        }
        // е/и пути не совпали
        else {
          // console.log("карты НЕ совпадают ",choiceOne.src," != ", choiceTwo.src);
          // задержка для показа разных картах
          setTimeout(
            () =>
              // 6. вызов сброса
              resetTurn(),
            500
          );
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
    // 10. вкл. возмж. перреворота др.карт
    setDisabled(false);
  };

  // 11. авто запуск игры
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="MemoryReact">
      <div className="MemoryReact__descript">{/* MemoryReact__descript */}</div>
      <div className="MemoryReact__content">
        {/* // возвращаем div.App с заголовком, кнп с атр запуск fn()shuffleCards, div.card-grid */}
        <h1>Magic Match</h1>
        {/* <button >New Game</button> */}
        {/* 2. по клик вызов shuffleCards*/}
        <button className="btn-single" onClick={shuffleCards}>
          Новая игра
        </button>
        {/* 3. Добыв div.card-grid, где для кажой card + div.card.key.card.id > img.front.src.card,  img.back.src.cover.png */}
        <div className="card-grid">
          {cards.map((card) => (
            // 4. div.card убрали в SingleCard.js
            // в компонент SingleCard передаём card с id
            // 5. передаём handleChoice
            // 8. флаг переворота карты = е/и эл.итерац. = 1му|2ум выбору, или они равны
            // 10. флаг `отключения` от переворота (для задержки при 2х откр.картах)
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <button
          className="btn-single"
          onClick={() => setSettingGame((prev) => !prev)}
        >
          {settingGame ? "Меньше" : "Больше"}
        </button>
        <div className="settingGame">
          <button
            className="btn-single"
            onClick={() => setSettingGame((prev) => !prev)}
          >
            {settingGame ? "Меньше" : "Больше"}
          </button>
          {settingGame ? (
            <>
              {/* 11. кол-во повторов */}
              <p className="turns">Общее количество повторов: {turns}</p>
              <br />
              <div className="progress">
                {/* <p>Прогресс успешных</p> */}
                <div
                  // отраж прогрес бар в %
                  style={{ width: `${percentTage}%` }}
                  className="progress__inner"
                ></div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
// export {MemoryReact}
