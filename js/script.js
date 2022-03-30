const playerLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
  };
  
  placeholder(word);
  
  guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterGuessInput.value;
    console.log(guess);
    letterGuessInput.value = "";
  });