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


function displayResult(data) {
    var resultContainer = document.getElementById('weatherResult');

    if (Array.isArray(data)) {
        
        resultContainer.innerHTML = arrayToTable(data);
    } else if (typeof data === 'object') {
        
        resultContainer.innerHTML = objectToTable(data);
    } else {
        
        resultContainer.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    }
}


function arrayToTable(data) {
    if (data.length === 0) {
        return '<p>No data available</p>';
    }

    const tableHeaders = Object.keys(data[0]);
    const tableRows = data.map(row => Object.values(row));

    const table = `
        <table>
            <thead>
                <tr>${tableHeaders.map(header => `<th>${header}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${tableRows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
        </table>
    `;

    return table;
}

function objectToTable(data) {
    const tableRows = Object.entries(data);

    const table = `
        <table>
            <tbody>
                ${tableRows.map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        
                        return `<tr><th>${key}</th><td>${nestedObjectToTable(value)}</td></tr>`;
                    } else {
                        
                        return `<tr><th>${key}</th><td>${value}</td></tr>`;
                    }
                }).join('')}
            </tbody>
        </table>
    `;

    return table;
}


function nestedObjectToTable(nestedObject) {
    if (Array.isArray(nestedObject)) {
       
        return arrayToTable(nestedObject);
    }

    const nestedTableRows = Object.entries(nestedObject);

    return `
        <table>
            <tbody>
                ${nestedTableRows.map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        
                        return `<tr><th>${key}</th><td>${nestedObjectToTable(value)}</td></tr>`;
                    } else {
                     
                        return `<tr><th>${key}</th><td>${value}</td></tr>`;
                    }
                }).join('')}
            </tbody>
        </table>
    `;
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


window.getWeather = getWeather;
window.fetchWeatherArray = fetchWeatherArray;
window.fetchMainObject = fetchMainObject;
