// Variables = Content Containers/Interactive Elements
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const instructionsElement = document.getElementById("instructions");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-button");
const submitScoreElement = document.getElementById("submit-score");
const yourScoreElement = document.getElementById("your-score");
const submitButton = document.getElementById("submit-button");
const initialsInput = document.getElementById("initials");

// Global Variables
const userScores = JSON.parse(localStorage.getItem('userScores')) || []; // Get existing scores or initialize an empty array (latter is required to 'push' scores)
let questionsIndex = 0;
let timeLeft = 75; // Change to decrease/increase time to complete quiz
let timeInterval;
let userChoice;
const questions = [
    {
        question: "Which language is usually used for styling a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Markdown"],
        correctAnswer: "CSS",
    },
    {
        question: "Which of the following is NOT a valid way to define a variable in JS?",
        answers: ["var", "const", "def", "let"],
        correctAnswer: "def",
    },
    {
        question: "In CSS, which property is used to change the text color of an HTML element?",
        answers: ["font-color", "text-color", "color", "font-style"],
        correctAnswer: "color",
    },
    {
        question: "Which JavaScript function is used to print something to the console?",
        answers: ["console.log()", "print()", "console.print()", "output.log()"],
        correctAnswer: "console.log()",
    },
    {
        question: "Which HTML tag is used to create a hyperlink on a web page?",
        answers: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>",
    },
];

// Hides contents and elements only required at end
submitScoreElement.style.display = "none";

// Renders the time left
function displayTimeLeft() {
    if (timeLeft > 0) {
        timerElement.textContent = ("Time remaining: " + timeLeft + " s");
    } else {
        timerElement.textContent = "No time remaining!";
    }
}

// Starts timer and reduces timeLeft by 1 every second
function startTimer() {
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            // if time left > 0:
            timeLeft--;
            displayTimeLeft();
        } else {
            endQuiz(); 
        }
    }, 1000);
}    

// Gets question according to current index and renders to H1 element
function displayQuestion() {
    let currentQuestion = questions[questionsIndex];
    questionElement.textContent = currentQuestion.question;
}

// Gets answers according to current index and renders to an <ul> element
function displayAnswers() {
    answersElement.innerHTML = ""; //Clears list items already present
    let currentAnswers = questions[questionsIndex].answers;
    for (let i = 0; i < currentAnswers.length; i++) {
        let answerChoices = currentAnswers[i];
        let answerListItem = document.createElement("li");
        answerListItem.textContent = answerChoices;
        answersElement.appendChild(answerListItem);
        answerListItem.addEventListener("click", handleUserChoice);
    }
}

// Triggers the timer and the rendering of questions and answers while hidding/removing the starter contents
function startQuiz(){
    displayTimeLeft(); // need to both display and startTimer or will only display from 74s
    startTimer();
    displayQuestion();
    displayAnswers();
    startButton.style.display = "none";
    instructionsElement.innerHTML = "";
}

// Listen for a click event on start button to trigger the above
startButton.addEventListener("click", function() {
    startQuiz();
});

// Handles user choice and assess for right/wrong, display corrensponding messages and incur time-penalty
function handleUserChoice(event) {
    clearInterval(timeInterval); // stops timer
    let userChoice = event.target.textContent; // records answer
    let answerListItem = document.querySelectorAll("li"); // declares list items and removes the event listener
    for (let i = 0; i < answerListItem.length; i++) {
        answerListItem[i].removeEventListener("click", handleUserChoice);
    }
    resultElement.style.display = "";
    if (userChoice === questions[questionsIndex].correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Wrong!";
        resultElement.style.color = "red";
        // Nested IF prevents scores from falling into the negative when time is deducted for wrong answer
        if (timeLeft < 15) {
            timeLeft = 0;
        } else {
            timeLeft = timeLeft - 15;
        }
        displayTimeLeft();
    }
    setTimeout(resumeQuiz, 2000); //resumes quiz after 2 seconds
}

function resumeQuiz(){
    questionsIndex++;
    resultElement.style.display = "none";
    if (questionsIndex < questions.length && timeLeft > 0) { 
        startTimer();
        displayQuestion();
        displayAnswers();
    } else {
        endQuiz();
    }
}

function endQuiz(){
    questionElement.textContent = "You've reached the end of the quiz!";
    yourScoreElement.textContent = timeLeft;
    answersElement.innerHTML = "";
    submitScoreElement.style.display = "";
    instructionsElement.textContent = "Please enter your initials in the box below and click submit to post your score.";
}

// if nput is empty, will display alert, otherwise records score as key.value to localStorage, navigates to leaderboard page
function saveScore(){
    if (initialsInput.value.trim() === ""){
        alert("Please enter your initials.");
        return;
    } else {
        let userScore = {
            initials: initialsInput.value.trim().toUpperCase(),
            score: timeLeft,
            }; 
    userScores.push(userScore)
    console.log(userScores);
    localStorage.setItem('userScores', JSON.stringify(userScores));
    window.location.href = "/github/projects/mc-coding-quiz/leaderboard.html";
    }
}

//triggers the saveScore function
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveScore();
});