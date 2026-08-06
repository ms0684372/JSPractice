const choiceConst = {
  scissors: "scissors",
  paper: "paper",
  rock: "rock",
};

let elements = {
  computer: document.getElementById("computer"),
  btnScissors: document.getElementById("btnScissors"),
  btnRock: document.getElementById("btnRock"),
  btnPaper: document.getElementById("btnPaper"),
  resultP: document.getElementById("resultP"),
  winCount: document.getElementById("winCount"),
  loseCount: document.getElementById("loseCount"),
  tieCount: document.getElementById("tieCount"),
  score: document.getElementById("score"),
  btnReset: document.getElementById("btnReset"),
};

let stats = JSON.parse(localStorage.getItem("stats")) || {
  win: 0,
  lose: 0,
  tie: 0,
  score: 0,
};
updateUI();
console.log(stats);

let gameChoice = ["scissors", "rock", "paper"];

elements.btnScissors.onclick = () => playGame(gameChoice[0]);
elements.btnRock.onclick = () => playGame(gameChoice[1]);
elements.btnPaper.onclick = () => playGame(gameChoice[2]);

function getComputerChoice() {
  let choice = gameChoice[Math.floor(Math.random() * 3)];
  return choice;
}

function handleResult(playerChoice, comChoice) {
  console.log("handle result");
  if (playerChoice == comChoice) {
    stats.tie++;
    elements.resultP = "平手";
  } else if (
    (playerChoice === choiceConst.scissors &&
      comChoice === choiceConst.paper) ||
    (playerChoice === choiceConst.paper && comChoice === choiceConst.rock) ||
    (playerChoice === choiceConst.rock && comChoice === choiceConst.scissors)
  ) {
    elements.resultP = "贏";
    stats.win++;
    stats.score++;
  } else {
    elements.resultP = "輸";
    stats.lose++;
    stats.score--;
  }
  saveAndRender();
}

function saveAndRender() {
  console.log("save");
  localStorage.setItem("stats", JSON.stringify(stats));
  updateUI();
}

function updateUI() {
  console.log(stats);
  elements.winCount.textContent = stats.win;
  elements.loseCount.textContent = stats.lose;
  elements.tieCount.textContent = stats.tie;
  elements.score.textContent = stats.score;
}

function playGame(playerChoice) {
  let comChoice = getComputerChoice();
  elements.computer.textContent = comChoice;

  //判斷勝負
  handleResult(playerChoice, comChoice);
}
