/*
 * Name: Zulkifli Salami
 * File: index.js
 * Description: JavaScript file for a responsive Image Search App that gets input on search parameter from a user and is submitted to a script to generate 
    images related to the input parameter, this is generated using unsplash.com API.
*/ 


// Define a variable as a constant for the API key generated from Unsplash API
const accessKey = "trxtQ1R3zcpqwbkrpecubGZJgaN9Mrj_aoRBe8VRp6Q";

// Define a variable as a constant to target the form being submitted 
const formElement = document.querySelector("form")

// Define a variable as a constant to target the input field of the form being submitted
const searchInputElement = document.getElementById("search-input")

// Define a variable as a constant to target the div class that displays the result of images generated. A class is selected by putting '.'before the class name
const searchResultsElement = document.querySelector(".search-results")

// Define a variable as a constant to target the button that displays more results
const showExtraResultsElement = document.getElementById("show-extra-results")

// Define a variable as a let which is used to store the value of input field of the form
let searchInputData = "";

// Define a variable as a let which is used to indicate the page being displayed. This variable increases in value when the show more button is clicked 
let page = 1;


/**
 * Create a asynchronous function to search Images from the API, i.e., a function that has a delay on a code line using "await"
 */
async function searchImages() {
    // Get value of the input field
    searchInputData = searchInputElement.value; 
    
    // Create a url variable as a constant used to get the information from unspalsh.com using API key
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInputData}&client_id=${accessKey}`;
    
    // Get the response by fetching the URL from the unsplash API
    const response = await fetch(url);

    // Get the data from the response and convert it to data
    const data = await response.json();
    
    // Check if the page is 1, i.e. the show more button hasn't been clicked 
    if (page === 1) {
        // Clear the search results div
        searchResultsElement.innerHTML = "";
    }

    // Create a result variable as a constant that will store the result array gotten from the data 
    const results = data.results;
    // Loop through the results array to get each image
    results.map((result)=>{
        // Create a variable as a const that creates a new div in html file that'll be used to display each object from the results array
        const imageWrapper = document.createElement("div");
        
        // Add a class to the div 
        imageWrapper.classList.add("individual-result");

        // Create a variable as a const that creates a image tag in the html file
        const image = document.createElement("img");
        // Set the src of the image
        image.src = result.urls.small;
        // Set the img alt text
        image.alt = result.alt_description;

        // Create a variable as a const that crates a anchor tag in the html document
        const anchorTag = document.createElement("a");
        //  Set the href of the tag
        anchorTag.href = result.links.html;
        // Set the target of the tag to open it inside a new page
        anchorTag.target = "_blank";
        // Set the text content of the anchor tag
        anchorTag.textContent = result.alt_description;

        // Append the image and anchor tag as children to the image wrapper i.e., the individual-result div 
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(anchorTag);

        // Append the individual-result div to the search-results div
        searchResultsElement.appendChild(imageWrapper);
    }
    );
    
    // Increment the page number
    page++;


    // Check is page is greater than 1, i.e. show more button is clicked, and if the page is less than 1000 i.e. the max result generated from the API
    if (page > 1 && page <= 1000) {
        // Chnage the display in the css style sheet to block
        showExtraResultsElement.style.display = "block";
    }
}



// Add event listener to the form, this allows to trigger a function when form is submitted
formElement.addEventListener("submit", (event)=>{
    event.preventDefault(); // Prevent refresh of page upon clicking submit which is the default function of the page
    page = 1; // Set page = 1 when the form is submitted, without clicking show more button
    searchImages(); // Fetch the data from the API by calling the defined function against the value gotten from the input field 
}
);

// Add event listener to the show more button
showExtraResultsElement.addEventListener("click", (event)=>{
    searchImages(); // Fetch the data from the API again by re-calling the defined function against the value gotten from the input field 
}
);