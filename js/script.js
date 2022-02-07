const lineCards = document.querySelector(".line-cards");

let cardCreate = "";
let numberCards = 0;
let numberMatch = 0;
let countPlays = 0;
let cardsMatch = [];
let parrotsInTheGame = [];
const parrotsGifs = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif",
];

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
  cardFactory = "";
  parrotsInTheGame.sort(randomize);
  for (let parrot = 0; parrot < numberCards; parrot++) {
    cardFactory += `<div onclick="flipCard(this);" class="card-game ${parrotsInTheGame[parrot]}" data-identifier="card">
  <img class="front-card" data-identifier="front-face" src="./images/${parrotsInTheGame[parrot]}"/>
  <img class="back-card" data-identifier="back-face" src="./images/front.png">
  </div>`;
  }

  lineCards.innerHTML = cardFactory;
}
startGame();
let cards = document.querySelectorAll(".card-game");
let clickFirstCard = false;
let clickSecondCard = false;
let firstCard = null;
let secondCard = null;
let lockFlip = false;
let listFirst = null;
let listSecond = null;
let frontCard = null;
let backCard = null;

function flipCard(card) {
  frontCard = card.querySelector(".front-card");
  backCard = card.querySelector(".back-card");
  frontCard.classList.add("rotate-front");
  backCard.classList.add("rotate-back");

  if (!clickFirstCard) {
    firstCard = card;
    clickFirstCard = true;
    countPlays++;
  } else {
    secondCard = card;
    clickSecondCard = true;

    lockCard();
  }

  if (clickFirstCard && clickSecondCard) {
    listFirst = firstCard.classList;
    listSecond = secondCard.classList;
    if (listFirst[1] == listSecond[1]) {
      setTimeout(addMatchShadow, 1000);
      resetCards();
    } else {
      setTimeout(unFlipCard, 1000);
      resetCards();
    }
  }
  setTimeout(winGame, 1600);
}

function winGame() {
  if (numberCards / 2 == numberMatch) {
    alert(`Você ganhou em ${countPlays} jogadas!`);
    let playAgain = prompt(
      "Deseja jogar novamente? ('s' para sim ou 'n' para não)"
    );
    if (playAgain === "n") {
      alert("Jogo encerrado, volte sempre!");
    } else if (playAgain === "s") {
      newGame();
    }
  }
}

function addMatchShadow() {
  firstCard.classList.add("shadow-match");
  secondCard.classList.add("shadow-match");

  cardsMatch.push(firstCard);
  cardsMatch.push(secondCard);
  unlockCards();

  numberMatch++;
}

function unFlipCard() {
  firstFrontCard = firstCard.querySelector(".front-card");
  firstBackCard = firstCard.querySelector(".back-card");

  secondFrontCard = secondCard.querySelector(".front-card");
  secondBackCard = secondCard.querySelector(".back-card");

  firstFrontCard.classList.remove("rotate-front");
  firstBackCard.classList.remove("rotate-back");
  secondFrontCard.classList.remove("rotate-front");
  secondBackCard.classList.remove("rotate-back");
  unlockCards();
}
function randomize() {
  return Math.random() - 0.5;
}

function resetCards() {
  clickFirstCard = false;
  clickSecondCard = false;
  listFirst = null;
  listSecond = null;
}

function newGame() {
  countPlays = 0;
  numberMatch = 0;
  resetCards();
  cardsMatch = [];
  parrotsInTheGame = [];
  startGame();
}

function lockCard() {
  for (let i = 0; i < cards.length; i++) {
    let item = cards[i];
    item.removeAttribute("onclick");
  }
}

function unlockCards() {
  for (let i = 0; i < cards.length; i++) {
    let item = cards[i];
    item.setAttribute("onclick", "flipCard(this);");
  }
  for (let i = 0; i < cardsMatch.length; i++) {
    cardsMatch[i].removeAttribute("onclick");
  }
}
