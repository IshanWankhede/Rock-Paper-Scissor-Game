const choiceBtns = document.querySelectorAll(".choice-btn");

const playerChoiceText = document.querySelector(".player-choice-text")
const cpuChoiceText = document.querySelector(".cpu-choice-text")

const gameTitle = document.querySelector(".game-title")

const scoreWonText = document.querySelector(".score-won-text")
const scoreDrawText = document.querySelector(".score-draw-text")
const scoreLostText = document.querySelector(".score-lost-text")

const resetBtn = document.querySelector(".reset-btn")
const clickSound = document.querySelector("#click-sound");
const drawSound = document.querySelector("#draw-sound");
const winSound = document.querySelector("#win-sound")
const lostSound =document.querySelector("#lost-sound")

let playerResultValue = ""
let cupResultValue = ""

const choiceEmoji = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
}


choiceBtns.forEach((choiceBtn) => {
    choiceBtn.addEventListener("click", () => {
        choiceBtns.forEach((btn) => {
            btn.style.pointerEvents = "none"
        })
        
        gameTitle.textContent = "Let's Play!"
        playerChoiceText.textContent = "✊"
        cpuChoiceText.textContent = "✊"

        playerResultValue = choiceBtn.value
        cupResultValue = getCpuResultValue()

        playerChoiceText.classList.add("player-choice-text-animation")
        cpuChoiceText.classList.add("cpu-choice-text-animation")
        speak(" Rock Paper Scissors!");

        setTimeout(() => {
    
            playerChoiceText.textContent = choiceEmoji[playerResultValue]
            cpuChoiceText.textContent = choiceEmoji[cupResultValue]
            playerChoiceText.classList.remove("player-choice-text-animation")
            cpuChoiceText.classList.remove("cpu-choice-text-animation")
            showResultGame()

            choiceBtns.forEach((btn) => {
                btn.style.pointerEvents = "visible"
            })

        }, 2000)

    })
})

function getCpuResultValue() {
    const cpuOptionChoices = ["rock", "paper", "scissors"]
    const cpuRandomChoice = cpuOptionChoices[Math.floor(Math.random() * cpuOptionChoices.length)]
    return cpuRandomChoice
}

function showResultGame() {
    if (playerResultValue == cupResultValue) {
        gameTitle.textContent = "Draw!"
        scoreDrawText.textContent++
        drawSound.currentTime = 0;
        drawSound.play();
    }
    else if (playerResultValue == "rock" &&
        cupResultValue == "scissors"
        ||
        playerResultValue == "paper" &&
        cupResultValue == "rock"
        ||
        playerResultValue == "scissors" &&
        cupResultValue == "paper"
    ) {
        gameTitle.textContent = "You Won!"
        scoreWonText.textContent++
        winSound.currentTime = 0;
        winSound.play();
    }
    else {
        gameTitle.textContent = "You Lost!"
        scoreLostText.textContent++
        lostSound.currentTime = 0;
        lostSound.play();
    }
}

function resetGame(){
    scoreDrawText.textContent = 0
    scoreLostText.textContent = 0
    scoreWonText.textContent = 0
    gameTitle.textContent = "Let's Play!"
    playerChoiceText.textContent = "✊"
    cpuChoiceText.textContent = "✊"
    clickSound.currentTime = 0;
    clickSound.play();
}

resetBtn.addEventListener("click", resetGame);

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US"; 
  speech.pitch = 2;
  speech.rate = 0.8;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}



