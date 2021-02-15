class Board {
    constructor() {
        this.boardEl = document.getElementById('game');
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
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
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
            tdEl.classList.add('snakeBody');
        });
    }

    /** Метод очищает игровое поле от еды. */
    clearFood() {
        document.querySelector('.food').classList.remove('food');
    }

    clearSnake() {
        const tdElems = document.querySelectorAll('.snakeBody');
        tdElems.forEach(function (td) {
            td.classList.remove('snakeBody');
        });
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
     * Метод проверяет съела ли змейка еду.
     * @returns {boolean} true если змейка находится на еде, иначе false.
     */
    didSnakeEatFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }

    /**
     * Метод возвращает тег td у которого нет класса snakeBody или food
     * @returns {HTMLTableCellElement}
     */
    getRandomEmptyTd() {
        const emptyTdElements = document.querySelectorAll('td:not(.snakeBody):not(.food)');
        const randomEmptyTd = emptyTdElements[Math.floor(Math.random() * (emptyTdElements.length - 1))]
        return randomEmptyTd;
    }

    /**
     * Метод устанавливает новое случайное положение еды на игровом
     * поле.
     */
    renderNewFood() {
        const emptyTd = this.getRandomEmptyTd();
        emptyTd.classList.add('food');
    }
}
class Controls {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    /**
     * @param {Game} game 
     */
    init(game) {
        this.game = game;
    }

    /**
     * Метод устанавливает обработчики событий на клики по кнопкам
     * "старт" и "пауза", а также на стрелки перемещения змейки.
     */
    addControlsEventListeners() {
        this.startBtnEl.addEventListener('click', this.game.start.bind(this.game));
        this.pauseBtnEl.addEventListener('click', this.game.pause.bind(this.game));
        document.addEventListener('keydown', this.game.pressKeyHandler.bind(this.game));
    }
}
class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    /** 
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Score} score
     */
    init(settings, status, board, snake, menu, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.score = score;
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            this.stopGame();
        }
    }

    /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. проверяет проиграна/выиграна ли игра
     * 3. увеличивает размер змейки если она ест еду
     * 4. заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep();
        if (this.isSnakeSteppedOntoItself()) {
            this.stopGame();
            this.setMessage("Вы проиграли");
            return;
        }
        if (this.board.didSnakeEatFood()) {
            this.snake.increaseBody();
            this.score.renderCurrentScore(this.snake.body.length);
            
            if (this.isGameWon()) {
                this.stopGame();
                this.setMessage("Вы выиграли");
                return;
            }
            
            this.board.clearFood();
            this.board.renderNewFood();
        }
        this.board.clearSnake();
        this.board.renderSnake();
    }

    /**
     * Метод проверяет выиграна ли игра.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        return this.snake.body.length == this.settings.winLength;
    }

    /**
     * Метод проверяет съела ли змейка сама себя.
     * @returns {boolean}
     */
    isSnakeSteppedOntoItself() {
        let cellArr = this.snake.body.map(function (cellCoords) {
            return cellCoords.x.toString() + cellCoords.y.toString();
        });
        let head = cellArr.shift();
        return cellArr.includes(head);
    }

    stopGame() {
        clearInterval(this.tickIdentifier);
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет 
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text 
     */
    setMessage(text) {
        this.messageEl.innerText = text;
    }
}
window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const controls = new Controls();
    const game = new Game();
    const score = new Score();

    const initialSettings = { speed: 5, winLength: 10 };
    
    settings.init(initialSettings);
    snake.init(settings);
    board.init(settings, snake);
    game.init(settings, status, board, snake, controls, score);
    score.init(settings);
    controls.init(game);

    board.renderBoard();
    board.renderSnake(snake);
    score.renderPointsForWin(initialSettings.winLength);
    board.renderNewFood();
    score.renderCurrentScore(snake.body.length);
    controls.addControlsEventListeners();
});
class Score {
    constructor() {
        this.currentEl = document.querySelector('.current');
        this.toWinEl = document.querySelector('.toWin');
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод устанавливает текущий счет игрока.
     * @param {string} score 
     */
    renderCurrentScore(score) {
        this.currentEl.textContent = score;
    }

    /**
     * Метод устанавливает количество очков, необходимых
     * для выигрыша.
     * @param {string} points 
     */
    renderPointsForWin(points) {
        this.toWinEl.textContent = points;
    }
}
class Settings {
    /**
     * @param {Object} params - Парметры игры.
     * @param {number} params.rowsCount - количество строк игрового поля.
     * @param {number} params.colsCount - количество колонок игрового поля.
     * @param {number} params.speed - скорость перемещения змейки.
     * @param {number} params.winLength - какую длину надо наесть, чтобы выиграть.
     * @throws {Error} если переданы не верные настройки выбрасывается
     * соответствующая ошибка.
     */
    init({rowsCount = 21, colsCount = 21, speed = 2, winLength = 50} = {}) {

        if (rowsCount < 10 || rowsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        if (colsCount < 10 || colsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        if (speed < 1 || speed > 10) {
            throw new Error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }
        if (winLength < 5 || winLength > 50) {
            throw new Error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
        }

        this.rowsCount = rowsCount;
        this.colsCount = colsCount;
        this.speed = speed;
        this.winLength = winLength;
    }
}
class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [{
            x: 1,
            y: 1,
        }];

        this.direction = 'down';
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Меняем направление движения.
     * @param {string} newDirection направление может быть down, up, left, right.
     * @throws {Error} при передаче не корректного направления выбрасывается ошибка.
     */
    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано не верное направление. Вы передали: ' + newDirection);
        }
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    /**
     * Метод проверяет, является ли переданное направление, противоположным
     * тому куда сейчас движется змейка.
     * @param {string} newDirection новое направление, может быть up, down, right, left.
     * @returns {boolean} true если новое направление противоположно текущему,
     * иначе false.
     */
    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    /**
     * Метод осуществляет шаг змейки. Добавляет ячейку перед существующим
     * положением головы и удаляет одну ячейку в хвосте.
     */
    performStep() {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {...currentHeadCoords};
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }

        //если голова уходит за правый край
        if (newHeadCoords.x > this.settings.colsCount) {
            newHeadCoords.x = 1;
        }
        //если голова уходит за нижний край
        if (newHeadCoords.y > this.settings.rowsCount) {
            newHeadCoords.y = 1;
        }
        //если голова уходит за левый край
        if (newHeadCoords.x == 0) {
            newHeadCoords.x = this.settings.colsCount;
        }
        //если голова уходит за верхний край
        if (newHeadCoords.y == 0) {
            newHeadCoords.y = this.settings.rowsCount;
        }

        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    /**
     * Метод дублирует в массиве объектов представляющих тело змейки
     * последнюю ячейку, т.е. в массиве в конце оказываются два
     * одинаковых объекта. Когда метод performStep в самом конце
     * удаляет последний элемент массива, он удаляет сдублированный
     * объект, таким образом тело змейки растет.
     */
    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {...bodyLastCell};
        this.body.push(newBodyLastCell);
    }
}
/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
    constructor() {
        this.condition = 'paused';
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /**
     * @returns {boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}
//# sourceMappingURL=maps/app.js.map
