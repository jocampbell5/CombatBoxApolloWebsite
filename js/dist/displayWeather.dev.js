"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayWeather = displayWeather;

function displayWeather(data) {
  var temperature = data.Weather.Temperature;
  var cloudDescription = data.Weather.CloudDescription;
  var windDescription = data.Weather.WindDescription;
  var nextDaytemperature = data.WeatherTomorrow.Temperature;
  var nextDaycloudDescription = data.WeatherTomorrow.CloudDescription;
  var nextDaywindDescription = data.WeatherTomorrow.WindDescription; // Display the data in the respective HTML elements

  document.getElementById('temperatureContainer').textContent = "".concat(temperature, "\xB0C");
  document.getElementById('cloudsContainer').textContent = cloudDescription;
  document.getElementById('windsContainer').textContent = windDescription;
  document.getElementById('nextDayTemperatureContainer').textContent = "".concat(nextDaytemperature, "\xB0C");
  document.getElementById('nextDayCloudsContainer').textContent = nextDaycloudDescription;
  document.getElementById('nextDayWindsContainer').textContent = nextDaywindDescription;
}