let gameStart = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["coral", "teal", "orange", "skyblue"];
let gameSeq = [];
let userSeq = [];
let hsText = document.getElementById("hScore");

document.addEventListener("keypress", function () {
  if (gameStart == false) {
    console.log("Game started");
    gameStart = true;
    levelup();
  }
});

function userFlash(btn) {
  btn.classList.add("flash1");
  setTimeout(() => btn.classList.remove("flash1"), 200);
}

function gameFlash(btn) {
  btn.classList.add("flash0");
  setTimeout(() => btn.classList.remove("flash0"), 500);
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 3);
  let randomCol = btns[randomIdx];
  let randombtn = document.querySelector(`.${randomCol}`);
  gameFlash(randombtn);
  gameSeq.push(randomCol);
}

let hs = 0;
function highScore() {
 if(hs<=(level-1)) {
  hs = level-1;
 }
}
function reset() {
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function checkAns(idx) {
  if(userSeq[idx]===gameSeq[idx]) {
    if(userSeq.length===gameSeq.length) {
      setTimeout(levelup(), 2000);
    }
  } else {
    h2.innerText = `Game Over! Press any key to start again. Your score is ${level-1}.`
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "lightcyan";
    }, 400);
    highScore();
    hsText.innerText = `Your highest score is ${hs}`;
    reset();
  }
}

function btnPress() {
  if(gameStart==true) {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
  }
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
  btn.addEventListener("click", btnPress);
}