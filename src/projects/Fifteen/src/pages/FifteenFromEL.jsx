import React, { useState, useEffect } from "react";

// UI один.кнп.
import { BtnSingle } from "../../../../Components/ui/BtnSingle";

export const FifteenFromEL = () => {
  /**
   * ПРЕДНАСТРОЙКИ
   * ^@arrField - массив Поле из 16 эл.
   * ^@stFifteen @setStFifteen - сост и fn()для измен. с мас.Поле
   * ~Вроде не нужны
   * ~@sortArrField - перебор масс.Поле
   * ~@countItems @throw - проверка для масс. от ошб.
   */
  // созд.нов.масс.Поле
  // варик с существ. массивом
  // const arrField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(field => (field));
  const arrField = new Array(16).fill(0).map((_item, index) => index + 1); // => ind + 1 (для стартра id с 1)
  // сост.игры с масс.Поле
  const [stFifteen, setStFifteen] =
    // useState([]);
    // useState([matrix]); // запись весь масс. в одн ячейку
    // useState(matrix); // запись перебр масс. ч/з перем
    // useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])//.sort(() => Math.random() - 0.5)) // масс.сразу в стат. + сортировка
    useState(arrField); // запись напрям из перем.масс.
  // // перебор масс. (цифр.|объ. + сортировка)
  // const sortArrField = [...arrField].map(field => (
  //   field
  //   // {...field, id: field}
  // ))/* .sort(() => Math.random() - 0.5) */
  // // проверка длины масс. от ошб.
  // const countItems = 16;
  // if (sortArrField.length !== 16) {
  //   throw new Error(`Должно быть ровно ${countItems} itens в HTML`)
  // }

  /**
   * ПОЗИЦИОНИРОВАНИЕ
   * ^@matrix - глоб.перем.матрицы
   * ^@setPositionItems - установить позиции элементов
   */
  // глоб.перем.матрицы. получ. из линейного массива
  let matrix = getMatrix(
    // console.log('matrix 22 ',
    // arrField.map(item => item)
    arrField.map((item) => (
      // item
      <button key={item} className="item" data-mtrx-id={item}>
        <span>{item}</span>
        {/* <span>[{item}]</span> */}
      </button>
    ))
  );
  console.log("matrix ", matrix);
  // `Установить пункты позиции`
  setPositionItems(matrix);
  /**
   * ПОМОШНИКИ
   * @getMatrix - создание матрицы 4x4
   */
  //
  // создание матрицы 4x4
  function getMatrix(arr) {
    // матрица 4х4
    const matrixTemplate = [[], [], [], []];
    // коорд.
    let Y = 0;
    let X = 0;
    // проходим по масс. с перебором коорд. на увеличение
    for (let i = 0; i < arr.length; i++) {
      // Продолж. Переход на новую строку
      // 3. От стр.YO столб.Х4 к Y+1, X сброс на 0
      if (X >= 4) {
        Y++;
        X = 0;
      }
      // Нач. Присвойка знач.из масс. в столбцы.
      // 1. сначала в стр.Y0 столб.X0 присвойка 1го значен.из масс. и к Х+1;
      // 2. далее к стр.Y0 столб.X1 присвойка 2го pyx/bp масс, Х+1. Так до X4
      // 4. снова проход с присвойкой из масс. от 0 до 4
      matrixTemplate[Y][X] = arr[i];
      X++;
    }
    // возвр.полуеной матрицы
    return matrixTemplate;
  }
  // установить позиции элементов
  function setPositionItems(matrix) {
    // console.log('111 ', 111);
    // проход по всей матрице с опред знач.эл. и добав. стили
    for (let Y = 0; Y < matrix.length; Y++) {
      // console.log('222 ', 222);
      // перебор для двумерного масс.
      for (let X = 0; X < matrix[Y].length; X++) {
        console.log("333 ", 333);
        console.log("arrField ", arrField);
        console.log("matrix[Y][X] ", matrix[Y][X]);
        const value = matrix[Y][X];
        console.log("value.key ", value.key);
        const node = arrField[value.key - 1];
        console.log("node ", node);
        // setNodeStyles(node, X, Y)
      }
    }
  }
  // установить стили узлов
  function setNodeStyles(node, x, y) {
    console.log("999 ", 999);
    // выставка стилей для узла в зависимости от коорд
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
  }

  return (
    <div className="FifteenFromEL">
      <div className="FifteenFromEL__descript"></div>
      <div className="FifteenFromEL__content">
        {" "}
        {/* // ! по видео - https://www.youtube.com/watch?v=U4E8ubLnGvI */}
        <h1>Игра в "Пятнашки"</h1>
        <div className="FifteenFromEL__fifteen">
          {matrix.map(
            (item, index) =>
              // {
              // (
              // [
              // stFifteen.flat().map((item) => (
              // return
              // <button key={item.id} className="item"
              //   data-mtrx-id={item.index}>
              //   <span>{item.index}</span>
              //   {/* <span>[{item}]</span> */}
              // </button>
              item
            // <button key={item} className="item"
            //   data-mtrx-id={item}>
            //   <span>{item}</span>
            //   {/* <span>[{item}]</span> */}
            // </button>
            // ]
            // )
            // }
          )}
        </div>
        <div className="FifteenFromEL__setting">
          <BtnSingle
            name1={"Перемешать"}
            //
            // onClikBtn={startField}
          />
        </div>
      </div>
    </div>
  );
};
// export { FifteenFromEL };
