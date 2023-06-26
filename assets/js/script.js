
  // getters
  const quizContainer = document.getElementById("quiz-container");
  const questionContainer = document.getElementById("question-container");
  const optionContainer = document.getElementById("option-container");
  const submitButton = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const restart = document.getElementById("again");
  const scoreCounter = document.getElementById("score-counter");
  let currentQuestion = 0;
  let score = 0;
  restart.style.visibility = "hidden";
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionContainer.innerText = currentQuizData.question;
    optionContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.innerText = option;
      optionElement.addEventListener("click", () => selectOption(index));
      optionContainer.appendChild(optionElement);
    });
  }
  /**
   * his function is called when the user selects an answer
   * @param {*} optionIndex the button index that was pressed 
   */
  function selectOption(optionIndex) {
    const currentQuizData = quizData[currentQuestion];
    // check if the option selected is the answer held in quizData
    if (optionIndex === currentQuizData.answer) {
      score ++;
      scoreCounter.innerText = score.toString();
      console.log('hey that right!');
      console.log('score: ', score);
    } else {
      console.log('got got that wrong!');
    }
    showNextQuestion();
  }
  // disable options after selection
  const options = optionContainer.getElementsByClassName("option");
  // loop through the options array and disable the click event
  Array.from(options).forEach(option => {
    option.removeEventListener("click", selectOption);
    option.classList.add("disabled");
  });
  function showNextQuestion() {
    currentQuestion ++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  function showResult() {
    quizContainer.style.display = "none";
    resultContainer.innerText = `You scored ${score} out of ${quizData.length}`;
    resultContainer.style.display = 'block';
    restart.style.visibility = 'visible';
  }
  function shuffleQuizData() {
    for (let i = quizData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
  }
  shuffleQuizData();
  loadQuestion();