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
     * @param {Food} food
     * @param {Score} score
     */
    init(settings, status, board, snake, menu, food, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.score = score;
    }

    /**
     * Метод назначает обработчики на события клика на кнопки "Старт",
     * "Пауза", а также на стрелки на клавиатуре.
     */
    run() {
        this.score.setToWin(this.settings.winLength);
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
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
            clearInterval(this.tickIdentifier);
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
        this.score.setCurrent(this.snake.body.length);
        if (this.isSnakeSteppedOntoItself()) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    /**
     * Метод проверяет выиграна ли игра, останавливает игру,
     * выводит сообщение о выигрыше.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы выиграли');
            return true;
        }
        return false;
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
        if (cellArr.includes(head)) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;

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

    /**
     * @deprecated Метод больше не используется, т.к. теперь
     * змейка может проходить через стены.
     * 
     * Метод проверяет проиграна ли игра, останавливает игру
     * в случае проигрыша, выводит сообщение о проигрыше.
     * @returns {boolean} если мы шагнули в стену, тогда
     * true, иначе false.
     */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
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