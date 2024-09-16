"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayAirfieldsTable = displayAirfieldsTable;

function displayAirfieldsTable(containerId, airfields) {
  var container = document.getElementById(containerId);
  var output = "\n        <table class=\"table table-bordered table-dark table-responsive table-striped\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Name</th>\n                    <th scope=\"col\">Country</th>\n                    <th scope=\"col\">Supply</th>\n                    <th scope=\"col\">Runway</th>\n                    <th scope=\"col\">Type</th>\n                </tr>\n            </thead>\n            <tbody>"; // Loop through the airfields data and create table rows

  airfields.forEach(function (item, index) {
    output += "\n            <tr class=\"selectable-row\" data-index=\"".concat(index, "\" style=\"cursor: pointer;\">\n                <th scope=\"row\">").concat(item.Name, "</th>\n                <td>").concat(item.Country, "</td>\n                <td>").concat(item.SupplyLevel, "</td>\n                <td>").concat(item.RunwayBearing, "\xB0</td>\n                <td>").concat(item.RunwayIsConcrete ? 'Concrete' : 'Grass', "</td>\n            </tr>");
  });
  output += "\n            </tbody>\n        </table>";
  container.innerHTML = output; // Insert the generated HTML into the container
  // Add event listeners to each row

  container.querySelectorAll('tr[data-index]').forEach(function (row) {
    row.addEventListener('click', function () {
      var index = this.getAttribute('data-index');
      openAirfieldModal(airfields[index]); // Pass the specific airfield data
    });
  });

  function openAirfieldModal(data) {
    // Populate airframes data
    var airframesContainer = document.getElementById('airframesContainer');

    if (data.AvailableAirframes.length === 0) {
      // If no airframes, display a message
      airframesContainer.innerHTML = "<p class=\"px-3 py-3 text-start\">The airfield is closed. <br> You can land and finish mission at this field.<br> You can rearm, repair, and refuel at this field.</p>";
    } else {
      var airframesOutput = "\n            <table class=\"table table-bordered table-dark table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Plane</th>\n                        <th scope=\"col\">Availability</th>\n                        <th scope=\"col\">Type</th>\n                    </tr>\n                </thead>\n                <tbody>";
      data.AvailableAirframes.forEach(function (airframe) {
        var numberAvailable = airframe.NumberAvailable === -1 ? 'Unlimited' : airframe.NumberAvailable;
        airframesOutput += "\n                <tr>\n                    <td>".concat(airframe.FriendlyName, "</td>\n                    <td>").concat(numberAvailable, "</td>\n                    <td>").concat(airframe.Type || 'N/A', "</td>\n                </tr>");
      });
      airframesOutput += "\n            </tbody>\n        </table>";
      airframesContainer.innerHTML = airframesOutput;
    } // Set the modal title


    var modalTitle = document.getElementById('airfieldModalLabel');
    modalTitle.textContent = data.Name; // Show the modal

    var airfieldModal = new bootstrap.Modal(document.getElementById('airfieldModal'));
    airfieldModal.show();
  }
}