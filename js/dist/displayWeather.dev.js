"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayWeather = displayWeather;

function displayWeather(data) {
  var temperature = data.Weather.Temperature;
  var cloudDescription = data.Weather.CloudDescription;
  var windDescription = data.Weather.WindDescription; // e.g., "15 km/h, 120°"

  var nextDayTemperature = data.WeatherTomorrow.Temperature;
  var nextDayCloudDescription = data.WeatherTomorrow.CloudDescription;
  var nextDayWindDescription = data.WeatherTomorrow.WindDescription; // Extract wind bearing from description

  var currentWindBearing = parseBearing(windDescription);
  var nextDayWindBearing = parseBearing(nextDayWindDescription); // Determine cloud and temperature icons

  var temperatureIconClass = getQWeatherTemperatureIcon(temperature); // Updated for QWeather

  var cloudIconClass = getCloudIcon(cloudDescription);
  var nextDayTemperatureIconClass = getQWeatherTemperatureIcon(nextDayTemperature); // Updated for QWeather

  var nextDayCloudIconClass = getCloudIcon(nextDayCloudDescription); // Display today's forecast

  document.getElementById('temperatureContainer').innerHTML = "\n        <i class=\"".concat(temperatureIconClass, "\"></i> ").concat(temperature, "\xB0C");
  document.getElementById('cloudsContainer').innerHTML = "\n        <i class=\"".concat(cloudIconClass, "\"></i> ").concat(cloudDescription);
  document.getElementById('windsContainer').innerHTML = "\n        <i class=\"wi wi-wind from-".concat(Math.round(currentWindBearing / 10) * 10, "-deg\"></i> ").concat(windDescription); // Display tomorrow's forecast

  document.getElementById('nextDayTemperatureContainer').innerHTML = "\n        <i class=\"".concat(nextDayTemperatureIconClass, "\"></i> ").concat(nextDayTemperature, "\xB0C");
  document.getElementById('nextDayCloudsContainer').innerHTML = "\n        <i class=\"".concat(nextDayCloudIconClass, "\"></i> ").concat(nextDayCloudDescription);
  document.getElementById('nextDayWindsContainer').innerHTML = "\n        <i class=\"wi wi-wind from-".concat(Math.round(nextDayWindBearing / 10) * 10, "-deg\"></i> ").concat(nextDayWindDescription);
} // Helper function to extract wind bearing


function parseBearing(windDescription) {
  var match = windDescription.match(/(\d{1,3})°/);
  return match ? parseInt(match[1], 10) : 0; // Default to 0°
} // Helper function to get QWeather temperature icon


function getQWeatherTemperatureIcon(temperature) {
  if (temperature <= 0) return 'qi-2217'; // Freezing or below

  if (temperature > 0 && temperature <= 20) return 'fa-solid fa-temperature-half'; // Mild

  return 'qi-hot'; // Hot
} // Helper function to get cloud icon based on description


function getCloudIcon(description) {
  description = description.toLowerCase();
  if (description.includes('clear')) return 'wi wi-day-sunny';
  if (description.includes('partly')) return 'wi wi-day-cloudy';
  if (description.includes('overcast')) return 'wi wi-cloudy';
  if (description.includes('rain')) return 'wi wi-rain';
  if (description.includes('storm')) return 'wi wi-thunderstorm';
  return 'wi wi-cloud'; // Default cloud icon
}