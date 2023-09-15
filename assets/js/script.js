    // Declare Variables = Content Containers

    // Declare Global Variables

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



        
        
        