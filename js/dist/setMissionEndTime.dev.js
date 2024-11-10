"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMissionEndTime = setMissionEndTime;

function setMissionEndTime(missionEndTimeUTC) {
  if (!missionEndTimeUTC) {
    console.warn("Mission End Time is missing or undefined.");
    return;
  }

  var missionEndTime = new Date(missionEndTimeUTC); // Update remaining mission time initially and every second

  updateRemainingTime(missionEndTime);
  setInterval(function () {
    return updateRemainingTime(missionEndTime);
  }, 1000);
}

function updateRemainingTime(missionEndTime) {
  var now = new Date();
  var remainingTime = missionEndTime - now;

  if (remainingTime < 0) {
    remainingTime = 0; // Mission is over
  }

  var hours = Math.floor(remainingTime / (1000 * 60 * 60));
  var minutes = Math.floor(remainingTime % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(remainingTime % (1000 * 60) / 1000); // Format time as HH:MM:SS

  var formattedRemainingTime = "".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0')); // Update remaining time in the DOM

  var remainingTimeElement = document.querySelector('#remainingMissionTimeContainer');

  if (remainingTimeElement) {
    remainingTimeElement.textContent = formattedRemainingTime;
  } else {
    console.error("Element with ID 'remainingMissionTimeContainer' not found.");
  }
}