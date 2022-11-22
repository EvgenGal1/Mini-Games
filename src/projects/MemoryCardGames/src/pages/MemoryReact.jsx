import React from "react";
// 2. импорт useState // 6. useEffect
import { useState, useEffect } from "react";
// 4. компонент `Одиночная карта`
import SingleCard from "../components/SingleCard";
// UI один.кнп.
import { BtnSingle } from "../../../../Components/ui/BtnSingle";

// import "./MemoryReact.scss"; // попытка использ. mixin напрямую - не получ. - падает в ошб. иза неизвестн.формул mixin (steles.scss подкл. и в index.js и в html)

// встроенные стили
const styleSettGame = {
  Experts: { marginBottom: "20px" /* paddingBottom: "10px" */ },
};
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

// секундомер
function StopWatch(props) {
  // console.log("props.time ", props.time);
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

// Вывод результата
const Result = ({ turns, time, percentTage }) => {
  // console.log("time R ", time);
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

// memo ----------------------------------------------------------------------------------
// !!! https://habr.com/ru/company/timeweb/blog/684718/
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
  // пауза
  const [isPausedS, setIsPausedS] = useState(true);
  // время секундомера
  const [time, setTime] = useState(0);
  // откр. 1ой карты (старт таймера)(откл. - старт при откл. паузы)
  const [openOneCard, setOpenOneCard] = useState(false);

  // EG. ----------------------------------------------------------------------------------
  // сост. верные повороты
  const [truTurns, setTruTurns] = useState(0);
  // вычисляем % прогреса ч/з - верн.повороты / кол-во карт и * для округления
  const percentTage = Math.round((truTurns / cardImages.length) * 100);
  // спойлер на настройки
  const [openClass, setOpenClass] = useState("section");
  // признак залогированного usera
  const [userNameLogin, setUserNameLogin] = useState(false);
  // стат.получ.масс.результатов из LS (LocalStorage)
  let initialTemplateSaveLS = {
    id_1: 0,
    userName: "0",
    // time: 9999,
    time: cardImages.length * 2000,
  };
  const [saveUserResult, setSaveUserResult] = useState(
    JSON.parse(localStorage.getItem("saveUserResult")) ||
      [
        // []
        // initialTemplateSaveLS, // ! без стал прилетать undefine
      ]
  );
  // массив минимального времени
  // var arrMaxTime = [];
  const [arrMaxTime, setArrMaxTime] = useState([]);

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
    // сбос секундомера
    setTime(0);
    // сброс числа переворотов
    setTurns(0);
    // сброс числа верных карт
    setTruTurns(0);
    // закрыть "Больше"
    setOpenClass("section open");
    // откл. паузу
    setIsPausedS(true);
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

  // 6. Сбросить выбор карт, вкл.поворота и увелич. число оборотов
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    // 10. вкл. возмж. перреворота др.карт
    setDisabled(false);
    // ? описать
    setTurns((prevTurns) => prevTurns + 1);
  };

  // 11. авто запуск игры (откл от лишнего рендера)
  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  // секундомер ----------------------------------------------------------------------------------
  // отслеж. для секундомера
  useEffect(() => {
    if (choiceOne) {
      setOpenOneCard(true);
      setIsPausedS(false);
    }
    let interval = null;
    if (openOneCard && isPausedS === false) {
      setIsPausedS(false);
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    if (cardImages.length === truTurns) {
      setIsPausedS(true);
      setOpenOneCard(false);
      setOpenClass("section open");
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPausedS, choiceOne, openOneCard, truTurns]);

  // LocalStorage для сохр. результатов игроков ----------------------------------------------------------------------------------
  // !!! https://codesandbox.io/s/competent-darwin-zg4p4?file=/src/App.js
  // !!! https://www.mousedc.ru/learning/522-massiv-steyt-react/
  // !!! https://www.cluemediator.com/usestate-with-an-array-in-react-hooks
  // !!! https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage

  // ! много полезного - https://www.mousedc.ru/learning/523-forma-dobavlenie-udalenie-izmenenie-element-steyt-react/
  // ! https://www.mousedc.ru/learning/523-forma-dobavlenie-udalenie-izmenenie-element-steyt-react/
  const saveResult = () => {
    // const saveResult = ({ time }) => { // вызов time в fn()
    // const saveResult = React.useCallback(({ time }) => { // экспр. совет eslint. не вывез настроек
    // const saveResult = React.useMemo((time) => { // не особо помогало
    // let includ = !saveUserResult.includes(time);
    // if (!saveUserResult.includes(time)) { // альтер.варик
    // if (includ) {
    // if (saveUserResult) {
    // setSaveUserResult([...saveUserResult, time]); // запись просто времени
    // let userNamePromt = prompt("Введите имя");
    let userNameSaveLS;
    if (userNameLogin) {
      userNameSaveLS = userNameLogin;
    } else {
      userNameSaveLS = prompt("Введите имя");
    } // условие в перем.
    let templateSaveLS = {
      id_1: saveUserResult.length, // при стате saveUserResult с умолчанием
      // id_1: saveUserResult.length + 1, // при пустом стате saveUserResult
      userName: userNameSaveLS,
      time: time,
    };
    // массив минимального времени
    // var arrMaxTime = [];
    var max = Math.max(arrMaxTime);
    console.log("max 1", max);
    // setSaveUserResult((saveUserResult) => [
    //   ...saveUserResult,
    //   templateSaveLS,
    //   // коммит
    //   // { templateSaveLS },
    //   // {
    //   //   id_1: saveUserResult.length + 1, // к длине + 1 (1 для index 0)
    //   //   userName: userNameSaveLS, // userName: prompt("Введите имя"), // prompt напрямую
    //   //   time: time,
    //   // рандомные id: и key={}
    //   // id_2: new Date().getMilliseconds(), // 3 числа до 1к (милисек. от даты 01.01.1970)
    //   // id_3: Math.random().toString().substring(2, 5), // рандом 3 числа после нуля
    //   // id_4: prevItems.length + 1 + Math.random().toString().substring(2, 5), // к длине + 1 + рандом 3 цифры
    //   // },
    // ]);
    // ! было оч. близко. проблемы в непереборе е/и масс. пуст. е/и добав в масс по умолч объ. то в ошб. - нет fn map или подобное
    // мак/мин знач ------------------------------------------------------------
    console.log("template ", templateSaveLS);
    console.log("saveUserResult.length ", saveUserResult.length);
    if (saveUserResult.length === 0) {
      // ! не заходит в условие
      console.log("111 ", 111);
      setArrMaxTime([...arrMaxTime, time]);
      setSaveUserResult((saveUserResult) => [
        ...saveUserResult,
        templateSaveLS,
      ]);
      // setSaveUserResult(saveUserResult.length === 5);
    } else {
      // console.log("222 ", 222);
      // if (saveUserResult.length === 3) {
      //   console.log("saveUserResult.time ", saveUserResult.time);
      //   // console.log("Max:", Math.max(...saveUserResult.time));
      // }
      console.log("saveUserResult ", saveUserResult);
      // console.log("saveUserResult ", typeof saveUserResult);
      // console.log("saveUserResult ", isArray[saveUserResult]);
      setSaveUserResult(
        // ! адакатно прописывается только при ... в двух местах
        ...saveUserResult.map((uRes, index) => {
          // var arrMaxTime = [];
          // var max = Math.max(uRes.time);
          // console.log("max ", max);
          // console.log("333 ", 333);
          console.log("444 ", 444);
          // Array.prototype.map () ожидает возврата значения в конце функции стрелки.
          console.log("uRes ", uRes);
          console.log("uRes.time - time ", uRes.time, " - ", time);
          // if (saveUserResult.length < 3 && uRes.time >= time) { // е/и есть начальное значение
          if (saveUserResult.length < 3) {
            setArrMaxTime([...arrMaxTime, time]);
            console.log("555 ", 555);
            // Ожидается, что назначение или функциональный вызов и вместо этого увидел выражение
            // return templateSaveLS;
            return [...saveUserResult, templateSaveLS];
          }
          if (saveUserResult.length === 3 && uRes.time >= time) {
            console.log("666 ", 666);
            // let maxLet = uRes.index где uRes.time = max;
            // let maxLet = uRes.time = max ? uRes.index : '';
            let max = Math.max(...arrMaxTime);
            if (uRes.time === max) {
              let maxInd = uRes.time === max ? uRes.index : "";
              setArrMaxTime([...arrMaxTime.splice(index, 1, time)]);
              console.log("777 ", 777);
              console.log("index maxInd ", index, maxInd);
              saveUserResult.splice(index, 1, templateSaveLS);
              // return saveUserResult.splice(maxInd, 1, templateSaveLS);
            }
            // ! добавить уловие е/и uRes.time===time
            // let templateSaveLS2 = {
            //   id_1: saveUserResult.length, // при стате saveUserResult с умолчанием
            //   // id_1: saveUserResult.length + 1, // при пустом стате saveUserResult
            //   userName: userNameSaveLS,
            //   time: max,
            // };
            // console.log("6767 ", 6767);
            // console.log("Max:", Math.max(...saveUserResult.time));
            // if (uRes.time <= time) {
            // console.log("666 ", 666);
            // saveUserResult.splice(index, 1, templateSaveLS.time===max);
            // return [
            //   // ...saveUserResult.splice(index, 1, templateSaveLS),
            //   ...saveUserResult,
            // ];
            // return [saveUserResult.slice(0, index), templateSaveLS];
            // setSaveUserResult([
            //   ...saveUserResult.slice(0, index),
            //   templateSaveLS,
            // ]);
            // return [saveUserResult, templateSaveLS];
            // } else if (uRes.time >= time) {
            // return (
            // return [
            // saveUserResult.splice(index, 1, templateSaveLS);
            // ]; // сброс но 4000
            //setSaveUserResult([
            // ]);
            // return [...saveUserResult];
            // setSaveUserResult([
            //   saveUserResult.splice(index, 1, templateSaveLS),
            // ]); // ~ измен. ВСЕ стат. но без LS
            // return saveUserResult.splice(index, 1, templateSaveLS); // сброс но 4000
            // saveUserResult.splice(index, 1, templateSaveLS); // ~ меняет значен но во всех подходящих и в LS  не обновляет
            // Expected an assignment or function call and instead saw an expression.
            console.log("saveUserResult 4-7", saveUserResult);
            // return [...saveUserResult];
            // );
            // return;
            // Множество .прототип .map () ожидает возвращаемого значения от функции стрелки.
            // ...saveUserResult.slice(index),
            // return setSaveUserResult([
            //   ...saveUserResult.slice(2, index),
            //   templateSaveLS,
            //   // ...saveUserResult.slice(index),
            // ]); // undefined
            // return templateSaveLS;
            // return uRes = templateSaveLS; // возвращ ток последн. результат
            // uRes = templateSaveLS; // ничего не происходит
            // return [saveUserResult, templateSaveLS]; // запись всех пред. в index 0, а последн. в index 1
            // }
          }
          console.log("saveUserResult 888", saveUserResult);
          console.log("888 ", 888);
          // return uRes;
          // return [...uRes];
          // ! вроде запись выше не идёт
          // return 1;
          return saveUserResult;
          // return [...saveUserResult];
        })
      );
    }
    var max2 = Math.max(...arrMaxTime);
    console.log("max 2", max2);
    console.log("saveUserResult 999", saveUserResult);
    console.log("999 ", 999);
    // }
  };

  if (cardImages.length === truTurns) {
    setTimeout(() => {
      var max3 = Math.max(...arrMaxTime);
      console.log("max 3", max3);
      console.log("saveUserResult +++", saveUserResult);
      console.log("+++++ ");
    }, 1000);
  }

  // вызов сохранения при выйгрыше
  useEffect(() => {
    if (cardImages.length === truTurns) {
      saveResult();
      // saveResult({ time });
    }
  }, [/* saveResult, time, */ truTurns]);
  // запись в LS при изменении стата
  // let initialTemplateSaveLS = {
  //   id_1: 0,
  //   userName: "userNameSaveLS",
  //   time: 0,
  // };
  // localStorage.setItem("saveUserResult", JSON.stringify(initialTemplateSaveLS));
  useEffect(() => {
    async function f() {
      setTimeout(() => {
        localStorage.setItem("saveUserResult", JSON.stringify(saveUserResult));
      }, 1000);
    }
    f();

    // console.log("arrMaxTime ", arrMaxTime);
    // var max2 = Math.max(...arrMaxTime);
    // console.log("max 2", max2);
  }, [saveUserResult /* setSaveUserResult */, arrMaxTime]);

  // memo для отд. props. не получилось прописать ----------------------------------------------------------------------------------
  // const percentTageMemo = React.useMemo(
  //   () => ({ percentTage: percentTage }),
  //   []
  // );

  return (
    <div className="MemoryReact">
      <div className="MemoryReact__descript">{/* MemoryReact__descript */}</div>
      <div className="MemoryReact__content">
        <h1>Magic Match</h1>
        {/* 2. по клик вызов shuffleCards*/}
        <BtnSingle name1={"Новая Игра"} onClikBtn={shuffleCards} />
        {/* 3. Поле Игры. перебор cards где для кажой card + div.SingleCard */}
        <div className="card-grid container">
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
        {/* // список победителей */}
        {cardImages.length === truTurns && (
          <div>
            {saveUserResult.map((card, id, index) => (
              <div
                // key={new Date().getMilliseconds()} // рядом повтор
                key={Math.random().toString().substring(2, 5)}
              >
                <p>
                  {card.userName} - <span>{card.time}</span>
                </p>
              </div>
            ))}
          </div>
        )}
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
            {/* защита от лишнего рендера */}
            {/* <Result turns={turns} time={time} percentTage={percentTage} /> */}
            <ResultMemo
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
