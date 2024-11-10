export function displayWeather(data) {
    const temperature = data.Weather.Temperature;
    const cloudDescription = data.Weather.CloudDescription;
    const windDescription = data.Weather.WindDescription; // e.g., "15 km/h, 120°"
    const nextDayTemperature = data.WeatherTomorrow.Temperature;
    const nextDayCloudDescription = data.WeatherTomorrow.CloudDescription;
    const nextDayWindDescription = data.WeatherTomorrow.WindDescription;

    // Extract wind bearing from description
    const currentWindBearing = parseBearing(windDescription);
    const nextDayWindBearing = parseBearing(nextDayWindDescription);

    // Determine cloud and temperature icons
    const temperatureIconClass = getQWeatherTemperatureIcon(temperature); // Updated for QWeather
    const cloudIconClass = getCloudIcon(cloudDescription);
    const nextDayTemperatureIconClass = getQWeatherTemperatureIcon(nextDayTemperature); // Updated for QWeather
    const nextDayCloudIconClass = getCloudIcon(nextDayCloudDescription);

    // Display today's forecast
    document.getElementById('temperatureContainer').innerHTML = `
        <i class="${temperatureIconClass}"></i> ${temperature}°C`;

    document.getElementById('cloudsContainer').innerHTML = `
        <i class="${cloudIconClass}"></i> ${cloudDescription}`;

    document.getElementById('windsContainer').innerHTML = `
        <i class="wi wi-wind from-${Math.round(currentWindBearing / 10) * 10}-deg"></i> ${windDescription}`;

    // Display tomorrow's forecast
    document.getElementById('nextDayTemperatureContainer').innerHTML = `
        <i class="${nextDayTemperatureIconClass}"></i> ${nextDayTemperature}°C`;

    document.getElementById('nextDayCloudsContainer').innerHTML = `
        <i class="${nextDayCloudIconClass}"></i> ${nextDayCloudDescription}`;

    document.getElementById('nextDayWindsContainer').innerHTML = `
        <i class="wi wi-wind from-${Math.round(nextDayWindBearing / 10) * 10}-deg"></i> ${nextDayWindDescription}`;
}

// Helper function to extract wind bearing
function parseBearing(windDescription) {
    const match = windDescription.match(/(\d{1,3})°/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0°
}

// Helper function to get QWeather temperature icon
function getQWeatherTemperatureIcon(temperature) {
    if (temperature <= 0) return 'qi-2217'; // Freezing or below
    if (temperature > 0 && temperature <= 20) return 'fa-solid fa-temperature-half'; // Mild
    return 'qi-hot'; // Hot
}

// Helper function to get cloud icon based on description
function getCloudIcon(description) {
    description = description.toLowerCase();
    if (description.includes('clear')) return 'wi wi-day-sunny';
    if (description.includes('partly')) return 'wi wi-day-cloudy';
    if (description.includes('overcast')) return 'wi wi-cloudy';
    if (description.includes('rain')) return 'wi wi-rain';
    if (description.includes('storm')) return 'wi wi-thunderstorm';
    return 'wi wi-cloud'; // Default cloud icon
}