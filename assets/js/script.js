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

console.log(questions);

let questionsIndex = 0;
let timeLeft = 75; 
let timeInterval;
let userChoice;

// On page load
    // get scores for leaderboard.html from localStorage
    // Display Start Message / Instructions
    // Diplay Start Button



function displayTimeLeft() {
    if (timeLeft > 0) {
        timerElement.textContent = ("Time remaining: " + timeLeft + " s");
    } else {
        timerElement.textContent = "No time remaining!";
    }
    
}


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
} //not sure if the nesting is right here. Also need to skype last question when near end.


// Gets question according to current index and writes to H1 element
function displayQuestion() {
    let currentQuestion = questions[questionsIndex];
    questionElement.textContent = currentQuestion.question;
}

//  Gets answers according to current index and using loop for each creates a list item under <ol>


// TODO Finish:
function displayAnswers() {
    answersElement.innerHTML = "";
    let currentAnswers = questions[questionsIndex].answers;
    for (let i = 0; i < currentAnswers.length; i++) {
        let answerChoices = currentAnswers[i];
        let answerListItem = document.createElement("li");
        answerListItem.textContent = answerChoices;
        answersElement.appendChild(answerListItem);
        answerListItem.addEventListener("click", handleUserChoice);
    }
}

function startQuiz(){
    displayTimeLeft(); // need to both display and startTimer or will only display from 74s
    startTimer();
    displayQuestion();
    displayAnswers();
    startButton.style.display = "none";
    instructionsElement.innerHTML = "";
}

// Listen for a click event on start
startButton.addEventListener("click", function() {
    startQuiz();

});

function handleUserChoice(event) {
    let userChoice = event.target.textContent;
    let answerListItem = document.querySelectorAll("li");
    for (let i = 0; i < answerListItem.length; i++) {
        answerListItem[i].removeEventListener("click", handleUserChoice);
    }
    console.log(answerListItem);
    console.log(userChoice);
    console.log(questions[questionsIndex].correctAnswer);
    clearInterval(timeInterval);

    // checkAnswer();
    resultElement.style.display = "";
    if (userChoice === questions[questionsIndex].correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Wrong!";
        resultElement.style.color = "red";
        timeLeft = timeLeft - 15;
        displayTimeLeft();
    }





    setTimeout(resumeQuiz, 2000);
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
    answersElement.innerHTML = "";
    questionElement.textContent = "You've reached the end of the quiz!"
    instructionsElement.textContent = "Please enter your initials in the box below and click submit to post your score."
}

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

