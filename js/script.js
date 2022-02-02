let startGame = false;
let numberCards = 0;
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

const cardGameFactory =
  '<div class="front-card-game"><img src="./images/front.png" alt="" /></div>';

for (i = 0; i < numberCards / 2; i++) {
  firstLine.innerHTML += cardGameFactory;
  lastLine.innerHTML += cardGameFactory;
}
