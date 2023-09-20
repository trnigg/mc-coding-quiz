// Variables = Content Containers
const leaderboardListElement = document.getElementById("leaderboard-list");
const resetScoresButton = document.getElementById("reset-button");

// Get existing scores or initialize an empty array
let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

// sorts scores from high to low and then renders as list items
function showScores() {
    userScores.sort(function (a, b) {
        return b.score - a.score;
    });
    leaderboardListElement.innerHTML = "";
    for (let i = 0; i < userScores.length; i++) {
        let userScore = userScores[i];
        let scoreListItem = document.createElement("li");
        scoreListItem.textContent = userScore.initials + " - " + userScore.score + " points";
        leaderboardListElement.appendChild(scoreListItem);
    }
}

// triggers function above when page is opened
showScores();

// adds feature to reset button allowing scores to be wiped
resetScoresButton.addEventListener("click", function(){
   if (confirm("Are you sure you want to reset scores?")){
        localStorage.removeItem("userScores"); //removes from local storage
        leaderboardListElement.innerHTML = ""; //removes from list "on-screen", otherwise changes to local storage only availabnle on refresh
        alert("Scores have been reset."); 
    } else {
        return;
    }
});