import React from "react";
// 2. импорт useState // 6. useEffect
import { useState, useEffect } from "react";
// 4. компонент `Одиночная карта`
import SingleCard from "../components/SingleCard";

import { BtnSingle } from "../../../../Components/ui/BtnSingle";

// import "./MemoryReact.scss";
// встроенные стили
const styleSettGame = {
  Experts: { marginBottom: "20px" /* paddingBottom: "10px" */ },
};

function TimeSr(props) {
  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.timeS / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.timeS / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.timeS / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-one btn-start" onClick={props.handleStart}>
      Start
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-two" onClick={props.handleReset}>
        Reset
      </div>
      <div className="btn btn-one" onClick={props.handlePauseResume}>
        {props.isPausedS ? "Resume" : "Pause"}
      </div>
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}

export const MemoryReact = () => {
  // массив src img
  const cardImages = [
    // 7. + св-во `соответствует` с false для сравнения 2х карт
    { src: require("../img/card1-1.png"), matched: false },
    { src: require("../img/card2-1.png"), matched: false },
    // { src: require("../img/card3-1.png"), matched: false },
    // { src: require("../img/card4-1.png"), matched: false },
    // { src: require("../img/card5-1.png"), matched: false },
    // { src: require("../img/card6-1.png"), matched: false },
    // { src: require("../img/card7-1.png"), matched: false },
    // { src: require("../img/card8-1.png"), matched: false },
    // { src: require("../img/card9-1.png"), matched: false },
    // { src: require("../img/card10-1.png"), matched: false },
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

  //  ----------------------------------------------------------------------------------
  const [isActiveS, setIsActiveS] = useState(false);
  const [isPausedS, setIsPausedS] = useState(true);
  const [timeS, setTimeS] = useState(0);
  const [openOneCard, setOpenOneCard] = useState(false);
  //  ----------------------------------------------------------------------------------

  // EG. сост. верные повороты
  const [truTurns, setTruTurns] = useState(0);
  // вычисляем % прогреса ч/з шаг, кол-во вопросов и округление
  const percentTage = Math.round((truTurns / cardImages.length) * 100);
  // сост. показа настроек
  const [settingGame, setSettingGame] = useState(false);

  // 2. ЗАПУСК ИГРЫ (`тасовать карты`)
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
    // handleStart();
    handleReset();
  };

  // 6. сравнение 2х выбранных карты
  useEffect(
    () => {
      // сравн. е/и есть оба значения
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
                console.log("truTurns 0 ", truTurns);
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
    [choiceOne, choiceTwo, truTurns]
    //  React Hook Eaffect имеет недостающую зависимость: «Truturns».Либо включите его, либо удалите массив зависимостей.Вы также можете заменить несколько переменных UsESTATE на пользовательский EDERUCER, если «SETACLARS» требует текущего значения «Truturns».
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
  //  ----------------------------------------------------------------------------------
  // !!! https://translated.turbopages.org/proxy_u/en-ru.ru.6bf96d30-6363dfd4-ac966505-74722d776562/https/www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
  // React.useEffect(() => {
  //   let interval = null;

  //   if (isActiveS && isPausedS === false) {
  //     interval = setInterval(() => {
  //       setTimeS((timeS) => timeS + 10);
  //     }, 10);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [isActiveS, isPausedS]);

  const handleStart = () => {
    setIsActiveS(true);
    setIsPausedS(false);
  };

  const handlePauseResume = () => {
    // setIsPausedS(!isPausedS);
    // setIsPausedS(false);
    setIsPausedS(true);
  };
  //  Функция «handlepauseresume» делает зависимости от использования крючков (в строке 254) на каждом рендере.Чтобы исправить это, оберните определение «handlepauseresume» в свой собственный крючок usecallback ().
  const handleReset = () => {
    setIsPausedS(true);
    setIsActiveS(false);
    setTimeS(0);
  };
  // отслеж. для секундомера
  console.log("isPausedS ", isPausedS);
  useEffect(() => {
    if (choiceOne) {
      console.log("1 ", 1);
      setOpenOneCard(true);
      handleStart();
    }
    console.log("truTurns ", truTurns);
    let interval = null;
    // console.log("cardImages.length ", cardImages.length);
    // console.log("truTurns.length ", truTurns.length);
    // if (choiceOne) {
    if (openOneCard && isPausedS === false) {
      console.log("2 ", 2);
      handleStart();
      interval = setInterval(() => {
        setTimeS((timeS) => timeS + 10);
      }, 10);
    }
    // else {
    //   clearInterval(interval);
    // }
    if (cardImages.length === truTurns) {
      console.log("9 ", 9);
      handlePauseResume();
      console.log("isPausedS ", isPausedS);
      setOpenOneCard(false);
      // handleReset();
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    isActiveS,
    isPausedS,
    cardImages.length,
    choiceOne,
    openOneCard,
    truTurns,
    // handlePauseResume,
  ]);
  // React Hook Eaffect имеет отсутствующие зависимости: «cardimages.length», «выбор», «openonecard» и «truturns».Либо включите их, либо удалите массив зависимостей.
  //  ----------------------------------------------------------------------------------

  return (
    <div className="MemoryReact">
      <div className="MemoryReact__descript">{/* MemoryReact__descript */}</div>
      <div></div>
      <div className="stop-watch">
        <TimeSr timeS={timeS} />
        <ControlButtons
          active={isActiveS}
          isPausedS={isPausedS}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
        />
      </div>
      <div className="MemoryReact__content">
        {/* //  ---------------------------------------------------------------------------------- */}
        {/* // возвращаем div.App с заголовком, кнп с атр запуск fn()shuffleCards, div.card-grid */}
        <h1>Magic Match</h1>
        {/* <button >New Game</button> */}
        {/* 2. по клик вызов shuffleCards*/}
        {/* <button className="btn-single" onClick={shuffleCards}>
          Новая игра
        </button> */}
        <BtnSingle
          name1={"Новая Игра"}
          // name2={"Меньше"}
          // stBtn={settingGame}
          // setStBtn={setSettingGame}
          onClikBtn={shuffleCards}
        />
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
        <div
          className="settingGame"
          // style={styleSett}
          style={styleSettGame.Experts}
        >
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
          <BtnSingle
            name1={"Меньше"}
            name2={"Больше"}
            stBtn={settingGame}
            setStBtn={setSettingGame}
          />
        </div>
      </div>
    </div>
  );
};
// export {MemoryReact}
