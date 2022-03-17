/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
  constructor() {
    // при открытие страницы сразу ставим на паузу
    // this.setPaused();
    this.condition = "paused";
  }

  // Это значит что мы играем.
  // включает игру
  setPlaying() {
    // condition (состояние) играем
    this.condition = "playing";
  }

  //Это значит что игра на паузе.
  setPaused() {
    this.condition = "paused";
  }

  /**
   * @returns {boolean} если мы сейчас играем, тогда true, иначе false.
   */
  // проверяет включена ли игра
  isPlaying() {
    return this.condition === "playing";
  }

  /**
   * @returns {boolean} если сейчас игра на паузе, тогда true, иначе false.
   */
  isPaused() {
    return this.condition === "paused";
  }

  // вкл
  // ??? не раб кнопка
  setSpeed() {
    this.condition = "speedi";
  }
  // провер на вкл

  /**
   *
   *
   * @returns
   * @memberof Status
   */
  isSpeed() {
    if (this.condition === "paused") {
      return this.condition === "speedi";
    }
  }
}
