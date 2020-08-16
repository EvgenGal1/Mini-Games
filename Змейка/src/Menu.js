class Menu {
  constructor() {
    // получаем button id=startBtn
    this.startBtnEl = document.getElementById("startBtn");
    // получаем button id=pauseBtn
    this.pauseBtnEl = document.getElementById("pauseBtn");
  }

  /**
   *! Метод назначает переданные функции в качестве обработчиков событий клика на кнопки "Старт" и "Пауза".
   * @param {Function} startBtnClickHandler
   * @param {Function} pauseBtnClickHandler
   */
  // принимает в два аргумента (start- и pause- BtnClickHandler(обработчики клика кнопок старт и пауза)), параметра из game (в виде функций) и запускает их при клике
  addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
    // кнопке старт говорим что при клике вызывай эту функцию
    this.startBtnEl.addEventListener("click", startBtnClickHandler);
    // кнопке пауза назнач. обработку клика для запуска функции
    this.pauseBtnEl.addEventListener("click", pauseBtnClickHandler);
  }
}
