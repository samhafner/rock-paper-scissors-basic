// define all necessary variables
let userChoice = null;
let computerChoice = null;
let userScore = 0; 
let computerScore = 0; 
const options = ["r", "p", "s"];
const rockImage = `<img src="./img/icons8-hand-rock-skin-type-2-96.png" alt="">`;
const paperImage = `<img src="./img/icons8-stop-gesture-skin-type-2-96.png" alt="">`;
const scissorsImage = `<img src="./img/icons8-hand-scissors-skin-type-2-96.png" alt="">`;
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");

const gameButtons = [document.getElementById("rock-btn"), document.getElementById("paper-btn"), document.getElementById("scissors-btn")]
// add event listeners to all buttons
for (const button of gameButtons) {
    button.addEventListener("click", (e) => playRound(e))
};
document.getElementById("reset-btn").addEventListener("click", reset);

function playRound(e) {
    if (e.currentTarget.id === "rock-btn") userChoice = options[0];
    else if (e.currentTarget.id === "paper-btn") userChoice = options[1];
    else if (e.currentTarget.id === "scissors-btn") userChoice = options[2];
    updateChoices("user", userChoice);

    computerChoice = randomChoice();
    updateChoices("computer", computerChoice);
    winnerEvaluation();
    updateScore(); 
}

function reset() {
    userScore = 0; 
    computerScore = 0;
    updateScore();
    userChoiceDisplay.innerHTML = "";
    computerChoiceDisplay.innerHTML = "";
    resultDisplay.innerHTML = "Make your move";
}

// function to choose randomly from the 3 options
function randomChoice() {
    const rnd = Math.floor(Math.random() * options.length);
    return options[rnd];
}

// update the choice display in the HTML
function updateChoices(target, choice) {
    switch (choice) {
        case "r":
            if (target === "user") {
                userChoiceDisplay.innerHTML = rockImage;
            } else if (target === "computer") {
                computerChoiceDisplay.innerHTML = rockImage;
            }
            break;
        case "p":
            if (target === "user") {
                userChoiceDisplay.innerHTML = paperImage;
            } else if (target === "computer") {
                computerChoiceDisplay.innerHTML = paperImage;
            }
            break;
        case "s":
            if (target === "user") {
                userChoiceDisplay.innerHTML = scissorsImage;
            } else if (target === "computer") {
                computerChoiceDisplay.innerHTML = scissorsImage;
            }
            break;
    }
}


function winnerEvaluation() {
    if (userChoice === computerChoice) {
        resultDisplay.innerHTML = "Tie."
    }

    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            resultDisplay.innerHTML = `${convertToWord(userChoice)} covers ${convertToWord(computerChoice)}. You win!`;
            userScore++;
            break;
        case "sr":
        case "rp":
        case "ps":
            resultDisplay.innerHTML = `${convertToWord(computerChoice)} beats ${convertToWord(userChoice)}. You lose!`;
            computerScore++;
            break;
    }
}

function convertToWord(choice) {
    switch (choice) {
        case "r": 
            return "Rock";
        case "p": 
            return "Paper";
        case "s":
            return "Scissors";
    }
}

function updateScore() {
    document.getElementById("user-score").innerHTML = userScore;
    document.getElementById("computer-score").innerHTML = computerScore;
}