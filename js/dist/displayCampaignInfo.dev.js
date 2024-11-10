"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayCampaignInfo = displayCampaignInfo;

function displayCampaignInfo(data) {
  var missionStartTime = data.CampaignDayMissionStartTime;
  var date = data.Day;
  var daysRemaining = data.DaysRemaining;
  var campaignDay = data.Day.DayInCampaign;

  function formatDate() {
    var day = date.Day.toString().padStart(2, '0'); // Ensure day is two digits

    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var month = monthNames[date.Month - 1]; // Get the 3-letter month abbreviation

    var year = date.Year; // Return the formatted date as 01-JAN-1944

    return "".concat(day, "-").concat(month, "-").concat(year);
  } // Display the data in the respective HTML elements


  document.getElementById('dateContainer').textContent = formatDate();
  document.getElementById('timeContainer').textContent = missionStartTime;
  document.getElementById('daysRemainingContainer').textContent = daysRemaining;
  document.getElementById('campaignDayContainer').textContent = campaignDay;
}