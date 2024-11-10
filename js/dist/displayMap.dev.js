"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayMap = displayMap;

function displayMap(dayData, mapContainerId) {
  var dayInCampaign = dayData.DayInCampaign;
  var formattedDay = dayInCampaign.toString().padStart(3, '0'); // Construct the dynamic URLs

  var mapUrl = "https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-".concat(formattedDay, ".jpg");
  var smallMapUrl = "https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-".concat(formattedDay, "-small.jpg"); // Adjust this if you have a smaller version
  // Generate the HTML for the link and image

  var mapHtml = "\n        <a href=\"".concat(mapUrl, "\" target=\"_blank\">\n            <img src=\"").concat(smallMapUrl, "\"  class=\"img-fluid\" alt=\"Campaign Map\">\n        </a>\n    "); // Find the container and set its innerHTML

  var mapContainer = document.getElementById(mapContainerId);

  if (mapContainer) {
    mapContainer.innerHTML = mapHtml;
  }
}