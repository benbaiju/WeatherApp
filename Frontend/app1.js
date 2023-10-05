async function fetchData(endpoint, cityName) {
    try {
        const response = await fetch(`http://localhost:8080${endpoint}?cityName=${cityName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
}

async function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    try {
        const weatherData = await fetchData('/weather', cityName);
        displayResult(weatherData);
    } catch (error) {
        
    }
}


async function fetchWeatherArray() {
    const cityName = document.getElementById('cityInput').value;
    try {
        const weatherArray = await fetchData('/weatherArray', cityName);
        displayResult(weatherArray);
    } catch (error) {
       
    }
}

async function fetchMainObject() {
    const cityName = document.getElementById('cityInput').value;
    try {
        const mainObject = await fetchData('/mainObject', cityName);
        displayResult(mainObject);
    } catch (error) {
        
    }
}



function displayResult(data) {
    var resultContainer = document.getElementById('weatherResult');
    resultContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
}

window.getWeather = getWeather;
window.fetchWeatherArray = fetchWeatherArray;
window.fetchMainObject = fetchMainObject;