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