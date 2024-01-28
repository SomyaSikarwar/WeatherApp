const APIkey = 'fa8ddcf9bb27333815af2b18c0fbee7b';

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log(data);

        // Check if the API response contains the necessary data
        if (data.main && data.name && data.main.humidity && data.wind && data.wind.speed) {
            updateWeatherData(data);
        } else {
            console.error('Invalid data received from the API');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const weatherConditionElement = document.getElementById("weather-condition");

function updateWeatherData(data) {
    const temperature = Math.round(data.main.temp);
    const weatherCondition = getWeatherCondition(temperature);

    cityElement.textContent = `City: ${data.name}`;
    temperatureElement.textContent = `${temperature}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Display weather condition
    weatherConditionElement.textContent = `${weatherCondition}`;
}

function getWeatherCondition(temperature) {
    if (temperature > 20) {
        return "Sunny";
    } else if (temperature <= 20 && temperature > 10) {
        return "Cold";
    } else {
        return "Freezing";
    }
}

const formElement = document.querySelector(".search-container");
const inputElement = document.querySelector(".search");

formElement.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        getWeatherData(city);
        inputElement.value = "";
    }
});
