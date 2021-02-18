class Game {
  //! this везде (почти) указывает на объект в котом находиться. здесь Game
  constructor() {
    // возвращаемый идентефикатор функции SetInterval
    this.tickIdentifier = null;
    // ссылка на div id=message
    this.messageEl = document.getElementById("message");
  }

  /**
   * Метод получает другие игровые объекты, которые нужны ему для работы.
   * @param {Settings} settings
   * @param {Status} status
   * @param {Board} board
   * @param {Snake} snake
   * @param {Menu} menu
   * @param {Score} score
   //* рефакторинг -. класс удалён
   //  @param {Food} food
   */
  //! через метод init мы будем передовать в какойто объект сылки на др объекты.
  //! 1 Мы так конролим от чего зависит наш файл. Видно в самом init
  //! 2 Более низкая связаность файлов, благодаря собственым свойствам (this.settings,this.board и пр.)
  init(settings, status, board, snake, menu, score) {
    this.settings = settings;
    this.status = status;
    this.board = board;
    this.snake = snake;
    this.menu = menu;
    this.score = score;
  }

  //* рефакторинг -. частичный перенос метода в Controls.js, чтоб не было растянутости метода
  /**
   * Метод назначает обработчики на события клика на кнопки "Старт", "Пауза", а также на стрелки на клавиатуре.
   */
  // run() {
  //  this.score.setToWin(this.settings.winLength);
  // у объекта game по ссылке на menu вызываем метод addButtonsClickListeners, которая передает туда функции
  //   this.menu.addButtonsClickListeners(
  // ссылка на функцию старт
  // метод bind (привязывать) создает такую же функц что перед ним(сейчас start), но для того что передаем в нём(сейчас объект Game)
  // в результате вернёться функция "f bound start()".bound -связаный. привязаный this
  //(bind(this)жестко привязывает к Game и тут же передаеться в метод addButtonsClickListeners)
  // this указывает на то кто вызывает функцию
  //это нужно для дальнейшего использования в Game, потому что функцию start вызывает кнопка startBtnEl из объекта Menu.
  //     this.start.bind(this),
  // ссылка на  функц пауза
  //     this.pause.bind(this)
  //   );
  // слушаем событие keydown (нажатие "на кнопку вниз") - выполн функц pressKeyHandler(направляет змейку по кнопкам), bind(this)(привязанную к Game)
  //   document.addEventListener("keydown", this.pressKeyHandler.bind(this));
  // }

  /**
   * Метод запускает игру.
   */
  start() {
    // если статус "на паузе"
    if (this.status.isPaused()) {
      // ставим статус что "играть"
      this.status.setPlaying();
      // перемен tickIdentifier = вызов метода setInterval (вызов функц через интервал), для фун.doTick, через 1 сек деленую на скорость змейки.
      this.tickIdentifier = setInterval(
        // метод setInterval будет вызывать объект windows, но для дальнейшей работы, методом bind, создаем новую функцию doTick, в самом Game
        this.doTick.bind(this),
        // вызываем через каждую секунду делённую на скорость. чем больше скорость змейки, тем чаше обновляеться изменения на поле
        1000 / this.settings.speed
      );
    }
  }

  /**
   * Метод ставит игру на паузу.
   */
  // императивный код(говорим как делать, по шагам)
  pause() {
    //если статус "играем"
    if (this.status.isPlaying()) {
      // ставим статус "пауза"
      this.status.setPaused();
      //* рефакторинг +. более понятное назв функции(вызов зациклиного обновления)
      this.stopGame();
      //* рефакторинг -. оборачиваем вызов зациклиного обновления в отдельную функц stopGame
      // останавливаем игру (остановл вызов фун tickIdentifier)
      // clearInterval(this.tickIdentifier);
    }
  }

  /**
   * Этот метод запускается каждую секунду и осуществляет:
   * 1. перемещение змейки
   * 2. проверяет проиграна/выиграна ли игра
   * 3. увеличивает размер змейки если она ест еду
   * 4. заново отрисовывает положение змейки и еды
   *  Двигает всё игру
   */
  // только декларативный код(говорим что делать, а не как делать )
  doTick() {
    // метод меняет координаты змейки(делает шаг)
    this.snake.performStep();
    //* рефакторинг -.на каждом шаге вывод текущего счёта. нет смысла т.к. счёт меняется когда змейка ест
    // this.score.setCurrent(this.snake.body.length);
    //* рефакторинг +. проверка наступания на себя, если да то, остановка игры, вывод смс проигрыша, возвр. результ
    if (this.isSnakeSteppedOntoItself()) {
      this.stopGame();
      this.setMessage("Вы проиграли");
      return;
    }
    //* рефакторинг +. е/и змейка съела еду, то увели. тело, отрисов. текущ. счёт
    if (this.board.didSnakeEatFood()) {
      this.snake.increaseBody();
      this.score.renderCurrentScore(this.snake.body.length);
      //* рефакторинг +. проверка идет в цикле, где змейка уже съела еду
      // если вернулась истина из метода isGameWon(выйгрышная длина), то остановка игры, вывод смс победы, возвр. результ
      if (this.isGameWon()) {
        this.stopGame();
        this.setMessage("Вы выиграли");
        return;
      }
      //* рефакторинг +. проверка идет в цикле, где змейка уже съела еду
      // текущ. еду очищаем, ставим новую еду
      this.board.clearFood();
      this.board.renderNewFood();
      //* рефакторинг -.
      // в board проверяем `находить голова на еде`
      // if (this.board.didSnakeEatFood()) {
      // увеличиваем тело змейки
      // this.snake.increaseBody();
      // ставим новую еду
      // this.food.setNewFood();
    }
    //* рефакторинг +. на каждом шагу очищаем змейку, отрисовыем по новой т.к. коорд. поменялись
    this.board.clearSnake();
    this.board.renderSnake();
    //* рефакторинг -.
    // очищает игровое поле
    // this.board.clearBoard();
    // выставляет еду
    // this.food.setFood();
  }

  //* рефакторинг +. ввели принцип единой ответствености
  /**
   * Метод проверяет выиграна ли игра.
  // юлоше не нужно - останавливает игру, выводит сообщение о выигрыше.
   * @returns {boolean} если длина змейки достигла длины нужной для выигрыша, тогда true, иначе false.
   */
  isGameWon() {
    //* рефакторинг +. теперь только проверка победы
    return this.snake.body.length == this.settings.winLength;
    //* рефакторинг -.
    // если у змейки длина координат равна победной длине из настроек
    // if (this.snake.body.length == this.settings.winLength) {
    // останавливает обновления всего, игру
    // clearInterval(this.tickIdentifier);
    // в div с id=message выводит смс
    // this.setMessage("Вы выиграли");
    //   return true;
    // }
    // return false;
  }

  /**
   * Метод проверяет съела ли змейка сама себя.
   * @returns {boolean}
   */
  isSnakeSteppedOntoItself() {
    // есть альтернативное решение гдет в дз уроках
    let cellArr = this.snake.body.map(function (cellCoords) {
      return cellCoords.x.toString() + cellCoords.y.toString();
    });
    let head = cellArr.shift();
    //* рефакторинг +. проверяем наступили ли на себя
    return cellArr.includes(head);
    //* рефакторинг -.
    // е/и наступили на себя
    // if (cellArr.includes(head)) {
    // тогда останов игру
    //   clearInterval(this.tickIdentifier);
    // вывод смс
    //   this.setMessage("Вы проиграли");
    //   return true;
    // }
    // return false;

    /* 
        [
            {x: 1, y: 1}
            {x: 1, y: 2}
            {x: 1, y: 3}
        ]
        [
            "11", "12", "13"
        ]
        */
  }

  stopGame() {
    clearInterval(this.tickIdentifier);
  }

  //* рефакторинг -. Устаревший метод
  /**
  // // * @deprecated Метод больше не используется, т.к. теперь змейка может проходить через стены.
   *
   * Метод проверяет проиграна ли игра, останавливает игру. В случае проигрыша, выводит сообщение о проигрыше.
   * @returns {boolean} если мы шагнули в стену, тогда true, иначе false.
   */
  isGameLost() {
    // если мы шагнули в стену
    // в board в метод isNextStepToWall передаём коорд тела змейки равые [0]
    if (this.board.isNextStepToWall(this.snake.body[0])) {
      this.stopGame();
      // останавливаем метод tickIdentifier
      // clearInterval(this.tickIdentifier);
      // вывод сообщения через метод setMessage
      this.setMessage("Вы врезались в стену");
      return true;
    }
    // иначе ложь
    return false;
  }

  /**
   * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет вызываться соответствующий метод.
   * @param {KeyboardEvent} event
   */
  pressKeyHandler(event) {
    // переключаеться (switch) при событии (event) на клавише (key)
    switch (event.key) {
      // если "стрелка вверх"
      case "ArrowUp":
        // у змейкм вызываем метод changeDirection и передаём направление
        this.snake.changeDirection("up");
        break;
      case "ArrowDown":
        this.snake.changeDirection("down");
        break;
      case "ArrowLeft":
        this.snake.changeDirection("left");
        break;
      case "ArrowRight":
        this.snake.changeDirection("right");
        break;
    }
  }

  /**
   * Метод выводит сообщение на странице.
   * @param {string} text
   */
  // принимает параметр
  setMessage(text) {
    // обращаеться к div id=message и вписывает принятый текст
    this.messageEl.innerText = text;
  }
}
