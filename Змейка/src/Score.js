class Score {
  constructor() {
    this.currentEl = document.querySelector(".current");
    this.toWinEl = document.querySelector(".toWin");
  }

  /**
   * @param {Settings} settings настройки игры
   */
  init(settings) {
    this.settings = settings;
  }

  /**
   * Метод устанавливает текущий счет игрока.
   ** рефакторинг +.передаём счёт
   * @param {string} score
   ** рефакторинг -.
   * @param {string} text
   */
  //* рефакторинг +. более информативное имя - `отрисовать текущий счёт`
  renderCurrentScore(score) {
    //* рефакторинг -.
    // setCurrent(text) {
    //* рефакторинг +. передаём счёт в div с кл. .current
    this.currentEl.textContent = score;
    //* рефакторинг -.
    // this.currentEl.textContent = text;
  }

  /**
   * Метод устанавливает количество очков, необходимых
   * для выигрыша.
   ** рефакторинг +. передаём очки
   * @param {string} points
   ** рефакторинг -.
   * @param {string} points
   */
  //* рефакторинг +. более информативное имя - `отрисовать очки за победу`
  renderPointsForWin(points) {
    //* рефакторинг -.
    // setToWin(text) {
    //* рефакторинг +. передаём очки div с кл. .toWin
    this.toWinEl.textContent = points;
    //* рефакторинг -.
    // this.toWinEl.textContent = text;
  }
}
