"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayWarEffort = displayWarEffort;

function displayWarEffort(data) {
  var alliedControlledObjectives = data.AlliedControlledPointsToday;
  var axisControlledObjectives = data.AxisControlledPointsToday;
  var alliedSupplyToday = data.AlliedSupplyToday;
  var axisSupplyToday = data.AxisSupplyToday;
  var currentDayStateDescription = data.CurrentDayStateDescription;
  var previousDayEventsDescription = data.PreviousDaysEventsDescription; // Display the data in the respective HTML elements

  document.getElementById('alliedControlledObjectivesContainer').textContent = alliedControlledObjectives;
  document.getElementById('axisControlledObjectivesContainer').textContent = axisControlledObjectives;
  document.getElementById('alliedSupplyContainer').textContent = alliedSupplyToday;
  document.getElementById('axisSupplyContainer').textContent = axisSupplyToday;
  document.getElementById('currentDayStateDescriptionContainer').innerHTML = currentDayStateDescription;
  document.getElementById('previousDayEventsDescriptionContainer').innerHTML = previousDayEventsDescription;
}