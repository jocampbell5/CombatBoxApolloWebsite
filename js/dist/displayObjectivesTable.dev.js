"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayObjectivesTable = displayObjectivesTable;

var _getReconPhotos = require("./getReconPhotos.js");

function displayObjectivesTable(containerId, objectives) {
  var container = document.getElementById(containerId);

  if (!container) {
    console.error("Element with id \"".concat(containerId, "\" not found."));
    return;
  }

  var output = "\n        <table class=\"table table-bordered table-dark table-responsive table-striped\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Name</th>\n                    <th scope=\"col\">Supply</th>\n                    <th scope=\"col\">Type</th>\n                </tr>\n            </thead>\n            <tbody>";
  objectives.forEach(function (item) {
    var currentSupplyPercent = item.SupplyLevel / item.MaxSupplyLevel * 100;
    output += "\n            <tr data-bs-toggle=\"modal\" data-bs-target=\"#objectiveModal\" \n                class=\"selectable-row\" \n                data-objective='".concat(JSON.stringify(item), "' \n                style=\"cursor: pointer;\">\n                <th scope=\"row\">").concat(item.Name || 'N/A', "</th>\n                <td>\n                    <div class=\"supply-bar-container position-relative\">\n                        <div class=\"supply-bar\" \n                             style=\"width: ").concat(currentSupplyPercent, "%; background-color: ").concat(calculateBarColor(currentSupplyPercent), ";\">\n                        </div>\n                        <div class=\"supply-bar-overlay\" \n                             data-supply=\"").concat(item.SupplyLevel, "\" \n                             data-max=\"").concat(item.MaxSupplyLevel, "\">\n                            ").concat(item.SupplyLevel, " / ").concat(item.MaxSupplyLevel, "\n                        </div>\n                    </div>\n                </td>\n                <td class=\"first-letter-cap\">").concat(item.Type || 'N/A', "</td>\n            </tr>");
  });
  output += "\n            </tbody>\n        </table>";
  container.innerHTML = output; // Adjust supply bar text on window resize

  adjustSupplyText();
  window.addEventListener('resize', adjustSupplyText); // Add modal show event listener

  var modalElement = document.getElementById('objectiveModal');
  modalElement.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget; // Button that triggered the modal

    var objective = JSON.parse(button.getAttribute('data-objective')); // Extract objective data

    var modalTitle = modalElement.querySelector('.modal-title');
    var modalBody = modalElement.querySelector('.modal-body');
    modalTitle.textContent = objective.Name || 'N/A'; // Get recon photos for the objective

    var reconPhotos = (0, _getReconPhotos.getReconPhoto)(objective.Name);
    var imageSrc = reconPhotos.length > 0 ? "./imgs/ReconPhotos/BigNormandy/".concat(reconPhotos[0]) : './imgs/ReconPhotos/NoReconPhotoAvailable.png';
    modalBody.innerHTML = "\n            <img src=\"".concat(imageSrc, "\" class=\"img-fluid my-2 w-100\" alt=\"").concat(objective.Name, "\">\n            <table class=\"table table-bordered table-dark table-striped mt-2\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Current Supply</th>\n                        <th scope=\"col\">Max Supply</th>\n                        <th scope=\"col\">Type</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td>").concat(objective.SupplyLevel || 'N/A', "</td>\n                        <td>").concat(objective.MaxSupplyLevel || 'N/A', "</td>\n                        <td>").concat(objective.Type || 'N/A', "</td>\n                    </tr>\n                </tbody>\n            </table>");
  });
}

function adjustSupplyText() {
  var overlays = document.querySelectorAll('.supply-bar-overlay');
  var isLargeOrSmaller = window.matchMedia('(max-width: 1200px)').matches;
  overlays.forEach(function (overlay) {
    var supply = overlay.getAttribute('data-supply');
    var max = overlay.getAttribute('data-max');
    overlay.textContent = isLargeOrSmaller ? supply : "".concat(supply, " / ").concat(max);
  });
}

function calculateBarColor(value) {
  var green = [40, 167, 69];
  var red = [220, 53, 69];
  var r = Math.round(red[0] + (green[0] - red[0]) * (value / 100));
  var g = Math.round(red[1] + (green[1] - red[1]) * (value / 100));
  var b = Math.round(red[2] + (green[2] - red[2]) * (value / 100));
  return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
}