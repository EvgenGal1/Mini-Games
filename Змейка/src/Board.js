class Board {
  //! this. везде (почти) указывает на объект в котом находиться. здесь Board
  constructor() {
    // получаем доступ к таблице table id="game"
    this.boardEl = document.getElementById("game");
  }

  /**
   *! Метод получает другие игровые объекты, которые нужны ему для работы.
   * @param {Settings} settings объект настроек.
   * @param {Snake} snake объект змейки.
   */
  //! через метод init мы будем передовать в какойто объект сылки на др объекты.
  //! 1 Мы так конролим от чего зависит наш файл. Видно в самом init
  //! 2 Более низкая связаность файлов, благодаря собственым свойствам (this.settings,this.board и пр.)
  // игровому полю передаем рамеры игров поля и змейку чтоб по кордин. отрисовать её
  init(settings, snake) {
    this.settings = settings;
    this.snake = snake;
  }

  /**
   *! Метод отрисовывает игровое поле.
   */
  // внешний цикл отрисует строку, а внутрений ячейки в ней. потом опять строка и ячейки
  renderBoard() {
    // очищаем игр.поле
    this.boardEl.innerHTML = "";
    // перебираем кол-во строк из настроек (21)
    for (let row = 0; row < this.settings.rowsCount; row++) {
      // создаем тег "tr"
      let tr = document.createElement("tr");
      // обращаемся таблице и добавляем  тег "tr"
      this.boardEl.appendChild(tr);

      // смотрим сколько колонок (21)
      for (let col = 0; col < this.settings.colsCount; col++) {
        // создаем тег "td"
        let td = document.createElement("td");
        // в tr добавляем td
        tr.appendChild(td);
        // по кругу создаем и добавляем теги td до 21 включительно
        // идем второй раз на внешний цикл. и так до 21
      }
    }
  }

  /**
   *! Метод отрисовывает змейку на доске.
   */
  // метод getSnakeBodyElems будет возращить теги "td" которые соответствуют координатам змейки (snake.body) и отрисовывать их присваивая класс snakeBody
  renderSnake() {
    // перемен. snakeBodyElems = у Board, В МЕТОД getSnakeBodyElems (получить элементы тела змейки) передаем массив с координатами из snake.body. Делаем это по сылке (this.snake) на объект Snake
    const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
    // если в snakeBodyElems чтото есть
    if (snakeBodyElems) {
      // перебираем его
      snakeBodyElems.forEach(function (tdEl) {
        // и каждому тегу "td" добавляем класс snakeBody. класс раскрашивает змейку
        tdEl.classList.add("snakeBody");
      });
    }
  }

  /**
   *! Получаем набор тегов td, представляющих тело змейки.
   * @param {array} bodyCoords массив объектов с координатами
   * @returns {HTMLTableCellElement[]|null} возвращается массив тегов td (HTMLTableCellElement - тег td) если были переданы координаты, иначе null.
   */
  getSnakeBodyElems(bodyCoords) {
    // если в массиве длина больше 0
    if (bodyCoords.length > 0) {
      // создаем массив, в который поместим теги
      let bodyElems = [];
      // перебираем массив
      for (let value of bodyCoords) {
        // перемен. elem = в метод getCellEl (получить элемент ячейки) передаем коорд Х и Y. получаем теги "td"
        let elem = this.getCellEl(value.x, value.y);
        // в массив , в конец, добавляем
        bodyElems.push(elem);
      }
      // возращаем массив из тегов "td"
      return bodyElems;
    }
    // иначе ничего
    return null;
  }

  /**
   *! Получаем ячейку таблицы.
   * @param {number} x координата по оси х.
   * @param {number} y координата по оси y.
   * @returns {HTMLTableCellElement} тег td
   */
  getCellEl(x, y) {
    // возвращаем Nный  (переданый) элемент  "tr" и "td" (в виде ссылки). таким образом мы будем получать эту ячейку (тег)
    // скажем первый тег "tr" в нем первый тег "td"
    return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
  }

  /**
   *! Метод очищает игровое поле.
   */
  clearBoard() {
    // константа tdElems = получаем все теги "td",
    const tdElems = document.querySelectorAll("td");
    // перебираем циклом forEach все теги td
    tdElems.forEach(function (td) {
      // выставляем класс как пустую строку
      td.className = "";
    });
  }

  /**
   * @deprecated Метод больше не используется, т.к. теперь змейка может проходить через стены.
   *
   * Является ли следующий шаг, шагом в стену.
   * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
   * @param {number} nextCellCoords.x
   * @param {number} nextCellCoords.y
   * @returns {boolean}
   */
  // в таблице нумерация идет с 1. в правого верхнего края. по гориз Х, по вертик Y
  isNextStepToWall(nextCellCoords) {
    // переменная nextCell = получаем ячейку таблицы по коорд
    let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
    // tcjb коорд идентичны null
    if (nextCell === null) {
      // возврат истина
      return true;
    }
    // иначе ложь
    return false;
  }

  /**
   *! Метод рисует еду на игровом поле.
   * @param {Object} coords будущее расположение еды на поле
   * @param {number} coords.x координата x
   * @param {number} coords.y координата y
   */
  // принимает рандомные координаты от setNewFood() {}, и дает им класс food
  renderFood(coords) {
    // перемен. foodCell = получаем ячейку таблицы (getCellEl) по принятым коорд
    const foodCell = this.getCellEl(coords.x, coords.y);
    // приписываем класс
    foodCell.classList.add("food");
  }

  /**
   *! Метод проверяет съела ли змейка еду.
   * @returns {boolean} true если змейка находится на еде, иначе false.
   */
  // `голова на еде`
  isHeadOnFood() {
    // у еды (таблица(тег td) с классом .food) проверим класслист содержит (contains) ли он змейку (класс snakeBody)
    // если змейка зашла на еду, тогда будут 2 класса (food, snakeBody)
    return this.boardEl.querySelector(".food").classList.contains("snakeBody");
  }
}
