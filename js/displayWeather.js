export function displayWeather(data) {
    const temperature = data.Weather.Temperature;
    const cloudDescription = data.Weather.CloudDescription;
    const windDescription = data.Weather.WindDescription;
    const nextDaytemperature = data.WeatherTomorrow.Temperature;
    const nextDaycloudDescription = data.WeatherTomorrow.CloudDescription;
    const nextDaywindDescription = data.WeatherTomorrow.WindDescription;



    // Display the data in the respective HTML elements
    document.getElementById('temperatureContainer').textContent = `${temperature}°C`;
    document.getElementById('cloudsContainer').textContent = cloudDescription;
    document.getElementById('windsContainer').textContent = windDescription;
    document.getElementById('nextDayTemperatureContainer').textContent = `${nextDaytemperature}°C`;
    document.getElementById('nextDayCloudsContainer').textContent = nextDaycloudDescription;
    document.getElementById('nextDayWindsContainer').textContent = nextDaywindDescription;
}