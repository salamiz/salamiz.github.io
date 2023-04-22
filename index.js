/**
 * Name: Zulkifli Salami
 * File: index.js
 * Description: JavaScript file for a responsive Weather App, using the Open Weather API
 * to generate real time weather info about cities all over the world
 */


// Define constant for the API key generated from Open Weather API
const apikey = "ba594f0625895acc3440c3e864f40bfe";

// Define constant for div with id = "weather-data", this targets the info inside the div with the id
const weatherData = document.getElementById("weather-data");

// Define constant for input with id = "city-input", this targets the input inside the field
const cityInput = document.getElementById("city-input");

// Define constant to to target the form directly using a different method since it has no id.
const formEl = document.querySelector("form");

// Add event listener to the form, this allows to trigger a function when form is submitted
formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); // Prevent refresh of page upon clicking submit
    const cityValue = cityInput.value; // Get value of the input field
    getWeatherData(cityValue); // Fetch the data from the API by calling the defined function against the value gotten from the input field 
}
);

/**
 * Create a asynchronous function to get weather from the API, i.e., a function that has a delay on a code line using "await"
 */
async function getWeatherData(cityValue){
    // Try catch used to get the weather data from API incase of an error
    try {
        // use await to fetch data soo the browser waits before going to the next line. Also use `` because its a dynamic link 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        // Check the response using .ok, i.e., if it bring backs any error or not
        if (!response.ok) {
            // display an error message using java script function "Error"
            throw new Error("Network response was not ok");
        } 
        // Convert the response to json i.e., data
        const data = await response.json();

        // Get the data and display using
        // console.log(data); 
        const temperature = Math.round(data.main.temp); // Get temperature from the response data inside the main, temp. Value is rounded.
        const description = data.weather[0].description; // Get description from the response data inside the weather, in the first array inside the description
        const icon = data.weather[0].icon; // Same process as the description
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`, // Get the response data inside the main, feels_like. Value is rounded. Also use `` cause its dynamic
            `Humidity: ${data.main.humidity}%`, // Get the response data inside the main, humidity
            `Wind Speed: ${data.wind.speed}`, // Get the response data inside the wind, speed
        ];

        // Select weather data div and class icon on the web page. Note: Use .icon cause icon is a class
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`; // Change the temperature value on the web page using info gotten from the response
        weatherData.querySelector(".description").textContent = description; // Change the description value on the web page using info gotten from the response

        // Set details using a query selector on weather data class 
        weatherData.querySelector(".details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`).join(""); // Loop through the details result array using the map method with variable "detail" passed to catch each element of the array. This will be a div joined by nothing.
    } catch (error) {
        // Display Error message and empty out output variables for the web page
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent =
        "Error! Input is invalid, please try again";

        weatherData.querySelector(".details").innerHTML = "";
    }
}