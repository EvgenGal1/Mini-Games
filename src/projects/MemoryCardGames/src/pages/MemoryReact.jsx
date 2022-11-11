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
  // { src: require("../img/card3-1.png"), matched: false },
  // { src: require("../img/card4-1.png"), matched: false },
  // { src: require("../img/card5-1.png"), matched: false },
  // { src: require("../img/card6-1.png"), matched: false },
  // { src: require("../img/card7-1.png"), matched: false },
  // { src: require("../img/card8-1.png"), matched: false },
  // { src: require("../img/card9-1.png"), matched: false },
  // { src: require("../img/card10-1.png"), matched: false },
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
    setOpenClass("section");
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
  // стат.получ.масс.результатов из LS (LocalStorage)
  let initialTemplateSaveLS = {
    id_1: 99999,
    userName: "userNameSaveLS",
    time: 9999,
  };
  const [saveUserResult, setSaveUserResult] = useState(
    JSON.parse(localStorage.getItem("saveUserResult")) || [
      // []
      initialTemplateSaveLS, // ! без стал прилетать undefine
    ]
  );

  // мак/мин знач ------------------------------------------------------------
  // let notless = ;
  // var min = Math.min(...saveUserResult),
  //   max = Math.max(...saveUserResult);
  // console.log("min ", min);
  // console.log("max ", max);
  // function arrayMin(arr) {
  //   return arr.reduce(function (p, v) {
  //     return p < v ? p : v;
  //   });
  // }
  // console.log("arrayMin ", arrayMin(saveUserResult));
  // function arrayMax(arr) {
  //   return arr.reduce(function (p, v) {
  //     return p > v ? p : v;
  //   });
  // }
  // console.log("arrayMin ", arrayMin(saveUserResult));
  // let LSresult = JSON.parse(localStorage.getItem("saveUserResult"));
  // console.log("LS ", LSresult);
  // if (localStorage["saveUserResult"]) {
  //   // получим из LocalStorage значение ключа «mykey» и преобразуем его с помощью метода JSON.parse() в объект
  //   const newObj = JSON.parse(localStorage["mykey"]);
  // }
  // получить все ключи в alert
  // let keys = Object.keys(localStorage);
  // for (let key of keys) {
  //   alert(`${key}: ${localStorage.getItem(key)}`);
  // }
  // перебирает localStorageпары ключ-значение
  // Object.entries(localStorage).forEach(([key, value]) => {
  // Object.entries(localStorage).forEach(([saveUserResult, value]) => {
  //   console.log(`${saveUserResult} => ${value}`);
  // });
  // for (var i = 0; i < localStorage.length; i++) {
  // $('body').append(localStorage.getItem(localStorage.key(i)));
  // console.log("перебор ", localStorage.getItem(localStorage.key(i)));
  // }
  //
  // Object.keys(localStorage).forEach(function (saveUserResult) {
  //   // console.log("перебор 2 ", localStorage.getItem(saveUserResult));
  // });
  //
  // function showItemsByKey() {
  //   var typeofKey = null;
  //   for (var key in localStorage) {
  //     typeofKey = typeof localStorage[key];
  //     // console.log("перебор 3 ", key, typeofKey);
  //   }
  // }
  // showItemsByKey();
  // не раб
  // for (var key in window.localStorage) {
  //   let val = localStorage.getItem(key);
  //   let value = val.split(","); //splitting string inside array to get name
  //   [key] = value[1]; // getting name from split string
  // }
  // мак/мин знач -----------------------------------------------------------

  const saveResult = () => {
    // const saveResult = ({ time }) => { // вызов time в fn()
    // const saveResult = React.useCallback(({ time }) => { // экспр. совет eslint. не вывез настроек
    // const saveResult = React.useMemo((time) => { // не особо помогало
    // let includ = !saveUserResult.includes(time);
    // if (!saveUserResult.includes(time)) { // альтер.варик
    // if (includ) {
    if (saveUserResult) {
      // setSaveUserResult([...saveUserResult, time]); // запись просто времени
      // let userNamePromt = prompt("Введите имя");
      let userNameSaveLS;
      if (userNameLogin) {
        userNameSaveLS = userNameLogin;
      } else {
        userNameSaveLS = prompt("Введите имя");
      } // условие в перем.
      let templateSaveLS = {
        id_1: saveUserResult.length + 1,
        userName: userNameSaveLS,
        time: time,
      };
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
      setSaveUserResult(
        // ! анакатно прописывается только при ... в двух местах
        ...saveUserResult.map((uRes) => {
          // Array.prototype.map () ожидает возврата значения в конце функции стрелки.
          console.log("uRes ", uRes);
          // ! раб на всё не практично | undefine без стат.масс по умолчан
          // if (uRes.time <= time || !uRes.time || !uRes || uRes) {
          // ! сброс всего при превышении результата по умолч | undefine без стат.масс по умолчан
          if (uRes.time >= time || !uRes.time) {
            console.log("time ", time);
            console.log("uRes.time ", uRes.time);
            // uRes.time == time ? time : uRes;
            // return time
            // return { ...saveUserResult, templateSaveLS };
            return [...saveUserResult, templateSaveLS];
            // Ожидается, что назначение или функциональный вызов и вместо этого увидел выражение.
          } else {
            // return uRes;
            // ! вроде запись выше не идёт
            return saveUserResult;
          }
        })
        // saveUserResult.map((uRes) =>
        //   uRes.time <= time || !uRes.time || !uRes ? templateSaveLS : uRes
        // )
      );
    }
  };
  //   },
  //   [saveUserResult]
  // );
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
    localStorage.setItem("saveUserResult", JSON.stringify(saveUserResult));
  }, [saveUserResult]);

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
