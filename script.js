const duelMessage = [
  "Human vs. AI: The Ultimate Number Guessing Showdown Begins!",
  "Man vs. Machine: Who Can Guess the Mystery Number?",
  "A Battle of Wits: Human Challenger Takes on AI in Number Guessing.",
  "The Great Number Guessing Duel: Human Brain vs. AI Algorithm.",
  "AI vs. Human: Can Artificial Intelligence Outguess Human Intuition?",
];

const modal = document.getElementById("hidden");
const close = document.getElementById("close");
const playAgain = document.getElementById("play-again-btn");

// User variables
const userInput = document.getElementById("user-input");
const userButton = document.getElementById("user-btn");
const userAttempts = document.getElementById("user-attempts");
const userTip = document.getElementById("tip");
let userSecretNumber = null;
let userNumOfAttempts = 0;
let userDoneGuessing = false;

// Computer variables
let computerInput = document.getElementById("computer-input");
let computerButton = document.getElementById("computer-btn");
let computerGuessText = document.getElementById("computer-guess-text");
let computerAttempts = document.getElementById("computer-attempts");
let compNumOfAttempts = 0;
let computerDoneGuessing = false;

let rangeInput = null;
let rangePicked = false;
const rangeBtn = document.getElementById("input-range-button");

const result = document.getElementById("result");

// Sets the user's desired range.
rangeBtn.addEventListener("click", () => {
  rangeInput = parseInt(document.getElementById("input-range").value);
  rangeBtn.setAttribute("disabled", "true");
  userSecretNumber = Math.floor(Math.random() * rangeInput);
  rangePicked = true;
  document.getElementById("begin-message").innerText =
    duelMessage[userSecretNumber % 5];
});

// Handles events when user tries to guess.
userButton.addEventListener("click", () => {
  if (!rangePicked) {
    alert("Please pick a secret number range from above");
    return;
  }

  const userGuess = parseInt(userInput.value);
  if (isNaN(userGuess)) {
    alert("Please enter a guess");
    return;
  }

  if (userGuess < userSecretNumber) {
    userTip.innerText = "Guess higher";
  } else if (userGuess > userSecretNumber) {
    userTip.innerText = "Guess Lower";
  } else {
    userInput.setAttribute("disabled", true);
    userButton.setAttribute("disabled", true);
    userInput.style.border = "1px solid green";
    userTip.style.color = "green";
    userTip.innerText = "You guessed it!";
    userDoneGuessing = true;

    getWinner();
    return;
  }
  userNumOfAttempts++;
  userAttempts.innerText = userNumOfAttempts;

  userInput.style.border = "1px solid red";
});

// Computer's algorithm for guessing.
computerButton.addEventListener("click", () => {
  if (!rangePicked) {
    alert("Please pick a secret number range from above");
    return;
  }

  const computerSecretNumber = parseFloat(computerInput.value);
  if (
    computerSecretNumber < 0 ||
    computerSecretNumber > rangeInput ||
    computerSecretNumber % 1 !== 0
  ) {
    alert(`Please enter a number from 0 - ${rangeInput}(inclusive) only.`);
    return;
  }

  let min = 0;
  let max = rangeInput;
  let computerGuess = getRange(min, max);

  function makeGuess() {
    computerGuessText.innerText = `Computer Guess: ${computerGuess}`;
    if (computerGuess < computerSecretNumber) {
      compNumOfAttempts++;
      min = computerGuess + 1;
      computerGuess = getRange(min, max);
    } else if (computerGuess > computerSecretNumber) {
      compNumOfAttempts++;
      max = computerGuess - 1;
      computerGuess = getRange(min, max);
    } else {
      // The computer has guessed the correct number
      computerAttempts.innerText = compNumOfAttempts;
      computerInput.setAttribute("disabled", true);
      computerButton.setAttribute("disabled", true);
      computerDoneGuessing = true;
      getWinner();
      return;
    }
    computerAttempts.innerText = compNumOfAttempts;

    // Continue the loop after a 1-second delay
    setTimeout(makeGuess, 1000);
  }

  // Start the guessing
  makeGuess();
});

// Helper function for computer guessing.
function getRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// handle for user pressing "Enter" key instead of clicking the button.
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && event.target.id === "user-input") {
      userButton.click();
    }

    if (event.key === "Enter" && event.target.id === "computer-input") {
      computerButton.click();
    }
  });
});

// Concludes who/if both are done guessing.
function getWinner() {
  if (userDoneGuessing && computerDoneGuessing) {
    if (userNumOfAttempts < compNumOfAttempts) {
      result.innerText = "You won!🎉";
      userTip.innerText = "You won🎉";
      confetti();
    } else if (userNumOfAttempts > compNumOfAttempts) {
      userTip.innerText = "You lost";
      userTip.style.color = "red";
      result.innerText = "You lost";
    } else {
      userTip.innerText = "Draw";
      result.innerText = "Draw";
    }
    compNumOfAttempts = 0;
    userNumOfAttempts = 0;
    userDoneGuessing = false;
    computerDoneGuessing = false;

    setTimeout(() => (modal.style.display = "block"), 2000);
  }
}

close.addEventListener("click", () => {
  modal.style.display = "none";
});

playAgain.addEventListener("click", () => location.reload());
