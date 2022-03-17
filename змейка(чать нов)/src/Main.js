window.addEventListener("load", () => {
  const settings = new Settings();
  const status = new Status();
  const snake = new Snake();
  const board = new Board();
  const menu = new Menu();
  const food = new Food();
  const game = new Game();
  const score = new Score();

  settings.init({ speed: 5, winLength: 10 });
  snake.init(settings);
  board.init(settings, snake);
  food.init(settings, snake, board);
  game.init(settings, status, board, snake, menu, food, score);
  score.init(settings);

  board.renderBoard();
  board.renderSnake(snake);

  food.setNewFood();
  game.run();
});
