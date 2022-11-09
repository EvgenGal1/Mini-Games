import React from "react";
// 2. импорт useState // 6. useEffect
import { useState, useEffect } from "react";
// 4. компонент `Одиночная карта`
import SingleCard from "../components/SingleCard";
// UI один.кнп.
import { BtnSingle } from "../../../../Components/ui/BtnSingle";

// import "./MemoryReact.scss"; // попытка использ.mixin напрямую - не получ. - падает в ошб. иза неизвестн.формул mixin (steles.scss подкл. и в index.js и в html)

// встроенные стили
const styleSettGame = {
  Experts: { marginBottom: "20px" /* paddingBottom: "10px" */ },
};
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

// пробы LS для игроков ----------------------------------------------------------------------------------
// !!! https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage
// function recordResults({ time }) {
const recordResults = ({ time }) => {
  console.log("time aE ", time);
  // Проанализируйте любой JSON, ранее хранящийся в Allentries
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if (existingEntries == null) existingEntries = [];
  // if (existingEntries == null) existingEntries = [{}];
  // var entryTitle = document.getElementById("entryTitle").value;
  // var entryText = document.getElementById("entryText").value;
  var entry = {
    time: time,
    // title: entryTitle,
    // text: entryText,
  };
  localStorage.setItem("entry", JSON.stringify(entry));
  // Сохраните Allentries обратно в местное хранение
  existingEntries.push(entry);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};
// пробы LS для игроков ----------------------------------------------------------------------------------

// секундомер
function StopWatch(props) {
  console.log("props.time ", props.time);
  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}
// const StopWatch = ({ time }) => {
//   console.log("props.time ", time);
//   return (
//     <div className="timer">
//       <span className="digits">
//         {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
//       </span>
//       <span className="digits">
//         {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
//       </span>
//       <span className="digits mili-sec">
//         {("0" + ((time / 10) % 100)).slice(-2)}
//       </span>
//     </div>
//   );
// };

// Вывод результата
const Result = ({ turns, time, percentTage }) => {
  // const Result = ({ turns, time, percentTage: { percentTage } }) => {
  // const Result = ({
  //   turns: { turns },
  //   time: { time },
  //   percentTage: { percentTage },
  // }) => {
  // const Result = ({
  //   memoValue: { turns },
  //   memoValue: { time },
  //   memoValue: { percentTage },
  // }) => {
  console.log("time R ", time);
  return (
    <div className="result">
      <div className="attribut">
        Игрок : <span className="digits">{`пока пусто`}</span>
      </div>
      <div className="attribut">
        Общее количество шагов: <span className="digits">{turns}</span>
      </div>
      <div className="attribut">
        Необходимое кол-во шагов:{" "}
        <span className="digits">{cardImages.length}</span>
      </div>
      <div className="attribut">
        Выйграно со временем:
        {/* <StopWatch time={time} /> */}
        <StopWatchMemo time={time} />
      </div>
      <div className="progress">
        <div
          // отраж прогрес бар в %
          style={{ width: `${percentTage}%` }}
          className="progress__inner"
        ></div>
      </div>
    </div>
  );
};

// пробы memo ----------------------------------------------------------------------------------
// !!! https://habr.com/ru/company/timeweb/blog/684718/
// const ChildMemo = React.memo(Child);
const StopWatchMemo = React.memo(StopWatch);
const ResultMemo = React.memo(Result);
// пробы memo ----------------------------------------------------------------------------------

export const MemoryReact = () => {
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

  // секундомер ----------------------------------------------------------------------------------
  // старт таймера (запус через пай=узу на откр первой карты)
  // const [isActiveS, setIsActiveS] = useState(false);
  // пауза
  const [isPausedS, setIsPausedS] = useState(true);
  // время секундомера
  const [time, setTime] = useState(0);
  // откр. 1ой карты (старт таймера)
  const [openOneCard, setOpenOneCard] = useState(false);

  // EG. ----------------------------------------------------------------------------------
  // сост. верные повороты
  const [truTurns, setTruTurns] = useState(0);
  // вычисляем % прогреса ч/з шаг, кол-во вопросов и округление
  const percentTage = Math.round((truTurns / cardImages.length) * 100);
  // ? сост. показа настроек (ч/з спойлер)
  // const [settingGame, setSettingGame] = useState(false);
  // результат (ч/з спойлер)
  const [result, setResult] = useState(false);
  // спойлер на настройки
  const [openClass, setOpenClass] = useState("section");

  // 2. ЗАПУСК ИГРЫ (`тасовать карты`) ----------------------------------------------------------------------------------
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
    // 2. для набора карт вызов shuffledCards с 2мя дублями массива src.img, рандомным перебором и рандомной проставкой id
    setCards(shuffledCards);
    // сброс числа переворотов
    setTurns(0);
    // сброс числа верных карт
    setTruTurns(0);
    // сброс результата
    setResult(false);
    // сброс в начало
    handleReset();
    // закрыть "Больше"
    setOpenClass("section");
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
          // задержка для показа разных картах
          setTimeout(
            () =>
              // 6. вызов сброса
              resetTurn(),
            300
          );
        }
      }
    },
    // обе карты и верно откр.карты в масс.зависим. для отслеж.измен.
    [choiceOne, choiceTwo, truTurns]
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
    // 10. вкл. возмж. перреворота др.карт
    setDisabled(false);
    // ? описать
    setTurns((prevTurns) => prevTurns + 1);
  };

  // 11. авто запуск игры
  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  // секундомер ----------------------------------------------------------------------------------
  const handleStart = () => {
    setIsPausedS(false);
  };
  const handlePauseResume = () => {
    setIsPausedS(true);
  };
  const handleReset = () => {
    setIsPausedS(true);
    setTime(0);
  };
  // отслеж. для секундомера
  useEffect(() => {
    if (choiceOne) {
      setOpenOneCard(true);
      setResult(false);
      handleStart();
    }
    let interval = null;
    if (openOneCard && isPausedS === false) {
      handleStart();
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    if (cardImages.length === truTurns) {
      handlePauseResume();
      setOpenClass("section open");
      setResult(true);
      setOpenOneCard(false);
      recordResults({ time });
      console.log("time uF S ", time);
      // handleReset();
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPausedS, choiceOne, openOneCard, truTurns, time]);

  // memo ----------------------------------------------------------------------------------
  const percentTageMemo = React.useMemo(
    () => ({ percentTage: percentTage }),
    []
  );

  return (
    <div className="MemoryReact">
      <div className="MemoryReact__descript">{/* MemoryReact__descript */}</div>
      <div className="MemoryReact__content">
        <h1>Magic Match</h1>
        {/* 2. по клик вызов shuffleCards*/}
        <BtnSingle name1={"Новая Игра"} onClikBtn={shuffleCards} />
        {/* 3. Поле Игры. перебор cards где для кажой card + div.SingleCard */}
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
        {/* Настройки/Результат  */}
        <div className="settingGame" style={styleSettGame.Experts}>
          <div className={`settingGame__content ${openClass}`}>
            <h1
              onClick={() =>
                setOpenClass(
                  openClass === "section" ? "section open" : "section"
                )
              }
            >
              {openClass === "section" ? "Больше" : "Меньше"}
            </h1>
            {/* <Result turns={turns} time={time} percentTage={percentTage} /> */}
            <ResultMemo
              // // openClass={openClass}
              // // setOpenClass={setOpenClass}
              turns={turns}
              time={time}
              percentTage={percentTage}
              // percentTage={percentTageMemo}
            />
            <div>
              Доработка:
              <p>
                Ввести систему игроков. Скорее всего проверка зареганых userов,
                если нет то noName. Результат вноситься в массив ~10 лучших.
              </p>
              <p>
                Продумать добавление ника к noName (когда?, нужно ли?, как? -
                promt, forma)
              </p>
              <p>
                Массив лучше хран./откр. отдельно. В массиве лучших, 10 позиций,
                каждый имеет:
              </p>
              <p>
                ник(редачить), общ.счёт, раскрыв.(время,кол-во общ. и точных
                ходов, может кол-во игр).
              </p>
              <p>
                Придумать высчитывание общего счёта (~ время(ms) + (общ.х -
                точн.х))
              </p>
              <p>
                В конце каждой игры, перебор./сортиров масс. на камс. кол-во
                счета из всех + 1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export {MemoryReact}
