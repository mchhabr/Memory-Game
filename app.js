let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
const maxLevels = 10;

let h2 = document.querySelector("h2");
let scoreDiv = document.getElementById("score");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    if (level >= maxLevels) {
        scoreDiv.innerText = `Congratulations! You completed all ${maxLevels} levels! Your score: ${level}`;
        triggerConfetti();
        resetGame();
        return;
    }

    userSeq = []; 
    level++;
    h2.innerText = `Level ${level}`;
    gameSeq.push(btns[Math.floor(Math.random() * 4)]);

    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            gameFlash(btn);
        }, index * 600); 
    });
}

function checkAns() {
    let currentLevel = userSeq.length - 1;
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            if (level === maxLevels) {
                scoreDiv.innerText = `Congratulations! You completed all ${maxLevels} levels! Your score: ${level}`;
                triggerConfetti();
                resetGame();
            } else {
                setTimeout(levelUp, 1000); 
            }
        }
    } else {
        scoreDiv.innerText = `Game Over! Your score: ${level}. Press any key to start again.`;
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns();
}

function resetGame() {
    started = false;
    gameSeq = []; 
    userSeq = []; 
    level = 0; 
    h2.innerText = `Press any key to start the game`; 
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
