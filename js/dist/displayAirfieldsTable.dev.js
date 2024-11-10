"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayAirfieldsTable = displayAirfieldsTable;

var _getAircraftIcon = require("./getAircraftIcon.js");

var _getReconPhotos = require("./getReconPhotos.js");

// Import the icon mapping functions
function displayAirfieldsTable(containerId, airfields) {
  var container = document.getElementById(containerId);
  var output = "\n        <table class=\"table table-bordered table-dark table-responsive table-striped\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Name</th>\n                    <th scope=\"col\">Country</th>\n                    <th scope=\"col\">Supply</th>\n                    <th scope=\"col\">Runway</th> <!-- Combined column for arrow and value -->\n                    <th scope=\"col\">Type</th>\n                </tr>\n            </thead>\n            <tbody>";
  airfields.forEach(function (item, index) {
    var maxSupply = 200; // Assuming 200 is the max supply

    var currentSupplyPercent = item.SupplyLevel / maxSupply * 100;
    var arrowStyle = "transform: rotate(".concat(item.RunwayBearing, "deg);"); // Rotate based on bearing

    output += "\n            <tr class=\"selectable-row\" data-index=\"".concat(index, "\" style=\"cursor: pointer;\">\n                <th scope=\"row\">").concat(item.Name, "</th>\n                <td>").concat(item.Country, "</td>\n                <td>\n                    <div class=\"supply-bar-container\">\n                        <div class=\"supply-bar\"\n                             style=\"width: ").concat(currentSupplyPercent, "%; background-color: ").concat(calculateBarColor(currentSupplyPercent), ";\">\n                        </div>\n                          <div class=\"supply-bar-airfeild-overlay\" data-supply=\"").concat(item.SupplyLevel, "\" data-max=\"").concat(item.MaxSupplyLevel, "\">\n                            ").concat(item.SupplyLevel, "\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <i class=\"fa-solid fa-arrow-up\" style=\"").concat(arrowStyle, "\" title=\"Runway Bearing: ").concat(item.RunwayBearing, "\xB0\"></i>\n                    ").concat(item.RunwayBearing, "\xB0\n                </td>\n                <td>").concat(item.RunwayIsConcrete ? 'Concrete' : 'Grass', "</td>\n            </tr>");
  });
  output += "\n            </tbody>\n        </table>";
  container.innerHTML = output;
  container.querySelectorAll('tr[data-index]').forEach(function (row) {
    row.addEventListener('click', function () {
      var index = this.getAttribute('data-index');
      openAirfieldModal(airfields[index]);
    });
  });

  function openAirfieldModal(data) {
    var reconPhotos = (0, _getReconPhotos.getReconPhoto)(data.Name); // Get the image paths array

    var airframesContainer = document.getElementById('airframesContainer');
    var reconPhotosOutput = '';

    if (reconPhotos.length > 0 && reconPhotos.every(function (photo) {
      return photo !== "";
    })) {
      reconPhotos.forEach(function (photo) {
        reconPhotosOutput += "<img src=\"./imgs/ReconPhotos/BigNormandy/".concat(photo, "\" alt=\"").concat(data.Name, "\" class=\"img-fluid my-2 w-100\">");
      });
    } else {
      reconPhotosOutput = "\n                <img src=\"./imgs/ReconPhotos/NoReconPhotoAvailable.png\" alt=\"".concat(data.Name, "\" class=\"img-fluid my-2 w-100\">");
    }

    if (data.AvailableAirframes.length === 0) {
      airframesContainer.innerHTML = "\n                ".concat(reconPhotosOutput, "\n                <p class=\"px-3 py-3 text-start\">The airfield is closed. <br> You can land and finish mission at this field.<br> You can rearm, repair, and refuel at this field.</p>");
    } else {
      var airframesOutput = "\n                ".concat(reconPhotosOutput, "\n                <table class=\"table table-bordered table-dark table-striped\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Image</th>\n                            <th scope=\"col\">Plane</th>\n                            <th scope=\"col\">Nickname</th>\n                            <th scope=\"col\">Availability</th>\n                        </tr>\n                    </thead>\n                    <tbody>");
      data.AvailableAirframes.forEach(function (airframe) {
        var iconPath = (0, _getAircraftIcon.getAircraftIcon)(airframe.Type);
        var numberAvailable = airframe.NumberAvailable === -1 ? 'Unlimited' : airframe.NumberAvailable;
        airframesOutput += "\n                    <tr>\n                        <td><img src=\"./imgs/AircraftIcons/".concat(iconPath, "\" alt=\"").concat(airframe.Type, "\" width=\"124\" height=\"42\"></td>\n                        <td>").concat(airframe.ReadableName || 'N/A', "</td>\n                        <td>").concat(airframe.ColloquialName, "</td>\n                        <td>").concat(numberAvailable, "</td>\n                    </tr>");
      });
      airframesOutput += "\n                </tbody>\n            </table>";
      airframesContainer.innerHTML = airframesOutput;
    }

    var modalTitle = document.getElementById('airfieldModalLabel');
    modalTitle.textContent = data.Name;
    var airfieldModal = new bootstrap.Modal(document.getElementById('airfieldModal'));
    airfieldModal.show();
  }
} // Dynamic RGB calculation for bar color


function calculateBarColor(value) {
  var green = [40, 167, 69]; // RGB for #28a745

  var red = [220, 53, 69]; // RGB for #dc3545

  var r = Math.round(red[0] + (green[0] - red[0]) * (value / 100));
  var g = Math.round(red[1] + (green[1] - red[1]) * (value / 100));
  var b = Math.round(red[2] + (green[2] - red[2]) * (value / 100));
  return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
} // Helper function to determine Font Awesome arrow class based on bearing


function getFontAwesomeArrowClass(bearing) {
  var direction = Math.round(bearing / 45) % 8; // Divide circle into 8 parts (45° each)

  var directions = ['fa-arrow-up', // 0° - 44°
  'fa-arrow-up-right', // 45° - 89°
  'fa-arrow-right', // 90° - 134°
  'fa-arrow-down-right', // 135° - 179°
  'fa-arrow-down', // 180° - 224°
  'fa-arrow-down-left', // 225° - 269°
  'fa-arrow-left', // 270° - 314°
  'fa-arrow-up-left' // 315° - 359°
  ];
  return directions[direction];
}