//* рефакторинг +. переимен Menu. терь здесь элементы управления
class Controls {
  constructor() {
    // получаем button id=startBtn
    this.startBtnEl = document.getElementById("startBtn");
    // получаем button id=pauseBtn
    this.pauseBtnEl = document.getElementById("pauseBtn");

    this.speedBtnEl = document.getElementById("speedBtn");
  }

  //* рефакторинг +. перед. объ Game со start и pause
  /**
   * @param {Game} game
   */
  init(game) {
    this.game = game;
  }

  /**
   //* рефакторинг +. назнач. слуш.соб. для эл. управл.
   * Метод устанавливает обработчики событий на клики по кнопкам "старт" и "пауза", а также на стрелки перемещения змейки.
   //* рефакторинг -.
   // // Метод назначает переданные функции в качестве обработчиков событий клика на кнопки "Старт" и "Пауза".
   // // @param {Function} startBtnClickHandler
   // // @param {Function} pauseBtnClickHandler
   */
  //* рефакторинг +. не приним. функц. из вне, т.к. передали сюда объ. game с этими функциями(старт,пауза)
  addControlsEventListeners() {
    //* рефакторинг -. растянутая логикс на 2 класса
    // // принимает в два аргумента (start- и pause- BtnClickHandler(обработчики клика кнопок старт и пауза)), параметра из game (в виде функций) и запускает их при клике
    // addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler)

    //* рефакторинг +. у кнп. старт слуш. клик, у получен. функц старт из объ game с жёстко привязаным this к game
    this.startBtnEl.addEventListener("click", this.game.start.bind(this.game));
    //* рефакторинг -.
    // // кнопке старт говорим что при клике вызывай эту функцию startBtnClickHandler
    // this.startBtnEl.addEventListener("click", startBtnClickHandler);
    //* рефакторинг +. рефакторинг +. у кнп. пауза слуш. клик, у получен. функц старт из объ game с жёстко привязаным this к game
    this.pauseBtnEl.addEventListener("click", this.game.pause.bind(this.game));
    //* рефакторинг -.
    // // кнопке пауза назнач. обработку клика для запуска функции pauseBtnClickHandler
    // this.pauseBtnEl.addEventListener("click", pauseBtnClickHandler);

    // ??? не раб кнопка
    this.speedBtnEl.addEventListener(
      "click",
      this.game.speeding.bind(this.game)
    );

    //* рефакторинг +.
    // слушаем событие keydown (нажатие "на кнопку вниз") - выполн функц pressKeyHandler(направляет змейку по кнопкам), bind(this)(привязанную к Game)
    // document.addEventListener("keydown", this.pressKeyHandler.bind(this));
    document.addEventListener(
      "keydown",
      this.game.pressKeyHandler.bind(this.game)
    );
  }
}
