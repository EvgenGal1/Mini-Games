$(function () {
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
    if (nr == "-:-") return nr;
    else {
      var n = " " + nr / 1000 + " ";
      return n.substr(0, n.length - 1) + "s";
    }
  };

  function updateStats() {
    $("#stats").html(
      '<div class="padded"><h2>Figures: <span>' +
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

  function startScreen(text) {
    $("#g").removeAttr("class").empty();
    $(".logo").fadeIn(250);

    $(".c1").text(text.substring(0, 1));
    $(".c2").text(text.substring(1, 2));
    $(".c3").text(text.substring(2, 3));
    $(".c4").text(text.substring(3, 4));

    // If won game (`Если выиграл игру`)
    if (text == "nice") {
      increase("flip_won");
      decrease("flip_abandoned");
    }

    // If lost game (`Если проиграна игра`)
    else if (text == "fail") {
      increase("flip_lost");
      decrease("flip_abandoned");
    }

    // Update stats (`Обновить статистику`)
    updateStats();
  }

  /* LOAD GAME ACTIONS */ `ЗАГРУЗИТЬ ИГРОВЫЕ ДЕЙСТВИЯ */`;

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
  $('.logo .card:not(".twist")').on("click", function (e) {
    $(this)
      .toggleClass("active")
      .siblings()
      .not(".twist")
      .removeClass("active");
    if ($(e.target).is(".playnow")) {
      $(".logo .card").last().addClass("active");
    }
  });

  // Start game (`Начать игру`)
  $(".play").on("click", function () {
    increase("flip_abandoned");
    $(".info").fadeOut();

    var difficulty = "",
      timer = 1000,
      level = $(this).data("level");

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

    $("#g").addClass(difficulty);

    $(".logo").fadeOut(250, function () {
      var startGame = $.now(),
        obj = [];

      // Create and add shuffled cards to game (`Создавайте и добавляйте перетасованные карты в игру`)
      for (i = 0; i < level; i++) {
        obj.push(i);
      }

      var shu = shuffle($.merge(obj, obj)),
        cardSize = 100 / Math.sqrt(shu.length);

      for (i = 0; i < shu.length; i++) {
        var code = shu[i];
        if (code < 10) code = "0" + code;
        if (code == 30) code = 10;
        if (code == 31) code = 21;
        $(
          '<div class="card" style="width:' +
            cardSize +
            "%;height:" +
            cardSize +
            '%;">' +
            '<div class="flipper"><div class="f"></div><div class="b" data-f="&#xf0' +
            code +
            ';"></div></div>' +
            "</div>"
        ).appendTo("#g");
      }

      // Set card actions (`Установить действия карты`)
      $("#g .card").on({
        mousedown: function () {
          if ($("#g").attr("data-paused") == 1) {
            return;
          }
          var data = $(this).addClass("active").find(".b").attr("data-f");

          if ($("#g").find(".card.active").length > 1) {
            setTimeout(function () {
              var thisCard = $("#g .active .b[data-f=" + data + "]");

              if (thisCard.length > 1) {
                thisCard
                  .parents(".card")
                  .toggleClass("active card found")
                  .empty(); //yey (`да`)
                increase("flip_matched");

                // Win game (`Выиграть игру`)
                if (!$("#g .card").length) {
                  var time = $.now() - startGame;
                  if (
                    get("flip_" + difficulty) == "-:-" ||
                    get("flip_" + difficulty) > time
                  ) {
                    set("flip_" + difficulty, time); // increase best score (`увеличить лучший результат`)
                  }

                  startScreen("nice");
                }
              } else {
                $("#g .card.active").removeClass("active"); // fail (`потерпеть неудачу`)
                increase("flip_wrong");
              }
            }, 401);
          }
        },
      });

      // Add timer bar (`Добавить панель таймера`)
      $('<i class="timer"></i>')
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
      $(window)
        .off()
        .on("keyup", function (e) {
          // Pause game. (p) (`Пауза игры. (п)`)
          if (e.keyCode == 80) {
            if ($("#g").attr("data-paused") == 1) {
              // was paused, now resume (`был приостановлен, теперь возобновить`)
              $("#g").attr("data-paused", "0");
              $(".timer").css("animation-play-state", "running");
              $(".pause").remove();
            } else {
              $("#g").attr("data-paused", "1");
              $(".timer").css("animation-play-state", "paused");
              $('<div class="pause"></div>').appendTo("body");
            }
          }
          // Abandon game. (ESC) (`Отказаться от игры. (ESC)`)
          if (e.keyCode == 27) {
            startScreen("flip");
            // If game was paused (`Если игра была приостановлена`)
            if ($("#g").attr("data-paused") == 1) {
              $("#g").attr("data-paused", "0");
              $(".pause").remove();
            }
            $(window).off();
          }
        });
    });
  });
});
