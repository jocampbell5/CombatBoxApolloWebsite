"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPilotStreaks = displayPilotStreaks;

function displayPilotStreaks(alliedTopFiveId, alliedRemainingId, axisTopFiveId, axisRemainingId, pilotStreaksAllied, pilotStreaksAxis) {
  function generatePilotRows(pilotGroup) {
    var isSelectable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var rows = '';
    pilotGroup.forEach(function (pilot) {
      var streakValue = Math.round(pilot.StreakBonus * 100); // Convert to whole number percentage

      var missionStreak = streakValue / 10;
      rows += "\n                <tr ".concat(isSelectable ? "class=\"selectable-row\" data-pilot=\"".concat(pilot.Name, "\" style=\"cursor: pointer;\"") : '', ">\n                    <th scope=\"row\">").concat(pilot.Name, "</th>\n                    <td>").concat(missionStreak, "</td>\n                    <td>").concat(streakValue, "%</td> <!-- Display streak bonus as whole number percentage -->\n                </tr>");
    });
    return rows;
  } // Filter out pilots with a StreakBonus of 0


  pilotStreaksAllied = pilotStreaksAllied.filter(function (pilot) {
    return pilot.StreakBonus > 0;
  });
  pilotStreaksAxis = pilotStreaksAxis.filter(function (pilot) {
    return pilot.StreakBonus > 0;
  }); // Sort the pilot streaks by StreakBonus in descending order

  pilotStreaksAllied.sort(function (a, b) {
    return b.StreakBonus - a.StreakBonus;
  });
  pilotStreaksAxis.sort(function (a, b) {
    return b.StreakBonus - a.StreakBonus;
  }); // Split Allied pilots into top five and remaining

  var alliedTopFive = pilotStreaksAllied.slice(0, 5);
  var alliedRemaining = pilotStreaksAllied.slice(5); // Split Axis pilots into top five and remaining

  var axisTopFive = pilotStreaksAxis.slice(0, 5);
  var axisRemaining = pilotStreaksAxis.slice(5); // Select the containers for top five and remaining pilots

  var alliedTopFiveContainer = document.getElementById(alliedTopFiveId);
  var alliedRemainingContainer = document.getElementById(alliedRemainingId);
  var axisTopFiveContainer = document.getElementById(axisTopFiveId);
  var axisRemainingContainer = document.getElementById(axisRemainingId); // Populate the tables with pilot data for both top five and remaining

  alliedTopFiveContainer.innerHTML = generatePilotRows(alliedTopFive, true); // Selectable rows

  alliedRemainingContainer.innerHTML = generatePilotRows(alliedRemaining, false); // Non-selectable rows

  axisTopFiveContainer.innerHTML = generatePilotRows(axisTopFive, true); // Selectable rows

  axisRemainingContainer.innerHTML = generatePilotRows(axisRemaining, false); // Non-selectable rows
  // Add event listeners only to selectable rows

  document.querySelectorAll('.selectable-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var pilotName = this.getAttribute('data-pilot');
      fetchPilotData(pilotName);
    });
  });

  function fetchPilotData(pilotName) {
    var jsonUrl = "https://m2.combatbox.net/big-normandy-campaign/".concat(encodeURIComponent(pilotName), ".json");
    fetch(jsonUrl).then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }).then(function (data) {
      showPilotModal(data);
    })["catch"](function (error) {
      console.error('Error fetching pilot data:', error);
      showPilotModal({
        PlayerName: pilotName,
        error: true
      }); // Pass an error flag to the modal
    });
  }

  function showPilotModal(data) {
    var modalElement = document.getElementById('pilotModal');
    var modalTitle = modalElement.querySelector('.modal-title');
    var modalBody = modalElement.querySelector('.modal-body');
    modalTitle.textContent = data.PlayerName || 'N/A';

    if (data.error) {
      modalBody.innerHTML = "<p>No story for this pilot.</p>";
    } else {
      var eventsHtml = '';
      data.Events.forEach(function (event) {
        eventsHtml += "\n                    <tr>\n                        <td>".concat(event.EventType, "</td>\n                        <td>").concat(event.DateTime, "</td>\n                        <td>").concat(event.Position, "</td>\n                        <td>").concat(event.AirfieldName || event.EnemyType || 'N/A', "</td>\n                    </tr>");
      });
      modalBody.innerHTML = "\n                <p><strong>Aircraft Type:</strong> ".concat(data.AircraftType, "</p>\n                <p><strong>Country:</strong> ").concat(data.Country, "</p>\n                <p><strong>Coalition:</strong> ").concat(data.Coalition, "</p>\n                <table class=\"table table-bordered table-dark table-striped\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Event</th>\n                            <th scope=\"col\">Time</th>\n                            <th scope=\"col\">Position</th>\n                            <th scope=\"col\">Details</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ").concat(eventsHtml, "\n                    </tbody>\n                </table>");
    }

    var modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}