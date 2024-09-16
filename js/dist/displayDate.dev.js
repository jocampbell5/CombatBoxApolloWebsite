"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.displayDate = displayDate;

function formatDate(date) {
  var day = date.Day.toString().padStart(2, '0'); // Ensure day is two digits

  var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  var month = monthNames[date.Month - 1]; // Get the 3-letter month abbreviation

  var year = date.Year; // Return the formatted date as 01-JAN-1944

  return "".concat(day, "-").concat(month, "-").concat(year);
}

function displayDate(containerId, date) {
  var container = document.getElementById(containerId);

  if (!container) {
    console.error("Element with id \"".concat(containerId, "\" not found."));
    return;
  }

  container.innerHTML = "".concat(date);
}