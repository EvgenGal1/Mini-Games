import React from "react";

export const CardMemoryGameCodePen = () => {
  // ! КОД переведен с jQuery на JS. Надо подстроить по React.
  // Например ошб. - Failed to execute 'querySelector' on 'Document'(Не удалось выполнить «querySelector» в «Документе») можно попробовать решить повесив ref
  // // document.querySelector(function () {
  function set(key, value) {
    localStorage.setItem(key, value);
  }
  function get(key) {
    return localStorage.getItem(key);
  }
  function increase(el) {
    set(el, parseInt(get(el)) + 1);
  }
  function decrease(el) {
    set(el, parseInt(get(el)) - 1);
  }

  var toTime = function (nr) {
    if (nr === "-:-") return nr;
    else {
      var n = " " + nr / 1000 + " ";
      return n.substr(0, n.length - 1) + "s";
    }
  };

  function updateStats() {
    document
      .querySelector("#stats")
      .html(
        '<div className="padded"><h2>Figures: <span>' +
          "<b>" +
          get("flip_won") +
          "</b><i>Won</i>" +
          "<b>" +
          get("flip_lost") +
          "</b><i>Lost</i>" +
          "<b>" +
          get("flip_abandoned") +
          "</b><i>Abandoned</i></span></h2>" +
          "<ul><li><b>Лучш. лёгкий:</b> <span>" +
          toTime(get("flip_casual")) +
          "</span></li>" +
          "<li><b>Лучш. средний:</b> <span>" +
          toTime(get("flip_medium")) +
          "</span></li>" +
          "<li><b>Лучш. Тяжёлый:</b> <span>" +
          toTime(get("flip_hard")) +
          "</span></li></ul>" +
          "<ul><li><b>Total Flips:</b> <span>" +
          parseInt(
            (parseInt(get("flip_matched")) + parseInt(get("flip_wrong"))) * 2
          ) +
          "</span></li>" +
          "<li><b>Matched Flips:</b> <span>" +
          get("flip_matched") +
          "</span></li>" +
          "<li><b>Wrong Flips:</b> <span>" +
          get("flip_wrong") +
          "</span></li></ul></div>"
      );
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // стартовый экран
  function startScreen(text) {
    document.querySelector("#g").removeAttr("class").empty();
    document.querySelector(".logo").fadeIn(250);

    document.querySelector(".c1").text(text.substring(0, 1));
    document.querySelector(".c2").text(text.substring(1, 2));
    document.querySelector(".c3").text(text.substring(2, 3));
    document.querySelector(".c4").text(text.substring(3, 4));

    // If won game (`Если выиграл игру`)
    if (text === "nice") {
      increase("flip_won");
      decrease("flip_abandoned");
    }

    // If lost game (`Если проиграна игра`)
    else if (text === "fail") {
      increase("flip_lost");
      decrease("flip_abandoned");
    }

    // Update stats (`Обновить статистику`)
    updateStats();
  }

  // /* LOAD GAME ACTIONS */ `ЗАГРУЗИТЬ ИГРОВЫЕ ДЕЙСТВИЯ */`;

  // Init localStorage (`Инициировать локальное хранилище`)
  if (!get("flip_won") && !get("flip_lost") && !get("flip_abandoned")) {
    //Overall Game stats (`Общая статистика игр`)
    set("flip_won", 0);
    set("flip_lost", 0);
    set("flip_abandoned", 0);
    //Best times (`Лучшие времена`)
    set("flip_casual", "-:-");
    set("flip_medium", "-:-");
    set("flip_hard", "-:-");
    //Cards stats (`Статистика карт`)
    set("flip_matched", 0);
    set("flip_wrong", 0);
  }

  // Fill stats (`Заполнить статистику`)
  if (
    get("flip_won") > 0 ||
    get("flip_lost") > 0 ||
    get("flip_abandoned") > 0
  ) {
    updateStats();
  }

  // Toggle start screen cards (`Переключить карточки начального экрана`)
  document
    .querySelector('.logo .card:not(".twist")')
    .addEventListener("click", function (e) {
      document
        .querySelector(this)
        .classList.toggle("active")
        .siblings()
        .not(".twist")
        .classList.remove("active");
      if (document.querySelector(e.target).is(".playnow")) {
        document.querySelector(".logo .card").last().classList.add("active");
      }
    });

  // Start game (`Начать игру`)
  document.querySelector(".play").addEventListener("click", function () {
    increase("flip_abandoned");
    document.querySelector(".info").fadeOut();

    var difficulty = "",
      timer = 1000,
      level = document.querySelector(this).data("level");

    // Set game timer and difficulty (`Установить таймер и сложность игры`)
    if (level == 8) {
      difficulty = "casual";
      timer *= level * 6;
    } else if (level == 18) {
      difficulty = "medium";
      timer *= level * 7;
    } else if (level == 32) {
      difficulty = "hard";
      timer *= level * 8;
    }

    document.querySelector("#g").classList.add(difficulty);

    document.querySelector(".logo").fadeOut(250, function () {
      // var startGame = $.now(),
      var startGame = Date.now(),
        obj = [];

      // Create and add shuffled cards to game (`Создавайте и добавляйте перетасованные карты в игру`)
      for (var i = 0; i < level; i++) {
        obj.push(i);
      }

      // var shu = shuffle($.merge(obj, obj)),
      var shu = shuffle([...obj, ...obj]),
        cardSize = 100 / Math.sqrt(shu.length);

      for (i = 0; i < shu.length; i++) {
        var code = shu[i];
        if (code < 10) code = "0" + code;
        if (code === 30) code = 10;
        if (code === 31) code = 21;
        document
          .querySelector(
            '<div className="card" style="width:' +
              cardSize +
              "%;height:" +
              cardSize +
              '%;">' +
              '<div className="flipper"><div className="f"></div><div className="b" data-f="&#xf0' +
              code +
              ';"></div></div>' +
              "</div>"
          )
          .appendTo("#g");
      }

      // Set card actions (`Установить действия карты`)
      document.querySelector("#g .card").addEventListener({
        mousedown: function () {
          if (document.querySelector("#g").attr("data-paused") == 1) {
            return;
          }
          var data = document
            .querySelector(this)
            .classList.add("active")
            .querySelector(".b")
            .attr("data-f");

          if (
            document.querySelector("#g").querySelector(".card.active").length >
            1
          ) {
            setTimeout(function () {
              var thisCard = document.querySelector(
                "#g .active .b[data-f=" + data + "]"
              );

              if (thisCard.length > 1) {
                thisCard
                  .parents(".card")
                  .classList.toggle("active card found")
                  .empty(); //yey (`да`)
                increase("flip_matched");

                // Win game (`Выиграть игру`)
                if (!document.querySelector("#g .card").length) {
                  var time = Date.now() - startGame;
                  if (
                    get("flip_" + difficulty) === "-:-" ||
                    get("flip_" + difficulty) > time
                  ) {
                    set("flip_" + difficulty, time); // increase best score (`увеличить лучший результат`)
                  }

                  startScreen("nice");
                }
              } else {
                document
                  .querySelector("#g .card.active")
                  .classList.remove("active"); // fail (`потерпеть неудачу`)
                increase("flip_wrong");
              }
            }, 401);
          }
        },
      });

      // Add timer bar (`Добавить панель таймера`)
      document
        .querySelector('<i className="timer"></i>')
        .prependTo("#g")
        .css({
          animation: "timer " + timer + "ms linear",
        })
        .one(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend",
          function (e) {
            startScreen("fail"); // fail game (`провальная игра`)
          }
        );

      // Set keyboard (p)ause and [esc] actions (`Установить клавиатуру (p)ause и действия [esc]`)
      document
        .querySelector(window)
        .removeEventListener()
        .addEventListener("keyup", function (e) {
          // Pause game. (p) (`Пауза игры. (п)`)
          if (e.keyCode == 80) {
            if (document.querySelector("#g").attr("data-paused") == 1) {
              // was paused, now resume (`был приостановлен, теперь возобновить`)
              document.querySelector("#g").attr("data-paused", "0");
              document
                .querySelector(".timer")
                .css("animation-play-state", "running");
              document.querySelector(".pause").remove();
            } else {
              document.querySelector("#g").attr("data-paused", "1");
              document
                .querySelector(".timer")
                .css("animation-play-state", "paused");
              document
                .querySelector('<div className="pause"></div>')
                .appendTo("body");
            }
          }
          // Abandon game. (ESC) (`Отказаться от игры. (ESC)`)
          if (e.keyCode == 27) {
            startScreen("flip");
            // If game was paused (`Если игра была приостановлена`)
            if (document.querySelector("#g").attr("data-paused") == 1) {
              document.querySelector("#g").attr("data-paused", "0");
              document.querySelector(".pause").remove();
            }
            document.querySelector(window).removeEventListener();
          }
        });
    });
  });
  // // });

  return (
    <div className="CardMemoryGameCodePen">
      <div className="CardMemoryGameCodePen__descript"></div>
      <div className="CardMemoryGameCodePen__content">
        <div id="g"></div>

        <div className="logo">
          <p className="info">Нажмите на P, чтобы начать.</p>
          <div className="card left">
            <div className="flipper">
              <div className="f c1">F</div>
              <div className="b contentbox" id="stats">
                <div className="padded">
                  <h2>Участники</h2>
                  Похоже, вы еще не перевернулись.
                  <a href="/#" className="playnow">
                    Играть сейчас
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card active twist">
            <div className="flipper">
              <div className="b f">
                <div className="c2">L</div>
              </div>
            </div>
          </div>
          <div className="card left">
            <div className="flipper">
              <div className="f c3">I</div>
              <div className="b contentbox instructions">
                <div className="padded">
                  <h2>Инструкции</h2>
                  <p>
                    Нажмите [P], чтобы сделать паузу, или [ESC], чтобы
                    отказаться от игры.
                  </p>
                  <p>
                    Flip - это карточная игра на память со временем. Нажимайте
                    на зеленые карты, чтобы увидеть какие символы они скрывают,
                    и попытатайтесь найти такой же под другими картами.
                  </p>
                  <p>
                    Раскрытие двух подходящих символов одновременно, чтобы
                    исключить их из игры.
                  </p>
                  <p>
                    Устраните все карты как можно быстрее, чтобы выиграть игру.
                    Получайте удовольствие!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flipper">
              <div className="f c4">P</div>
              <div className="b contentbox levels">
                <a href="/#" data-level="8" className="play">
                  Лёгкий
                </a>
                <a href="/#" data-level="18" className="play">
                  Средний
                </a>
                <a href="/#" data-level="32" className="play">
                  Жесткий
                </a>
              </div>
            </div>
          </div>

          <p className="info">
            Flip должен работать лучше всего в Google Chrome, Firefox, IE10 и
            Опера;
          </p>
        </div>
      </div>
    </div>
  );
};
// export {CardMemoryGameCodePen}
