let startGame = false;
let numberCards = 0;
let countCliks = 0;
const arrayCards = [
  "./images/bobrossparrot.gif",
  "./images/explodyparrot.gif",
  "./images/fiestaparrot.gif",
  "./images/metalparrot.gif",
  "./images/revertitparrot.gif",
  "./images/tripletsparrot.gif",
  "./images/unicornparrot.gif",
];
let arrayCardsGame = [];

while (!startGame) {
  if (numberCards % 2 === 0 && numberCards >= 4 && numberCards <= 14) {
    break;
  }
  numberCards = parseInt(
    prompt(
      "Digite a quantidade de cartas que quer jogar (Use números pares entre 4 e 14): "
    )
  );
}

const firstLine = document.querySelector(".first-line");
const lastLine = document.querySelector(".last-line");

for (i = 0; i < numberCards; i++) {
  arrayCardsGame.push(arrayCards[i]);
  arrayCardsGame.push(arrayCards[i]);
  arrayCardsGame.sort(comparate);
}
let cardGameFactory = "";

for (let i = 0; i < numberCards; i++) {
  cardGameFactory = `<div class="card" onclick="rotateCard(this)"><div class="front-card-game face"><img src="./images/front.png" alt="" /></div><div class="back-card-game face"><img src="${arrayCardsGame[i]}" alt="" /></div></div>`;
  if (i % 2 == 0) {
    firstLine.innerHTML += cardGameFactory;
  } else {
    lastLine.innerHTML += cardGameFactory;
  }
}

function rotateCard(card) {
  const frontCard = document.querySelector(".front-card-game");
  const backCard = document.querySelector(".back-card-game");

  frontCard.classList.toggle("rotate-front");
  backCard.classList.toggle("rotate-back");
}

function comparate() {
  return Math.random() - 0.5;
}
