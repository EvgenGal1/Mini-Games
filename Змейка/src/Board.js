//! если в файле только один класс то его имя пишут с большой буквы (хорошая практика  - один файл - один класс)
class Board {
  //! this. везде (почти) указывает на объект в котом находиться. здесь Board
  constructor() {
    // получаем доступ к таблице table id="game"
    this.boardEl = document.getElementById("game");
  }

  /**
   * Метод получает другие игровые объекты, которые нужны ему для работы.
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
   * Метод отрисовывает игровое поле.
   */
  // внешний цикл отрисует строку, а внутрений ячейки в ней. потом опять строка и ячейки
  renderBoard() {
    //* рефакторинг. чтоб не наруш принц един. отвеств. убрали очистку.
    // очищаем игр.поле
    // this.boardEl.innerHTML = "";
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
   * Метод отрисовывает змейку на доске.
   */
  // метод getSnakeBodyElems будет возращить теги "td" которые соответствуют координатам змейки (snake.body) и отрисовывать их присваивая класс snakeBody
  renderSnake() {
    // перемен. snakeBodyElems = у Board, В МЕТОД getSnakeBodyElems (получить элементы тела змейки) передаем массив с координатами из snake.body. Делаем это по сылке (this.snake) на объект Snake
    const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
    //* рефакторинг -. убираем проверку на ноль
    // если в snakeBodyElems чтото есть
    // if (snakeBodyElems) {
    // перебираем snakeBodyElems
    snakeBodyElems.forEach(function (tdEl) {
      // и каждому тегу "td" добавляем класс snakeBody. класс раскрашивает змейку
      tdEl.classList.add("snakeBody");
    });
    // }
  }

  //* рефакторинг -.  не нужно постояно очищать поле, только змейку и еду. заместо + нов. методы
  /**
   * Метод очищает игровое поле.
   */
  // clearBoard() {
  // константа tdElems = получаем все теги "td",
  //   const tdElems = document.querySelectorAll("td");
  // перебираем циклом forEach все теги td
  //   tdElems.forEach(function (td) {
  // выставляем класс как пустую строку
  //     td.className = "";
  //   });
  // }

  //* рефакторинг +.
  /** Метод очищает игровое поле от еды. */
  clearFood() {
    document.querySelector(".food").classList.remove("food");
  }

  addBoard() {
    const gameTbl = document.querySelector(".gameTbl");
    gameTbl.classList.add("gameBoard");
  }

  addBoardSup() {
    const gameTbl = document.querySelector(".gameTbl");
    gameTbl.classList.add("gameBoardSup");
  }

  //* рефакторинг +.
  /** Метод очищает игровое поле от змейки. */
  clearSnake() {
    const tdElems = document.querySelectorAll(".snakeBody");
    tdElems.forEach(function (td) {
      td.classList.remove("snakeBody");
    });
  }

  /**
   * Получаем набор тегов td, представляющих тело змейки.
   * @param {Array} bodyCoords массив объектов с координатами
   ** рефакторинг +.
   * @throws {Error} если координаты не будут переданы, то будет выброшена ошибка
   * @returns {HTMLTableCellElement[]}
   ** рефакторинг -.
  // @returns {HTMLTableCellElement[]|null} возвращается массив тегов td (HTMLTableCellElement - тег td) если были переданы координаты, иначе null.
   */
  getSnakeBodyElems(bodyCoords) {
    // если в массиве длина равна 0, он пуст
    if (bodyCoords.length === 0) {
      //* рефакторинг +.
      // выдаст ошибку
      throw new Error("Не переданы координаты тела змейки.");
    }

    // если прошли проверку выше, создаем массив, в который поместим теги
    let bodyElems = [];
    //* рефакторинг ~.
    // перебираем массив
    for (let coordinate of bodyCoords) {
      // перемен. td = в метод getCellEl (получить элемент ячейки) передаем коорд Х и Y. получаем теги "td"
      let td = this.getCellEl(coordinate.x, coordinate.y);
      // в массив , в конец, добавляем
      bodyElems.push(td);
    }
    // возращаем массив из тегов "td"
    return bodyElems;
  }
  //* рефакторинг -. не надо лишнего null т.к. есть проверка выше
  // иначе ничего
  // return null;
  // }

  /**
   * Получаем ячейку таблицы.
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
   * Метод проверяет съела ли змейка еду.
   * @returns {boolean} true если змейка находится на еде, иначе false.
   */
  // `голова на еде`
  //* рефакторинг +. переименовка метода isHeadOnFood(`это голова на еде`) в более понятный didSnakeEatFood (`ела ли змея еду`)
  didSnakeEatFood() {
    // у еды (таблица(тег td) с классом .food) проверим класслист содержит (contains) ли он змейку (класс snakeBody)
    // если змейка зашла на еду, тогда будут 2 класса (food, snakeBody)
    return this.boardEl.querySelector(".food").classList.contains("snakeBody");
  }

  //* рефакторинг -. нет изза удален класса Food.js
  /**
   * Метод рисует еду на игровом поле.
   * @param {Object} coords будущее расположение еды на поле
   * @param {number} coords.x координата x
   * @param {number} coords.y координата y
   */
  // принимает рандомные координаты от setNewFood() {}, и дает им класс food
  // renderFood(coords) {
  // перемен. foodCell = получаем ячейку таблицы (getCellEl) по принятым коорд
  //   const foodCell = this.getCellEl(coords.x, coords.y);
  // приписываем класс
  //   foodCell.classList.add("food");
  // }

  //* рефакторинг +. случайные генер. заместо generateRandomCoordinates() из Food.js(брали случ коорд в цикле, из них брали тег td, провер нет ли в нём змейки - не оптим изза циклов).
  /**
   * Метод возвращает тег td у которого нет класса snakeBody или food
   * @returns {HTMLTableCellElement}
   */
  getRandomEmptyTd() {
    // в перем = получ все теги td у которых нет .snakeBody и .food. получ изначально пустые классы
    const emptyTdElements = document.querySelectorAll(
      "td:not(.snakeBody):not(.food)"
    );
    // в перем = у пуст. тегов берем случ. число * на ограничитель(длинна массива - 1) и обрас. дробн. часть. получим случ. индекс тега td
    const randomEmptyTd =
      emptyTdElements[Math.floor(Math.random() * (emptyTdElements.length - 1))];
    return randomEmptyTd;
  }

  //* рефакторинг +. весь функ-ал еды. Удален целый класс Food.js т.к. на каждом ходе теперь уже не надо очищать игр поле и снова ставить еду на место, то и нет необходимости хранить объект с состоянием координат еды. еда очищаеться только если её ест змейка. тогда какому нить тегу td присвоим класс food
  /**
   * Метод устанавливает новое случайное положение еды на игровом
   * поле.
   */
  renderNewFood() {
    // получ случайный пустой тег td
    const emptyTd = this.getRandomEmptyTd();
    // даём .food. класс удалится если змейка его съест. если съест, снова выз renderNewFood()
    emptyTd.classList.add("food");
  }

  /**
  //  // *@deprecated Метод больше не используется, т.к. теперь змейка может проходить через стены.
   *
   * Является ли следующий шаг, шагом в стену.
   * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
   * @param {number} nextCellCoords.x
   * @param {number} nextCellCoords.y
   * @returns {boolean}
   */
  // в таблице нумерация идет с 1. с правого верхнего края. по гориз Х, по вертик Y
  isNextStepToWall(nextCellCoords) {
    // переменная nextCell = получаем ячейку таблицы по коорд
    let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
    return nextCell === null;
    // если коорд идентичны null
    // if (nextCell === null) {
    //   // возврат истина
    //   return true;
    // }
    // // иначе ложь
    // return false;
  }

  // isNextStepToWall() {
  //   // перемен. nexttd = в метод getCellEl (получить элемент ячейки) передаем коорд Х и Y. получаем теги "td"
  //   let nextTd = this.getCellEl(coordinate.x, coordinate.y);}
  //   // перемен. snakeBodyElems = у Board, В МЕТОД getSnakeBodyElems (получить элементы тела змейки) передаем массив с координатами из snake.body. Делаем это по сылке (this.snake) на объект Snake
  //   const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);

  //   return this.snake.body.length == this.settings.winLength;
}
