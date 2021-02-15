class Board {
  constructor() {
    this.boardEl = document.getElementById("game");
  }

  /**
   * Метод получает другие игровые объекты, которые нужны ему
   * для работы.
   * @param {Settings} settings объект настроек.
   * @param {Snake} snake объект змейки.
   */
  init(settings, snake) {
    this.settings = settings;
    this.snake = snake;
  }

  /**
   * Метод отрисовывает игровое поле.
   */
  renderBoard() {
    // очищаем игр.поле
    // this.boardEl.innerHTML = "";
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr = document.createElement("tr");
      this.boardEl.appendChild(tr);

      for (let col = 0; col < this.settings.colsCount; col++) {
        let td = document.createElement("td");
        tr.appendChild(td);
      }
    }
  }

  /**
   * Метод отрисовывает змейку на доске.
   */
  renderSnake() {
    const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);

    snakeBodyElems.forEach(function (tdEl) {
      tdEl.classList.add("snakeBody");
    });
  }

  /** Метод очищает игровое поле от еды. */
  clearFood() {
    document.querySelector(".food").classList.remove("food");
  }

  clearSnake() {
    const tdElems = document.querySelectorAll(".snakeBody");
    tdElems.forEach(function (td) {
      td.classList.remove("snakeBody");
    });
  }

  /**
   * Получаем набор тегов td, представляющих тело змейки.
   * @param {Array} bodyCoords массив объектов с координатами
   * @throws {Error} если координаты не будут переданы, то будет выброшена ошибка
   * @returns {HTMLTableCellElement[]}
   */
  getSnakeBodyElems(bodyCoords) {
    if (bodyCoords.length === 0) {
      throw new Error("Не переданы координаты тела змейки.");
    }

    let bodyElems = [];
    for (let coordinate of bodyCoords) {
      let td = this.getCellEl(coordinate.x, coordinate.y);
      bodyElems.push(td);
    }
    return bodyElems;
  }

  /**
   * Получаем ячейку таблицы.
   * @param {number} x координата по оси х.
   * @param {number} y координата по оси y.
   * @returns {HTMLTableCellElement} тег td
   */
  getCellEl(x, y) {
    return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
  }

  /**
   * Метод проверяет съела ли змейка еду.
   * @returns {boolean} true если змейка находится на еде, иначе false.
   */
  didSnakeEatFood() {
    return this.boardEl.querySelector(".food").classList.contains("snakeBody");
  }

  /**
   * Метод возвращает тег td у которого нет класса snakeBody или food
   * @returns {HTMLTableCellElement}
   */
  getRandomEmptyTd() {
    const emptyTdElements = document.querySelectorAll(
      "td:not(.snakeBody):not(.food)"
    );
    const randomEmptyTd =
      emptyTdElements[Math.floor(Math.random() * (emptyTdElements.length - 1))];
    return randomEmptyTd;
  }

  /**
   * Метод устанавливает новое случайное положение еды на игровом
   * поле.
   */
  renderNewFood() {
    const emptyTd = this.getRandomEmptyTd();
    emptyTd.classList.add("food");
  }
}
