"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayLosses = displayLosses;

function displayLosses(alliedContainerId, axisContainerId, lossesAllied, lossesAxis) {
  // Function to generate the losses table body for a faction
  function generateLossesRows(losses) {
    var rows = '';
    Object.keys(losses).forEach(function (type) {
      rows += "\n                <tr>\n                    <th scope=\"row\">".concat(type, "</th>\n                    <td>").concat(losses[type], "</td>\n                </tr>");
    });
    return rows;
  } // Get the containers by their IDs


  var alliedContainer = document.getElementById(alliedContainerId);
  var axisContainer = document.getElementById(axisContainerId); // Check if containers exist

  if (alliedContainer && axisContainer) {
    // Generate the losses table for Allied
    alliedContainer.innerHTML = "\n            <table class=\"table table-bordered table-dark table-responsive table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Type</th>\n                        <th scope=\"col\">Losses</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ".concat(generateLossesRows(lossesAllied), "\n                </tbody>\n            </table>"); // Generate the losses table for Axis

    axisContainer.innerHTML = "\n            <table class=\"table table-bordered table-dark table-responsive table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Type</th>\n                        <th scope=\"col\">Losses</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ".concat(generateLossesRows(lossesAxis), "\n                </tbody>\n            </table>");
  } else {
    console.error('Allied or Axis container not found.');
  }
}