const lineCards = document.querySelector(".line-cards");

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
  cardFactory = "";
  parrotsInTheGame.sort(randomize);
  for (let parrot = 0; parrot < numberCards; parrot++) {
    cardFactory += `<div onclick="flipCard(this);" class="card-game ${parrotsInTheGame[parrot]}">
  <img class="front-card" src="./images/${parrotsInTheGame[parrot]}"/>
  <img class="back-card" src="./images/front.png">
  </div>`;
  }

  lineCards.innerHTML = cardFactory;
}

const cards = document.querySelectorAll(".card-game");
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
  } else {
    secondCard = card;
    clickSecondCard = true;
  }

  if (clickFirstCard && clickSecondCard) {
    listFirst = firstCard.classList;
    listSecond = secondCard.classList;
    if (listFirst[1] == listSecond[1]) {
      alert("é igual cria");
      resetCards();
    } else {
      setTimeout(onFlipCard, 2000);
      resetCards();
    }
  }
}

//só ta virando a segunda carta
function onFlipCard() {
  firstFrontCard = firstCard.querySelector(".front-card");
  firstBackCard = firstCard.querySelector(".back-card");

  secondFrontCard = secondCard.querySelector(".front-card");
  secondBackCard = secondCard.querySelector(".back-card");

  firstFrontCard.classList.remove("rotate-front");
  firstBackCard.classList.remove("rotate-back");
  secondFrontCard.classList.remove("rotate-front");
  secondBackCard.classList.remove("rotate-back");
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
startGame();
