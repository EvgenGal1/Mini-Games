"use strict";

// ! можно добавлять стили, фон, шрифты, загрузку из стороних ресурсов и через JS. обычно делаеться через html head.
// обращаемся к документу, к head, разобрает указаный текстта на html и вставляет в DOM дерево (insertAdjacentHTML) в позицию afterbegin (после открывающего тега элемента(перед первым потомком, т.е. сразу после тега head))
// ! document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

//! получаем селектор с классом .slider
let slider = document.querySelector(".slider");

//! создаём икоку загрузки
// вносит в переменную созданый тег <i>.
let loadIcon = document.createElement("i");
// добовляем (add) к тегу классы (classList). fas, fa-spinner - стандартые классы (fontawesome) для появления иконки. fa-spin - анимация иконки
loadIcon.classList.add("fas", "fa-spinner", "fa-spin");
// к элементу slider (div class=slider) добавляем (insertAdjacentElement) в позицию afterbegin (сразу после открывающего тега (slider)) элемент (объект) loadIcon (i).
slider.insertAdjacentElement("afterbegin", loadIcon);

//! Создаем левую стрелку
let leftArrow = document.createElement("i");
// стандартые классы (fontawesome) fas, fa-chevron-circle-left. slider-leftArrow наши классы на которые будем назначать бработки клика
leftArrow.classList.add("fas", "fa-chevron-circle-left", "slider-leftArrow");
// добавляем элемент в позицию beforeend (сразу перед закрывающим тегом)
slider.insertAdjacentElement("beforeend", leftArrow);

//! Создаем правую стрелку
let rightArrow = document.createElement("i");
rightArrow.classList.add("fas", "fa-chevron-circle-right", "slider-rightArrow");
slider.insertAdjacentElement("beforeend", rightArrow);

// ! Ждем когда весь контент целиком загрузится (load)
window.addEventListener("load", function () {
  // ! переключаемся на левое изображение
  // при клике по левой кнопке вызываем функцию
  leftArrow.addEventListener("click", function () {
    //
    images.setNextLeftImage();
  });
  // ! переключаемся на правое изображение
  rightArrow.addEventListener("click", function () {
    images.setNextRightImage();
  });

  //! Инициализация слайдера
  // вызываеться медот init
  images.init();
  //! Скрываем иконку загрузки
  hideLoadIcon(loadIcon);
});

/**
 *! Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon
 */
function hideLoadIcon(loadIcon) {
  // после загрузки изображения, "удалем" иконку загрузки (делаем так что она не занимает место)
  loadIcon.style.display = "none";
}

/**
 *! изменяем размер изображения
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider
 */
function setSizes(slider) {
  // в переменную (width) вносит получение атрибута data-width у div class=slider
  let width = slider.getAttribute("data-width");
  // ширину в height
  let height = slider.getAttribute("data-height");
  // если ширина не отсутствует (null) и не равна пустой строку, то
  if (width !== null && width !== "") {
    // в slider, в его втили ширины прописываем переданые значения
    slider.style.width = width;
  }
  if (height !== null && height !== "") {
    slider.style.height = height;
  }
}
setSizes(slider);

//! Объект слайдера
//* Объект слайдера
//? Объект слайдера
let images = {
  //! {int} Номер текущего изображения (индекс)
  currentIdx: 0,

  //! {HTMLDivElement[]} slides элементы слайдов */
  // массив дивов (div class=slider-item hidden-slider). храниться как колекция
  slides: [],

  /**
   *! Получаем все слайды и показываем первый слайд
   */
  init() {
    //! получаем класс slider-item
    // получаем div class="slider-item и вносим его в массив slides: [] (свойство объекта let images = {})
    this.slides = document.querySelectorAll(".slider-item");
    //! показываем изобр (вызов функц)
    // вызываем функцию showImageWithCurrentIdx (показать изображение с текущим идентификатором)
    this.showImageWithCurrentIdx();
  },

  /**
  	*! показываем изобр (созд функц)
     // функция удаляет класс hidden-slider у просматриваемого изображения
     */
  showImageWithCurrentIdx() {
    // Перемееная currentSlide = берем слайд с текущим индексом,
    // далее обращаемся к его классам и убираем у него класс hidden-slide.
    const currentSlide = this.slides[this.currentIdx];
    currentSlide.classList.remove("hidden-slider");
  },

  /**
   *! Скрывает изобр (скрыть видимые изобр)
   */
  hideVisibleImages() {
    //! не очень оптимальный метод
    //  Всем слайдам добавляем класс hidden-slider.
    //  перебираем (forEach) все слайды ("(и во временную переменную slide)") в их классы добавляем класс hidden-slide
    this.slides.forEach(function (slide) {
      slide.classList.add("hidden-slider");
    });
    // не оч потому что:
    // 1. видимая картинка будет всегда одна
    // 2. добавляем уже сушествующий класс (div class=slider-item hidden-slider)
    //! оптимальный вариант
    // получаем класс slider-item у которого нет (:not) класса hidden-slide, и в его классы (classList) и даем ему (add) этот класс
    //  document
    //    .querySelector(".slider-item:not(.hidden-slider)")
    //    .classList.add("hidden-slider");
    // всегда будет виден только один слайд, у других он не будет удалятся
  },

  /**
   *! Переключиться на предыдущее изображение.
   */
  setNextLeftImage() {
    // скрываем избр
    this.hideVisibleImages();
    // если индекс избр 0, индекс становиться меньше, относительно длины массива (скажем 3 избр в массиве - 1 = 2. т.к. счет индексов идет с нуля, то выбереться последнее изобр.(в инд 0 = 1 избр, в инд 1 = 2 избр, в инд. 2 = 3 избр))
    if (this.currentIdx == 0) {
      this.currentIdx = this.slides.length - 1;
      // иначе инд - 1
    } else {
      this.currentIdx--;
    }
    //! старый код (простое перелистование)
    //  показываем избр по текущему инд
    //  this.showImageWithCurrentIdx();
    //! анимированое перелистование с право на лево
    // в переменая currentSlide = берем в объекте slides, текущий индекс (currentIdx) элемента
    const currentSlide = this.slides[this.currentIdx];
    // в этот элемент, в его классы, добавляем класс slider-rightToLeftAnimation
    currentSlide.classList.add("slider-rightToLeftAnimation");
    // и удаляем hidden-slider
    currentSlide.classList.remove("hidden-slider");
    // стрелочная функц удаляет класс slider-rightToLeftAnimation, через 500мс.
    setTimeout(() => {
      currentSlide.classList.remove("slider-rightToLeftAnimation");
    }, 500);
  },

  /**
   *! Переключиться на следующее изображение.
   */
  setNextRightImage() {
    this.hideVisibleImages();
    // проверяем не в самом ли конце мы массива (длина массива - 1), если да, то переключаемся в самое начало
    if (this.currentIdx == this.slides.length - 1) {
      this.currentIdx = 0;
    } else {
      // иначе + 1
      this.currentIdx++;
    }
    //  this.showImageWithCurrentIdx();
    //! анимированое перелистование с лево на право
    const currentSlide = this.slides[this.currentIdx];
    currentSlide.classList.add("slider-leftToRightAnimation");
    currentSlide.classList.remove("hidden-slider");
    setTimeout(() => {
      currentSlide.classList.remove("slider-leftToRightAnimation");
    }, 500);
  },
};
