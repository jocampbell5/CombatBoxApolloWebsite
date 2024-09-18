"use strict";

var _displayAirfieldsTable = require("./displayAirfieldsTable.js");

var _displayObjectivesTable = require("./displayObjectivesTable.js");

var _displayDate = require("./displayDate.js");

var _displayWeather = require("./displayWeather.js");

var _displayWarEffort = require("./displayWarEffort.js");

var _displayPilotStreaks = require("./displayPilotStreaks.js");

var _displayLosses = require("./displayLosses.js");

// Import or include the other JavaScript files
document.addEventListener('DOMContentLoaded', function () {
  fetch('./apollo-campaign.json') // Ensure path is correct
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json(); // Parse the JSON data
  }).then(function (data) {
    console.log("Fetched data:", data);
    var airfieldsData = data.Airfields;
    var objectivesData = data.Objectives;
    var formattedDate = (0, _displayDate.formatDate)(data.Day);
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
    }

    (0, _displayPilotStreaks.displayPilotStreaks)('alliedPilotStreaks', 'axisPilotStreaks', pilotStreaksAllied, pilotStreaksAxis);
    (0, _displayAirfieldsTable.displayAirfieldsTable)('alliedTableContainer', alliedAirfields);
    (0, _displayAirfieldsTable.displayAirfieldsTable)('axisTableContainer', axisAirfields);
    (0, _displayObjectivesTable.displayObjectivesTable)('alliedObjectivesContainer', alliedObjectives);
    (0, _displayObjectivesTable.displayObjectivesTable)('axisObjectivesContainer', axisObjectives);
    (0, _displayDate.displayDate)('dateContainer', formattedDate);
    (0, _displayWeather.displayWeather)(data);
    (0, _displayWarEffort.displayWarEffort)(data);
    (0, _displayLosses.displayLosses)('alliedLossesContainer', 'axisLossesContainer', lossesAllied, lossesAxis);
  })["catch"](function (error) {
    return console.error('Error fetching JSON:', error);
  });
});