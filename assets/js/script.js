
/*jshint esversion: 6 */
// get elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionsElement = document.getElementById("questions");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("summary");
const restartElement = document.getElementById("restart-game");
const scoreCounter = document.getElementById("score-counter");

const maxQuestions = 6;

// declare aux variables
let currentQuestion = 0;
let score = 0;


/**
* Change the state of an element. This is used to show or hide a container when interacting with the game buttons
*/
function changeState(elem, show) {
  // show is true if show is true
  if (show === true) {
    elem.style.visibility = "visible";
    elem.style.display = "block";
  } else {
    elem.style.visibility = "hidden";
    elem.style.display = "none";
  }
}

/**
* Shows or hides the start container. 
*/
function showStartContainer(show = true) {
  changeState(startScreen, show);
}


/**
* Shows or hides the quiz container. 
*/
function showQuizContainer(show = true) {
  changeState(quizScreen, show);
}


/**
* Shows or hides the result container. 
*/
function showResultContainer(show = true) {
  let message = showMessageScore(score);
  resultElement.innerText = `${message}\n\n You scored ${score} out of ${maxQuestions}`;
  changeState(resultElement, show);

}

/**
* Shows or hides the restart container.
*/
function showRestartContainer(show = true) {
  changeState(restartElement, show);
}

/**
* Starts the game by showing the Quiz page. This is called at the bottom of this file
*/
function startGame() {
  showStartContainer(true);
  showQuizContainer(false);
  showRestartContainer(false);
}

/**
* Shuffles the quiz data loads the question and starts the quiz container.
*/
function startQuiz() {
  shuffleQuizData();
  loadQuestion();

  showQuizContainer(true);
  showRestartContainer(false);
  showStartContainer(false);
}

/**
* Prints the result to the user and restarts the game if the player wants. 
*/
function showResult() {
  showRestartContainer(true);
  showResultContainer(true);
  showQuizContainer(false);
}


/**
* Shows the message that corresponds to the score.
*/
function showMessageScore(score) {
  let message = "";
  if (score >= 5) {
    message = "YOU ROCK!";
  } else if (score >= 3) {
    message = "NOT TO BAD!";
  } else {
    message = "YOU SHOULD LISTEN MORE HEAVY METAL!";
  }

  return message;
}

/**
* Loads the data for the current question into the quiz. This is called every time the user clicks on a question option
*/
function loadQuestion() {
  const currentQuizData = data[currentQuestion];
  questionsElement.innerText = currentQuizData.question;
  optionsElement.innerHTML = "";
  currentQuizData.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.innerText = option;
    optionElement.addEventListener("click", () => selectOption(index));
    optionsElement.appendChild(optionElement);
  });
}

/**
* Selects an option and increases score by 1 if the option selected is the right answer
*/
function selectOption(optionIndex) {
  const currentQuizData = data[currentQuestion];
  // This function is called when the answer is selected.
  if (optionIndex === currentQuizData.answer) {
    score++;
    scoreCounter.innerText = score.toString();
    console.log('hey that right!');
    console.log('score: ', score);
  } else {
    console.log('got got that wrong!');
  }
  showNextQuestion();
}
// disable options after selection
const options = optionsElement.getElementsByClassName("option");
// loop through the options array and disable the click event
Array.from(options).forEach(option => {
  option.removeEventListener("click", selectOption);
  option.classList.add("disabled");
});

/**
* Show the next question in the question list or load the result if there are no more questions to show
*/
function showNextQuestion() {
  currentQuestion++;
  // Load the question if the current question is less than maxQuestions.
  if (currentQuestion < maxQuestions) {
    loadQuestion();
  } else {
    showResult();
  }
}


/**
* Shuffle QuizData to make it easier to play with it.
*/
function shuffleQuizData() {
  // Creates a random quiz data array.
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
}

startGame();
