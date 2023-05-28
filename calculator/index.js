/*
 * Name: Zulkifli Salami
 * File: index.js
 * Description: JavaScript file for a functional Calculator App that adds 
    event listeners to buttons on a HTML document to execute specific tasks.
*/ 


// Define a Variable to select the buttons in the HTML document
const buttons = document.querySelectorAll("button");

// Define a Variable to select the input field in the HTML document
const inputElement = document.getElementById("result");


// Create a for loop to target each of the button in the HTML document
for (let i = 0; i < buttons.length; i++){
    // Add event listener to each of the button defined by the variable "i" in the for loop used to count each button 
    // from 0 up to 1 less than the length of buttons i.e, total number of buttons. The event listener will be for a click, which then triggers a function
    buttons[i].addEventListener("click", () =>{
        // Define a Variable to select the text content of the button in the HTML document
        const buttonValue = buttons[i].textContent;
        // Set a condition to the value of the button
        if (buttonValue === "C"){
            // Call a function to clear input field
            clearResult();
        } else if (buttonValue === "="){
            //  Call a function to calculate result
            calculateResult();
        } else {
            // Call a function to add the Value of the button to the input field
            appendValue(buttonValue);
        }
    })
}


// Function to clear the input field
function clearResult() {
    // Set the input field value to an empty string
    inputElement.value = "";
}

// Function to perform calculation
function calculateResult() {
    // Evaluate the expression inside the input field using the "eval" function. The answer is then displayed in the input field
    inputElement.value = eval(inputElement.value)
}

// Function to grab value from button and display it to the input field
function appendValue(buttonValue) {
    // Add the input field value to the button value
    inputElement.value += buttonValue
}