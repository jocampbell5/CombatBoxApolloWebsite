"use strict";

var _displayAirfieldsTable = require("./displayAirfieldsTable.js");

var _displayObjectivesTable = require("./displayObjectivesTable.js");

var _displayWeather = require("./displayWeather.js");

var _displayWarEffort = require("./displayWarEffort.js");

var _displayPilotStreaks = require("./displayPilotStreaks.js");

var _displayLosses = require("./displayLosses.js");

var _displayCampaignInfo = require("./displayCampaignInfo.js");

var _setMissionEndTime = require("./setMissionEndTime.js");

var _campaignMapSlider = require("./campaignMapSlider.js");

// Import the map display function and other modules
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-latest.json.aspx').then(function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }).then(function (data) {
    console.log("Fetched data:", data);
    var airfieldsData = data.Airfields;
    var objectivesData = data.Objectives;
    var pilotStreaksAllied = data.PilotStreaksAllied;
    var pilotStreaksAxis = data.PilotStreaksAxis;
    var lossesAllied = data.LossesAllied;
    var lossesAxis = data.LossesAxis;
    var alliedAirfields = [],
        axisAirfields = [];
    var alliedObjectives = [],
        axisObjectives = [];

    if (Array.isArray(airfieldsData)) {
      alliedAirfields = airfieldsData.filter(function (item) {
        return item.Coalition === "Allies";
      });
      axisAirfields = airfieldsData.filter(function (item) {
        return item.Coalition === "Axis";
      });
    }

    if (Array.isArray(objectivesData)) {
      alliedObjectives = objectivesData.filter(function (item) {
        return item.Coalition === "Allies";
      });
      axisObjectives = objectivesData.filter(function (item) {
        return item.Coalition === "Axis";
      });
    } // Display components


    (0, _displayPilotStreaks.displayPilotStreaks)('alliedTopFiveId', 'alliedRemainingId', 'axisTopFiveId', 'axisRemainingId', pilotStreaksAllied, pilotStreaksAxis);
    (0, _displayAirfieldsTable.displayAirfieldsTable)('alliedTableContainer', alliedAirfields);
    (0, _displayAirfieldsTable.displayAirfieldsTable)('axisTableContainer', axisAirfields);
    (0, _displayObjectivesTable.displayObjectivesTable)('alliedObjectivesContainer', alliedObjectives);
    (0, _displayObjectivesTable.displayObjectivesTable)('axisObjectivesContainer', axisObjectives);
    (0, _displayWeather.displayWeather)(data);
    (0, _displayWarEffort.displayWarEffort)(data);
    (0, _displayLosses.displayLosses)('alliedLossesContainer', 'axisLossesContainer', lossesAllied, lossesAxis);
    (0, _displayCampaignInfo.displayCampaignInfo)(data);
    (0, _setMissionEndTime.setMissionEndTime)(data.EstimatedMissionEnd);
    (0, _campaignMapSlider.setSliderMaxValue)(data.Day.DayInCampaign); // Initialize the first image and display

    (0, _campaignMapSlider.updateImage)(); // Attach event listeners

    var slider = document.getElementById('myRange');
    slider.addEventListener('input', _campaignMapSlider.updateImage);
    var button = document.getElementById('toggleAnimationButton');
    button.addEventListener('click', _campaignMapSlider.toggleAnimation);
    var maxDay = data.Day.DayInCampaign; // Assuming this gives the total days

    (0, _campaignMapSlider.preloadCampaignImages)(maxDay); // Preload images for all campaign days
  })["catch"](function (error) {
    return console.error('Error fetching JSON:', error);
  });
});