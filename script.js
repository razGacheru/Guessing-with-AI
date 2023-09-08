let userInput = document.getElementById("user-input");
let userButton = document.getElementById("user-btn");
let userAttempts = document.getElementById("user-attempts");
let tip = document.getElementById("tip");
let result = document.getElementById("result");
let userSecretNumber = Math.floor(Math.random() * 100);
let numOfAttempts = 0;
let userDoneGuessing = false;
let computerDoneGuessing = false;

// User guesses function
userButton.addEventListener("click", () => {
  let userGuess = parseInt(userInput.value);
  if (userGuess < userSecretNumber) {
    tip.innerText = "Guess higher";
  } else if (userGuess > userSecretNumber) {
    tip.innerText = "Guess Lower";
  } else {
    userInput.setAttribute("disabled", true);
    userButton.setAttribute("disabled", true);
    userInput.style.border = "1px solid green";
    tip.style.color = "green";
    tip.innerText = "You guessed it!";
    userDoneGuessing = true;

    getWinner();
    return;
  }
  numOfAttempts++;
  userAttempts.innerText = numOfAttempts;

  userInput.style.border = "1px solid red";
});

let computerInput = document.getElementById("computer-input");
let computerButton = document.getElementById("computer-btn");
let computerGuessText = document.getElementById("computer-guess-text");
let computerAttempts = document.getElementById("computer-attempts");
let compNumOfAttempts = 0;

// Computer guesses function
computerButton.addEventListener("click", () => {
  let computerSecretNumber = parseFloat(computerInput.value);
  if (
    computerSecretNumber < 0 ||
    computerSecretNumber > 100 ||
    computerSecretNumber % 1 !== 0
  ) {
    alert("Please enter a number from 0 - 100(inclusive) only.");
    return;
  }

  let min = 0;
  let max = 100;

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
      return; // Exit the function
    }
    computerAttempts.innerText = compNumOfAttempts;

    // Continue the loop after a 1-second delay
    setTimeout(makeGuess, 1000); // 1000 milliseconds = 1 second
  }

  makeGuess(); // Start the first guess
});

function getRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Concludes who/if there is already a winner
function getWinner() {
  if (userDoneGuessing && computerDoneGuessing) {
    if (numOfAttempts < compNumOfAttempts) {
      result.innerText = "You won!🎉";
      tip.innerText = "You won🎉";
      confetti();
    } else {
      tip.innerText = "You lost";
      tip.style.color = "red";
      result.innerText = "You lost";
    }
    compNumOfAttempts = 0;
    numOfAttempts = 0;
    userDoneGuessing = false;
    computerDoneGuessing = false;
    setTimeout(() => {
      let reload = prompt("Play again? Enter Y or N ");
      if (reload.toUpperCase() === "Y") location.reload();
    }, 2000);
  }
}
