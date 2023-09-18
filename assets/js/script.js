// Declare Variables = Content Containers

const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const instructionsElement = document.getElementById("instructions");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-button");

console.log(timerElement.textContent);
console.log(questionElement.textContent);
console.log(instructionsElement.textContent);
console.log(answersElement.textContent);
console.log(resultElement.textContent);
console.log(startButton.textContent);



// Declare Global Variables


// Two methods for questions' array:
/* Method 1 const questions array of objects with answers as array = [
    {
        question: "What is the capital of Switzerland?",
        choices: ["Zurich", "Berlin", "Bern", "Vienna"],
        correctAnswer: "Bern",
    },
];
*/

/* Method 2 const questions array of objects with answers as arrays of objects= [
    {
        question: "What is the capital of Switzerland?",
        answers: [
            {text: "Zurich", correct: false},
            {text: "Berlin", correct: false},
            {text: "Bern", correct: true},
            {text: "Vienna", correct: false},
        ],

    },
];
*/
// for now prefer method 1 - maybe checking functionwill be asier w method 2


// TODO: Add more questions:
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
    // TODO: Add more questions:
];

console.log(questions);

let questionsIndex = 0;
let timeLeft = 75; //TODO: Increase to 75 once confirmed its printing to head

// Gets question according to current index and writes to H1 element
function displayQuestion() {
    let currentQuestion = questions[questionsIndex];
    questionElement.textContent = currentQuestion.question;
}

//  Gets answers according to current index and using loop for each creates a list item under <ol>


// TODO Finish:
function displayAnswers() {
    let currentAnswers = questions[questionsIndex].answers;
    for (let i = 0; i < currentAnswers.length; i++) {
        let answerChoices = currentAnswers[i];
        let answerListItem = document.createElement("li");
        answerListItem.textContent = answerChoices;
        answersElement.appendChild(answerListItem);
        answerListItem.addEventListener("click", handleUserChoice);
    }
}


function displayTimeLeft() {
    timerElement.textContent = ("Time remaining: " + timeLeft + " s");
}


function startTimer() {
    let timeInterval = setInterval(function() {
        // if time left > 0:
        timeLeft--;
        displayTimeLeft();
        // else stop interval, end timer and quiz --> end screen
    }, 1000);
}

function startQuiz(){
    displayTimeLeft(); // need to both display and startTimer or will only display from 74s
    startTimer();
    displayQuestion();
    displayAnswers();
    startButton.style.display = "none";
    instructionsElement.style.display = "none";
}

// Listen for a click event on start
startButton.addEventListener("click", function() {
    startQuiz();

});

function handleUserChoice(event) {
    let userChoice = event.target.textContent;
    console.log(userChoice);
    evalAnswer();
}

function evalAnswer() { //need to disable further clicks
//     let answerListItem = document.querySelectorAll("li");
//     answerListItem.removeEventListener("click", handleUserChoice);

}

// On page load
    // get scores for leaderboard.html from localStorage
    // Display Start Message / Instructions
    // Diplay Start Button

// On start button click
    // (Button event listener)
    // preventDefault
    // Event:
        // Hide start button:
        // Start timer
            // Set time = 75 seconds
            // Reduce timer by 1 per 1000ms interval
            // End quiz when timer reaches 0
        // Show question
        // Show answers

// On answer click
    // (Button event listener)
    // Event:
        // record answer
        // check result
            // pause timer
            // if wrong:
                // reduce time by 15 seconds
                // display "Wrong X" message
                    // Set message to red
            // if correct
                // display Display "Correct [tick]" message
                    // Set message to green
        // load next question/answer set

// Quiz end
    // When timer reaches 0, or;
    // When all questions are answered
        // stop timer
    // show name input
    // show submit score button

// Submit score
    // on click (eventListener)
    // set score into localStorage, using entered name as key
    // go to leaderboard
    

// leaderboard    
    // display 2 buttons:
        // "Go back"
            //on click event reset page
        // "Reset scores"
            // take to leaderboard.html on click clear scores



    
