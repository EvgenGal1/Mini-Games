const cards = document.querySelectorAll(".memory-card");

let isCardFlipped = false;
let firstcard, secondcard;

function flipcard() {
  this.classList.toggle("flip");
  if (isCardFlipped) {
    isCardFlipped = true;
    firstcard = this;
  } else {
    isCardFlipped = false;
    secondcard = this;
    // !!! не раб - Uncaught TypeError: Cannot read properties of undefined (reading 'dataset')
    if (firstcard.dataset.name === secondcard.dataset.name) {
      // if (firstcard.data.name === secondcard.data.name) {
      // if (firstcard.data === secondcard.data) {
      firstcard.removeEventListener("click", flipcard);
      secondcard.removeEventListener("click", flipcard);
    } else {
      setTimeout(() => {
        firstcard.classList.remove("flip");
        secondcard.classList.remove("flip");
      }, 1500);
    }
  }
}

cards.forEach((card) => {
  card.addEventListener("click", flipcard);
});
