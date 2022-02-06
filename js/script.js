const firstLine = document.querySelector(".first-line");
const lastLine = document.querySelector(".last-line");
const parrotsGifs = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif",
];
let parrotsInTheGame = [];

let cardCreate = "";
let numberCards = 0;

// PERGUNTA COM QUANTAS CARTAS O USUÁRIO QUER JOGAR
function startGame() {
  do {
    numberCards = parseInt(
      prompt(
        "Digite a quantidade de cartas que quer jogar (Use números pares entre 4 e 14): "
      )
    );
  } while (!(numberCards % 2 === 0 && numberCards >= 4 && numberCards <= 14));

  for (let i = 0; i < numberCards / 2; i++) {
    parrotsInTheGame.push(parrotsGifs[i]);
    parrotsInTheGame.push(parrotsGifs[i]);
  }
  generateCard(numberCards);
}

function generateCard(numberCards) {
  cardFactory(numberCards, firstLine);

  cardFactory(numberCards, lastLine);
  // DISTRIBUINDO AS CARTAS EM DUAS LINHAS
}

function cardFactory(numberCards, line) {
  cardCreate = "";
  parrotsInTheGame.sort(randomize);
  for (let parrot = 0; parrot < numberCards / 2; parrot++) {
    cardCreate += `<div onclick="flipCard(this);" class="card-game" id="card${parrot}">
  <img class="front-card" src="./images/${parrotsInTheGame[parrot]}"/>
  <img class="back-card" src="./images/front.png">
  </div>`;
    parrotsInTheGame.splice(parrot, 1);
  }

  line.innerHTML = cardCreate;
}
const cards = document.querySelectorAll(".card-game");
let firstCard, secondCard;
let lockFlip = false;

function flipCard(card) {
  const frontCard = card.querySelector(".front-card");
  const backCard = card.querySelector(".back-card");

  if (lockFlip) return false;
  frontCard.classList.toggle("rotate-front");
  backCard.classList.toggle("rotate-back");

  if (!firstCard) {
    firstCard = card;
    return false;
  }
  secondCard = card;

  checkCards();
}

function checkCards() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  // Mudar para operador ternario ;-;
  if (!isMatch) {
    unFlipCards();
  }
  resetCards(isMatch);
}

function unFlipCards() {
  lockFlip = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1200);
}

(function shuffle() {
  cards.forEach((card) => {
    let rand = Math.floor(Math.random() * 14);
    card.style.order = rand;
  });
})();

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  firstCard = null;
  secondCard = null;
  lockFlip = false;
}

function randomize() {
  return Math.random() - 0.5;
}

cards.forEach((card) => card.addEventListener("click", flipCard));
startGame();
