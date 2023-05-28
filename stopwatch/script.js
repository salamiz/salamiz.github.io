/*
Name: Zulkifli Salami
File: script.js
Description: JavaScript file for a Stopwatch app adding functionalities to buttons in a HTML document.
*/

// Define a variable to reference to the timer id
const timerElement = document.getElementById("timer");

// Define a variable to reference to the buttons
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");


// Define a variable for browser start time
let startTime = 0;
// Define a variable for the time elapsed on the stopwatch
let elapseTime = 0;
let timerInterval;


// Create a function to format time
function formatTime(elapseTime) {
    // Define a variable to reference to milliseconds
    const milliseconds = Math.floor((elapseTime % 1000) / 10);
    
    // Define a variable as a const to reference to seconds
    const seconds = Math.floor((elapseTime % (1000 * 60)) / 1000);
    
    // Define a variable as a const to reference to minutes
    const minutes = Math.floor((elapseTime % (1000 * 60 * 60)) / (1000 * 60));
    
    // Define a variable as a const to reference to hours
    const hours = Math.floor(elapseTime / (1000 * 60 * 60));
      
    return (
        /* 
        Check if set variable is not equal to zero for minutes and seconds, then
        (Check if set variables is greater than 9 then return set variables if true, else add 0 at the beginning of variable),
        else return 00 if variable is zero
        */
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" +
        // Check if milliseconds is greater than 9 then return milliseconds if true, else add 0 at the beginning of variable
        (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
}


// Create a function startTimer to determine the elapsed time on the clock
function startTimer() {
    /* Set the value of startTime incase the stopwatch has already started i.e. time has elapsed. 
    This is gotten using date of the browser, which is subtracted from the elapsed time
    */
    startTime = Date.now() - elapseTime;

    //  Define the time interval, and call a function every 10ms
    timerInterval = setInterval(function() {
        // Update the elapsed time
        elapseTime = Date.now() - startTime;
        // Display the elapsed time
        timerElement.textContent = formatTime(elapseTime);
    }, 10)

    // Disable the start button
    startButton.disabled = true;
    // Enable the stop button
    stopButton.disabled = false;
}

// Create a function stopTimer
function stopTimer() {
    // Clear the time interval
    clearInterval(timerInterval);
    // Enable the start button
    startButton.disabled = false;
    // Disable the stop button
    stopButton.disabled = true;
}

// Create a function resetTimer
function resetTimer() {
    // Clear the time interval
    clearInterval(timerInterval);
    // Reset the elapsed time
    elapseTime = 0;
    // Reset the startTime
    startTime = 0;
    // Display the elapsed time
    timerElement.textContent = "00:00:00";
    // Enable the start button
    startButton.disabled = false;
    // Disable the stop button
    stopButton.disabled = true;
}


// Add event listener to the button start which triggers a function startTimer
startButton.addEventListener("click", startTimer);
// Add event listener to the button stop which triggers a function stopTimer
stopButton.addEventListener("click", stopTimer);
// Add event listener to the button reset which triggers a function resetTimer
resetButton.addEventListener("click", resetTimer);
