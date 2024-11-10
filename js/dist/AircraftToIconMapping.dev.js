"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAircraftIcon = getAircraftIcon;

function getAircraftIcon(type) {
  // Define the icon map, ensuring the type matches filenames in your icon folder
  var iconMap = {
    "fw190a6": "fw 190 a-6.png",
    "fw190a8": "fw 190 a-8.png",
    "bf109g6late": "bf 109 g-6 late.png",
    "bf109g14": "bf 109 g-14.png",
    "bf110g2": "bf 110 g-2.png",
    "me410a1": "me 410 a-1.png" // Add other mappings as needed

  }; // Return the mapped filename or a default icon if not found

  return iconMap[type] || "default-icon.png";
}