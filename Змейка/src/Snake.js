class Snake {
  //! this. везде (почти) указывает на объект в котом находиться. здесь Snake
  constructor() {
    //! массив с возможными направлениями змейки
    this.possibleDirections = ["down", "up", "left", "right"];

    //! массив с координ. змейки (верхн. левый угол х0, у0)
    this.body = [
      {
        x: 1,
        y: 1,
      },
    ];

    //! направл. по умолчанию - вниз
    this.direction = "down";
  }

  /**
   * @param {Settings} settings настройки игры
   */
  init(settings) {
    this.settings = settings;
  }

  /**
   *! Меняем направление движения.
   * @param {string} direction направление может быть down, up, left, right.
   * @throws {Error} при передаче не корректного направления выбрасывается ошибка.
   */
  // принимает направления от pressKeyHandler из Game
  changeDirection(newDirection) {
    // если переданое направление нет среди possibleDirections, не includes (не включает в себя)
    if (!this.possibleDirections.includes(newDirection)) {
      // выбрасываем (throw) новую ошибку
      throw new Error(
        "Передано не верное направление. Вы передали: " + newDirection
      );
    }
    // в метод isPassedOppositeDirection передаем (переданое направление). если переданое направ. являеться противоположным, возрашаеться истина
    if (this.isPassedOppositeDirection(newDirection)) {
      // return (вернуть) не позволит выполнится коду ниже
      return;
    }
    // в свойство direction (направление) записываем новое направление(то что передали)
    this.direction = newDirection;
  }

  /**
   *! Метод проверяет, является ли переданное направление, противоположным тому куда сейчас движется змейка.
   * @param {string} newDirection новое направление, может быть up, down, right, left.
   * @returns {boolean} true если новое направление противоположно текущему, иначе false.
   */
  // `передано в противоположном направлении` (с переданым параметром)
  isPassedOppositeDirection(newDirection) {
    // если направление = "вниз" и перед.направ. = "верх"
    if (this.direction == "down" && newDirection == "up") {
      // возврашаем истину.
      return true;
    }
    if (this.direction == "up" && newDirection == "down") {
      return true;
    }
    if (this.direction == "left" && newDirection == "right") {
      return true;
    }
    if (this.direction == "right" && newDirection == "left") {
      return true;
    }
    // если нет противоположных направлений, возвращяем ложь
    return false;
  }

  /**
   *! Метод осуществляет шаг змейки. Добавляет ячейку перед существующим положением головы и удаляет одну ячейку в хвосте.
   */
  // `выполнить шаг`
  performStep() {
    // берем текущие коорд головы (в массиве первый элемент[0])
    let currentHeadCoords = this.body[0];
    // копируем их в переменную
    let newHeadCoords = {
      x: currentHeadCoords.x,
      y: currentHeadCoords.y,
    };
    // смотрим какое направление
    switch (this.direction) {
      // если "вниз" то по Y + 1
      case "down":
        newHeadCoords.y++;
        break;
      // если "вверх" то - 1 по коорд Y
      case "up":
        newHeadCoords.y--;
        break;
      // если в "лево" по X коорд - 1
      case "left":
        newHeadCoords.x--;
        break;
      // если в "право" по X коорд + 1
      case "right":
        newHeadCoords.x++;
        break;
    }

    //  //если голова уходит за правый край
    //  if (newHeadCoords.x > this.settings.colsCount) {
    //    newHeadCoords.x = 1;
    //  }
    //  //если голова уходит за нижний край
    //  if (newHeadCoords.y > this.settings.rowsCount) {
    //    newHeadCoords.y = 1;
    //  }
    //  //если голова уходит за левый край
    //  if (newHeadCoords.x == 0) {
    //    newHeadCoords.x = this.settings.colsCount;
    //  }
    //  //если голова уходит за верхний край
    //  if (newHeadCoords.y == 0) {
    //    newHeadCoords.y = this.settings.rowsCount;
    //  }

    // в dody добавляем в начале (новую ячейку)
    this.body.unshift(newHeadCoords);
    // удаляем в конце(последнию ячейку)
    this.body.pop();
  }

  /**
   *! Метод дублирует в массиве объектов представляющих тело змейки последнюю ячейку, т.е. в массиве в конце оказываются два одинаковых объекта.
   * Когда метод performStep в самом конце удаляет последний элемент массива, он удаляет сдублированный объект, таким образом тело змейки растет.
   */
  //`увеличить тело`
  // императивный код(говорим как делать, по шагам)
  increaseBody() {
    // переменная `последняя ячейка тела` = обрашаемся к массиву body[берем его последний элемент
    // (длина массива - 1(нумерация элементов с 0, потому из длины массива, скажем 3, - 1, будет 2, и это 3 элемент по счету, т.е. 0,1,2 ))]
    let bodyLastCell = this.body[this.body.length - 1];
    // в переменную newBodyLastCell записываем коорд последней ячейки
    let newBodyLastCell = {
      x: bodyLastCell.x,
      y: bodyLastCell.y,
    };
    // к теле змейки добавляем в конце такую же ячейку
    this.body.push(newBodyLastCell);
  }
}
