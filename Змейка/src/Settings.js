//! если в файле только один класс то его имя пишут с большой буквы (хорошая практика  - один файл - один класс)
class Settings {
  //! this. везде (почти) указывает на объект в котором находиться. здесь Settings
  /**
   * @param {Object} params - Парметры игры.
   * @param {number} params.rowsCount - количество строк игрового поля.
   * @param {number} params.colsCount - количество колонок игрового поля.
   * @param {number} params.speed - скорость перемещения змейки.
   * @param {number} params.winLength - какую длину надо наесть, чтобы выиграть.
   * @throws {Error} если переданы не верные настройки выбрасывается
   * соответствующая ошибка.
   */
  // один метод на весь класс. объект settings.init({}) будет передоваться в param
  // в метод init(инициализация) принимаем параметры из main
  //! через метод init мы будем передовать в какойто объект сылки на др объекты.
  //! 1 Мы так конролим от чего зависит наш файл. Видно в самом init
  //! 2 Более низкая связаность файлов, благодаря собственым свойствам (здесь param)
  //* рефакторинг +. синтаксис деструкторизации - позвол вызывать метод без передачи парам(иначе undefined)
  // {... .....} = переданые сво-ва объ., формируются в параметры функции. эти значения по умолч. перзапишут то что есть в объ которому передаём
  // (= {} если ничего не передано будет пустой объект)
  init({ rowsCount = 21, colsCount = 21, speed = 2, winLength = 50 } = {}) {
    //* рефакторинг -.
    // init(params) {
    // объект настроек игры по умолчанию
    // rows и cols - строки и колонки табл
    // speed - скорость
    // winLength - длина для победы
    // let defaultParams = {
    //   rowsCount: 21,
    //   colsCount: 21,
    //   speed: 2,
    //   winLength: 50,
    // };
    // в настройки по умолчанию заменяем передаными настройками.
    //  метод Object.assign (копирует с заменой(с право на лево)) из params в defaultParams
    // speed по умолч: было 2 стало 5, winLength по умолч: было 50 стало 5
    // Object.assign(defaultParams, params);

    // Проверки строк на соответствие тем что нужно
    // проверка на строки
    //* рефакторинг +. т.к.переданые параметры стали параметрами функции, то к ним нет необходимости обращаться через объект (defaultParams.rowsCount). более локанично
    if (rowsCount < 10 || rowsCount > 30) {
      throw new Error(
        "Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30]."
      );
    }
    //* рефакторинг -.
    // если кол-во строк  меньше 10 или больше 30 выбрасываем ощибку
    // if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
    // если прошли проверку, то количество строк, сохраняем в свойство (rowsCount) объекта (settings) настроек
    // this.rowsCount = defaultParams.rowsCount;

    // проверка на колонки
    //* рефакторинг +.
    if (colsCount < 10 || colsCount > 30) {
      throw new Error(
        "Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30]."
      );
    }
    //* рефакторинг -.
    // if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
    // this.colsCount = defaultParams.colsCount;

    // проверка на скорость
    //* рефакторинг +.
    if (speed < 1 || speed > 10) {
      throw new Error(
        "Неверные настройки, значение speed должно быть в диапазоне [1, 10]."
      );
    }
    //* рефакторинг -.
    // if (defaultParams.speed < 1 || defaultParams.speed > 10) {
    // this.speed = defaultParams.speed;

    // проверка на выйгрышную длину
    //* рефакторинг +.
    if (winLength < 5 || winLength > 50) {
      throw new Error(
        "Неверные настройки, значение winLength должно быть в диапазоне [5, 50]."
      );
    }
    //* рефакторинг -.
    // if (defaultParams.winLength < 5 || defaultParams.winLength > 50) {
    // this.winLength = defaultParams.winLength;

    // основная логика, присваивание
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.speed = speed;
    this.winLength = winLength;
  }
}
