"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPilotStreaks = displayPilotStreaks;

function displayPilotStreaks(alliedContainerId, axisContainerId, pilotStreaksAllied, pilotStreaksAxis) {
  // Function to generate the table body HTML for each faction
  function generatePilotRows(pilotStreaks) {
    var rows = ''; // Sort pilots by streak bonus in descending order

    pilotStreaks.sort(function (a, b) {
      return b.StreakBonus - a.StreakBonus;
    });
    pilotStreaks.forEach(function (pilot) {
      var streakValue = Math.round(pilot.StreakBonus * 100); // Convert to whole number percentage

      var missionStreak = pilot.SuccessfulMissionStreak;
      rows += "\n                <tr>\n                    <th scope=\"row\">".concat(pilot.Name, "</th>\n                    <td>").concat(missionStreak, "</td>\n                    <td>").concat(streakValue, "%</td> <!-- Display streak bonus as whole number percentage -->\n                </tr>");
    });
    return rows;
  } // Select the containers


  var alliedContainer = document.getElementById(alliedContainerId);
  var axisContainer = document.getElementById(axisContainerId); // Populate the tables with pilot data

  alliedContainer.innerHTML = generatePilotRows(pilotStreaksAllied);
  axisContainer.innerHTML = generatePilotRows(pilotStreaksAxis);
}