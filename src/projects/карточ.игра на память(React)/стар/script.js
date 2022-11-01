const cards = document.querySelectorAll(".memory-card");

// `имеет перевернутую карту`
let hasFlippedCard = false;
let firstCard, secondCard;
// lock board(`блокировка карты`(е/и след. разные))
let lockBoard = false;

// 'переворот карты' - е/и неразные и не 2клика то + .flip. е/и нет переворота(аватара),то это первая карта, возврат. иначе вторая карта
function flipCard() {
  // lock board - возрат е/и разные
  if (lockBoard) return;
  // double click(`двойное нажатие`) - возврат е/и 2клик по 1ой
  if (this === firstCard) return;

  // console.log("I was clicked!");
  // console.log(this);
  // this.classList.add("flip");
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // first click(`первый клик`)
    hasFlippedCard = true;
    firstCard = this;
    // console.log({ hasFlippedCard, firstCard });
    // > рефакторинга
    return;
  }
  // > рефакторинга
  // else {
  // second click(`второй клик`)
  // > double click
  // hasFlippedCard = false;
  secondCard = this;
  // console.log({ firstCard, secondCard });

  checkForMatch();
  // }
}

//do cards match?(совпадение?) - е/и avatarы совпадают то вызвать fn()disableCard, е/и нет то fn()unflipCard
function checkForMatch() {
  // console.log(firstCard.dataset.avatar);
  // console.log(secondCard.dataset.avatar);
  // < рефакторинга
  // if (firstCard.dataset.avatar === secondCard.dataset.avatar) {
  //   firstCard.removeEventListener("click", flipCard);
  // secondCard.removeEventListener("click", flipCard);
  // } else {
  //   setTimeout(() => {
  //   firstCard.classList.remove("flip");
  //   secondCard.classList.remove("flip");
  // }, 1500);
  // }
  // > рефакторинга
  let isMatch = firstCard.dataset.avatar === secondCard.dataset.avatar;

  isMatch ? disableCard() : unflipCard();
}

//it's a match!(совпадение!) - совпало, удалить прослушиватель у 1го и 2го карты. вызвать fn()resetBoard
function disableCard() {
  // > рефакторинга
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // > double click
  resetBoard();
}

// not a match(не совпадеие) - не совпало, у 1го и 2го переключить .flip за 1,5сек, вызвать fn()resetBoard
function unflipCard() {
  // lock board
  lockBoard = true;
  // > рефакторинга
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    // lock board
    // lockBoard = false;
    // > double click
    resetBoard();
  }, 1500);
}

// `сброс карты` - не перевернути и не разные. нет 1го и 2го
function resetBoard() {
  // [hasFlippedCard, lockBoard] = [false, false];
  // [firstCard, secondCard] = [null, null];
  // > shufling
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// shufling(`перетасовка`) - fn Expression. все карты перебрать, каждой рандомно в стили order поставить номер
(function shuflip() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// перебрать карты. карте прослушиватель клика и fn()flipCard
cards.forEach((card) => card.addEventListener("click", flipCard));
