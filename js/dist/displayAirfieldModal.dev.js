"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openAirfieldModal = openAirfieldModal;

function openAirfieldModal(elementID, data) {
  // Populate airframes data
  console.log(data.AvailableAirframes);
  var airframesContainer = document.getElementById(elementID);
  var airframesOutput = "\n        <table class=\"table table-bordered table-dark table-striped\">\n            <thead>\n                <tr>\n                    <th scope=\"row\">Friendly Name</th>\n                    <th scope=\"row\">Number Available</th>\n                    <th scope=\"row\">Type</th>\n                </tr>\n            </thead>\n        <tbody>\n        ";
  data.AvailableAirframes.forEach(function (airframe) {
    airframesOutput += "\n            <tr>\n                <td>".concat(airframe.FriendlyName, "</td>\n                <td>").concat(airframe.NumberAvailable, "</td>\n                <td>").concat(airframe.Type || 'N/A', "</td>\n            </tr>");
  });
  airframesOutput += "</tbody></table>";
  airframesContainer.innerHTML = airframesOutput; // Show the modal

  var airfieldModal = new bootstrap.Modal(document.getElementById('airfieldModal'));
  airfieldModal.show();
}