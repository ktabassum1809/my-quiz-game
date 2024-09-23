let currentQuestionIndex = 0;
let newquizArray = [];
let score = 0;
let username = "";
let quizData = []; // Array of questions
let highScores = 0;
let selectedOption = ""; // Selected option by user
let progressbarStep = 0;
let count = 0; //to count the number of questions answered

let startbtn = document.getElementById("start-btn");

for (let i = 0; i < quizData.length; i++) {
  currentQuestionIndex = Math.floor(Math.random() * quizData.length);
  newquizArray.push(quizData[currentQuestionIndex]);
}

function startQuiz() {
  username = prompt("Please enter your name"); // Get the username
  if (username === null || username === "") {
    document.getElementById("username").innerText = " Hello Player";
  } else {
    document.getElementById("username").innerText = ` Hello ${
      username[0].toUpperCase() + username.slice(1)
    } `;
  }
  let startpage = document.querySelector("#start-page");
  startpage.style.display = "none";
  let quizcontainer = document.querySelector("#quiz-container");
  quizcontainer.style.display = "block";
  loadQuizData();
}

startbtn.addEventListener("click", startQuiz);


async function loadQuizData() {
  const response = await fetch("./quizData.json");
  quizData = await response.json();
  console.log(quizData);
    

  //currentQuestionIndex = Math.floor(Math.random() * quizData.length);
  loadQuestion();
}

function loadQuestion() {


for (let i = 0; i < quizData.length; i++) {
  currentQuestionIndex = Math.floor(Math.random() * quizData.length);
  newquizArray.push(quizData[currentQuestionIndex]);
}
console.log(newquizArray);
  const questionObject = newquizArray[currentQuestionIndex];
  let question = document.getElementById("question");
  question.innerText = questionObject.question;
  loadOptions();
}

function loadOptions() {
  // Load the options for the current question
  const questionObject = newquizArray[currentQuestionIndex];
  const options = questionObject.options;
  for (let i = 0; i < options.length; i++) {
    let optionButton = document.getElementById(`btn${i}`);
    optionButton.innerText = options[i];
    console.log(optionButton.innerText);
  }
  let message = document.getElementById("message");
  message.innerText = "";
  let nextbtn = document.getElementById("next-btn");
  nextbtn.style.display = "none";
}

//to avoid repetation of code we can use the below code.but this code is valid only for 4 options
/* let option1 = document.getElementById("btn0");
  option1.innerText = quizData[currentQuestionIndex].options[0];
 console.log(option1.innerText);
 let option2 = document.getElementById("btn1");
  option2.innerText = quizData[currentQuestionIndex].options[1];
  console.log(option2.innerText);
  let option3 = document.getElementById("btn2");
  option3.innerText = quizData[currentQuestionIndex].options[2];
  console.log(option3.innerText);
  let option4 = document.getElementById("btn3");
  option4.innerText = quizData[currentQuestionIndex].options[3];
  console.log(option4.innerText); */

//event listener on options button
for (let i = 0; i < 4; i++) {
  let optionButton = document.getElementById(`btn${i}`);
  optionButton.addEventListener("click", function (event) {
    selectedOption = event.target;
    console.log(selectedOption);
    if (selectedOption.innerText == newquizArray[currentQuestionIndex].answer) {
      score++;
      let scoreDisplay = document.getElementById("score");
      scoreDisplay.innerText = ` Your Score: ${score}`;
      let message = document.getElementById("message");
      message.innerText = "Correct Answer!";
      selectedOption.style.backgroundColor = "green";
      console.log(score);
    } else {
      let message = document.getElementById("message");
      message.innerText = "Wrong Answer";
      selectedOption.style.backgroundColor = "red";
      console.log("wrong answer");
      let correctOption = document.querySelectorAll(".option-btn"); //to highlight the correct option
      for (let i = 0; i < correctOption.length; i++) {
        if (
          correctOption[i].innerText === newquizArray[currentQuestionIndex].answer
        ) {
          correctOption[i].style.backgroundColor = "green";
        }
      }
    }
    let optButtons = document.querySelectorAll(".option-btn");
    optButtons.forEach((button) => {
      button.disabled = true;
      button.style.opacity = "0.5";
      button.style.cursor = "not-allowed"; //to disable the button after selecting the option
    });

    let nextbtn = document.getElementById("next-btn");
    nextbtn.style.display = "block";
  });
}

//event listener on next button

let nextbtn = document.getElementById("next-btn");
nextbtn.addEventListener("click", function () {
  selectedOption.style.backgroundColor = " #524e4e";
  let optButtons = document.querySelectorAll(".option-btn");
  optButtons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  });
  let correctOption = document.querySelectorAll(".option-btn");
  for (let i = 0; i < correctOption.length; i++) {
    if (correctOption[i].innerText === newquizArray[currentQuestionIndex].answer) {
      correctOption[i].style.backgroundColor = "#524e4e";
    }
  }
  currentQuestionIndex++;
  count++;
  let countForQuestion = document.getElementById("noOfQuestions");
  countForQuestion.innerText = `Question ${count} of ${quizData.length}`;
  console.log(countForQuestion.innerText);
  //loadQuestion();
  let progressBar = document.getElementById("progress-bar-fill");
  progressBar.style.width = `${Math.floor((count / quizData.length) * 100)}%`;
  console.log(progressBar.style.width);
  let progressBarText = document.getElementById("progress-bar-text");
  progressBarText.innerText = progressBar.style.width;

  if (
    // quizData[currentQuestionIndex].question === quizData[quizData.length - 1].question &&
    count < newquizArray.length
  ) {
    //currentQuestionIndex +=1;

    // let question = document.getElementById("question");
    // currentQuestionIndex = 0;
    //currentQuestionIndex = Math.floor(Math.random() * quizData.length);
    // question.innerText = quizData[currentQuestionIndex].question;
    //count++;
    loadQuestion();
    let nextbtn = document.getElementById("next-btn");
    nextbtn.style.display = "block";
  } else if (count === newquizArray.length) {
    endQuiz();
  }
});

function endQuiz() {
  alert("quiz ended");

  let quizcontainer = document.querySelector("#quiz-container");
  quizcontainer.style.display = "none";
  let finalScore = document.getElementById("score-container");
  finalScore.style.display = "block";
  let newscore = document.getElementById("latest-score");
  newscore.innerText = `Your Score: ${score}`;
  newscore.style.color = "blue";
  newscore.style.fontSize = "30px";
  let highScoresDisplay = document.getElementById("high-score");
  highScores = score;
  highScoresDisplay.innerText = `High Score: ${highScores}`;

  if (score > highScores) {
    highScores = score;
  }
  highScoresDisplay.innerText = `High Score: ${highScores}`;
  highScoresDisplay.style.color = "red";
  highScoresDisplay.style.fontSize = "30px";
  score = 0;
  selectedOption = "";
  count = 0;
  currentQuestionIndex = 0;
  let progressBar = document.getElementById("progress-bar-fill");
  progressBar.style.width = "0%";
  console.log(progressBar.style.width);
  let progressBarText = document.getElementById("progress-bar-text");
  progressBarText.innerText = '0%';
}

let restartbtn = document.getElementById("restart");
restartbtn.addEventListener("click", function () {
  let startpage = document.querySelector("#start-page");
  startpage.style.display = "block";
  let finalScore = document.getElementById("score-container");
  finalScore.style.display = "none";
});

let quitbtn = document.getElementById("quit");
quitbtn.addEventListener("click", function () {
  let startpage = document.querySelector("#start-page");
  startpage.style.display = "none";
  let finalScore = document.getElementById("score-container");
  finalScore.style.display = "none";
  let endpage = document.querySelector("#endPage");
  endpage.style.display = "block";
});
