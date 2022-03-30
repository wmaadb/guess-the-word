const playerLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterGuessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

    const getWord= async function () {
        const response = await fetch("https://gist.githubusercontent.com/redrambles/c72ae70504e304519b0e187b0f3dc1a4/raw/72db8cf89b7f5e6f804527c879e800bd6fb0d93c/words.txt");
        const words = await response.text();
        const wordArray = words.split("\n");
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        word = wordArray[randomIndex].trim();
        placeholder(word);
    };

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("☀️");
    }
    wordInProgress.innerText = placeholderLetters.join("");
  };
  
  guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterGuessInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterGuessInput.value = "";
  });

  const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innterText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
  };

  const makeGuess = function (guess) {
      guess = guess.toUpperCase();
      if (guessedLetters.includes(guess)) {
          message.innerText = "You already guessed that letter, silly. Try again.";
      } else {
          guessedLetters.push(guess);
          console.log(guessedLetters);
          updateGuessesRemaining(guess);
          showGuessedLetters();
          updateWordInProgress(guessedLetters);
      }
  };

  const showGuessedLetters = function () {
      playerLettersElement.innerHTML = "";
      for (const letter of guessedLetters) {
          const li = document.createElement("li");
          li.innerText = letter;
          playerLettersElement.append(li);
      }
  };

  const updateWordInProgress = function (guessedLetters) {
      const wordUpper = word.toUpperCase();
      const wordArray = wordUpper.split("");
      const revealWord = [];
      for (const letter of wordArray) {
          if (guessedLetters.includes(letter)) {
              revealWord.push(letter.toUpperCase());
          } else {
              revealWord.push("☀️");
          }
      }
      wordInProgress.innerText = revealWord.join("");
      checkIfWin();
  };

  const updateGuessesRemaining = function (guess) {
      const upperWord = word.toUpperCase();
      if (!upperWord.includes(guess)) {
          message.innerText = `Sorry, the word has no ${guess}.`;
          remainingGuesses -= 1;
      } else {
          message.innerText = `Good guess! The word has the letter ${guess}.`;
      }

      if (remainingGuesses === 0) {
          message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;  
      } else if (remainingGuesses === 1) {
          remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
      } else {
          remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }
  };

  const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };