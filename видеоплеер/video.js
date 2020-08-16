("use strict");

// получаем все нужные селекторы (по классам и видео по тегу)
const currentTime = document.querySelector(".currentTime");
const video = document.querySelector("video");
const timing = document.querySelector(".timing");
const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-pause");
// ! paused это действие. что происходит (стоит на паузе)
// ! pause это объект. что сделать (с ЧЕМ сделать (паузу))
const volume = document.querySelector(".volume");

let wasVideoPlaying = false; // перемен. востроизводилось ли видео
let progressIdentifier = null; //перем. идентиф прогресса

//приполной загрузке ("load"), у input class="timing" min="0" максимальное значение (timing.max) станет равно продолжительности видео (video.duration)
window.addEventListener("load", function () {
  timing.max = video.duration;
});

// добавляем все селекторы input.
const inputs = document.querySelectorAll("input");
// перебираем циклом (forEach) все элементы по отдельности, т.к. на коллекцию нет метода (addEventListener)
inputs.forEach(function (input) {
  // у input слушаем событие "focus" (сработает когда будет наведено на люой input) и вызываем функцию с параметром event (с методами совершеного события).
  input.addEventListener("focus", function (event) {
    // в переменую прописываем стиль рамки
    const styles = "outline: 3px solid red;";
    // у определеного события (фокуса у какого нить input) в его свойство terget у объекта style в свойств cssText прописываем стиль (styles)
    event.target.style.cssText = styles;
  });

  // когда фокус пропадет (сотытие "blur")
  input.addEventListener("blur", function (event) {
    // мы в стилях (у объекта style) вызовем метод removeProperty (удалим стиль "outline")
    event.target.style.removeProperty("outline");
  });
});

/**
 *  функция делает следующее: устанавливаем интервал (setInterval) который будет вызывать функц (changProgress) через каждые 100 мс (1с), и запишем значение в переменную (progressIdentifier)
 */
function startProgInter() {
  progressIdentifier = setInterval(changProgress, 100);
}

pauseBtn.addEventListener("click", function () {
  if (!video.paused) {
    // ! Любимка глаголит. Слушай сюда!
    //! если не остановлено, то ставим на паузу и остнавл. считыв. интервала.
    video.pause();
    //
    clearInterval(progressIdentifier);
  }
});

//слушае событие (addEventListener) у кнопки playBtn (i class=fa-play), и при нажатии на неё ("click"), если видео на паузе (if (video.paused)) то включаем его и запускаем a (setInterval)
playBtn.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    startProgInter();
    //  progressIdentifier = setInterval(changProgress, 100); // заменил более краткое функцией startProgInter();
    // устанавливаем интервал (setInterval) который будет вызывать функц (changProgress) через каждые 100 мс (1с), и запишем значение в переменную (progressIdentifier)
  }
});

//слушает измеенения ("change") и положение ползунка (input class=timing, value="") будем приписывать в текущее время видео (video.currentTime). делаеться для того если ползунок изменяется пользователем, и передвигаеться на новое место.
timing.addEventListener("change", function () {
  video.currentTime = timing.value;
  if (wasVideoPlaying) {
    // если видео воспр. то воспроизводим заново и занозапуск функц setInterval(changProgress, 100).
    video.play();
    startProgInter();
    //  progressIdentifier = setInterval(changProgress, 100); // заменил более краткое функцией startProgInter();
  } else {
    // если не восрпроизв, то просто запуск changProgress чтобы обновила выводимый интервал
    changProgress();
  }
});

// !интересно  что этом коде не так
// // У (input class=timing) слушаем событие и при нажатие на кнопку мыши ("mousedown") ставим паузу и останавливаем считывание (clearInterval) интервала (progressIdentifier)
// timing.addEventListener("mousedown", function () {
//   wasVideoPlaying = !video.paused; //оно воспроизводилось = видео не на паузе
//   if (wasVideoPlayin) {
//     // если оно воспроизв то
//     video.pause();
//     clearInterval(progressIdentifier);
//   }
// });
// !интересно  что этом коде не так

// У (input class=timing) слушаем событие и при нажатие на кнопку мыши ("mousedown") ставим паузу и останавливаем считывание (clearInterval) интервала (progressIdentifier)
timing.addEventListener("mousedown", function () {
  // console.log('timing mousedown');
  //оно воспроизводилось = видео не на паузе
  wasVideoPlaying = !video.paused;
  if (wasVideoPlaying) {
    // если оно воспроизв то видео на паузу и останавл считыван интервала
    video.pause();
    clearInterval(progressIdentifier);
  }
});

/**
 * в span class="currentTime" во внутрь (innerText) присвайвает значение текущего времени (currentTime) из видео. тоже самое записивает в input class="timing" value="0".
 */
function changProgress() {
  currentTime.innerText = video.currentTime;
  timing.value = video.currentTime;
}

//когда видео закончиться ("ended") останавливаем считывание (clearInterval) интервала (progressIdentifier)
video.addEventListener("ended", function () {
  clearInterval(progressIdentifier);
});

// ! практически сам написал
// на теге video, слешаем событие (addEventListener), а конкретно клик по области видео ("click"). когда кликаем по видео то...
video.addEventListener("click", function () {
  if (!video.paused) {
    //! как говорит Любимка paused это глагол и обозначает остановку, само действие
    //! pause это существительное т.е. сама кнопка. чтго сделать чтобы остановилось.
    // если видео не на паузе (!video.paused), то ставим его на паузу и останавл. считывание (clearInterval) интервала (progressIdentifier)
    video.pause();
    clearInterval(progressIdentifier);
  } else if (video.paused) {
    // если видео не воспроизводиться (на паузе), то включаем его и запускаем считывание времени
    video.play();
    startProgInter();
    //  progressIdentifier = setInterval(changProgress, 100); // заменил более краткое функцией startProgInter();
  }
  //   if (video.paused) {
  //     video.play();
  //   } else if (!video.paused) {
  //     video.paused;
  //   }
});

// слушаем событие изменения и в само видео в звук, записывает значение (value) ползунка (input class=volume)
volume.addEventListener("change", function () {
  video.volume = volume.value;
});

//
//
//
