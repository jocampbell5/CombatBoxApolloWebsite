"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayObjectivesTable = displayObjectivesTable;

function displayObjectivesTable(containerId, objectives) {
  var container = document.getElementById(containerId);

  if (!container) {
    console.error("Element with id \"".concat(containerId, "\" not found."));
    return;
  }

  var output = "\n        <table class=\"table table-bordered table-dark table-responsive table-striped\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Name</th>\n                    <th scope=\"col\">Current Supply</th>\n                    <th scope=\"col\">Max Supply</th>\n                    <th scope=\"col\">Type</th>\n                </tr>\n            </thead>\n            <tbody>"; // Loop through the objectives data and create table rows

  objectives.forEach(function (item) {
    output += "\n            <tr>\n                <th scope=\"row\">".concat(item.Name || 'N/A', "</th>\n                <td>").concat(item.SupplyLevel || 'N/A', "</td>\n                <td>").concat(item.MaxSupplyLevel || 'N/A', "</td>\n                <td class=\"first-letter-cap\">").concat(item.Type || 'N/A', "</td>\n            </tr>");
  });
  output += "\n            </tbody>\n        </table>";
  container.innerHTML = output; // Insert the generated HTML into the container
}