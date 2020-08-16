// ждем когда всё загрузится и потом выполняем
window.addEventListener("load", () => {
  // объект класса settings
  // объект настроек
  const settings = new Settings();
  // статус
  const status = new Status();
  // объект змейки
  const snake = new Snake();
  // объект (класс) игрового поля
  const board = new Board();
  // объект меню. отвечает за работу кнопок (старт, пауза)
  const menu = new Menu();
  // еда
  const food = new Food();
  // объект игры
  const game = new Game();
  //   const score = new Score();

  //! передаем свои настройки
  // в классе settings метод init (установка начальных значений). в виде объекта передаем настройки для нашей игры(скорость, длина для выйгрыша)
  settings.init({ speed: 5, winLength: 15 });
  //
  //   snake.init(settings);
  //! передаем в board через init, настройки и змейку
  board.init(settings, snake);
  //! в food передаем настройки,змейку и игр поле
  food.init(settings, snake, board);
  //
  //! в game передаем ссылки на объекты
  game.init(settings, status, board, snake, menu, food);
  //
  //   score.init(settings);

  //! отрисовываем игровое поле
  board.renderBoard();
  //! отрисов. змейку
  board.renderSnake();

  //! создаем новую еду
  food.setNewFood();
  //! метод обработчика сотытия клика
  game.run();
});
