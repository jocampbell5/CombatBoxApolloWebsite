"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAircraftIcon = getAircraftIcon;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAircraftIcon(type) {
  var _iconMap;

  // Define the icon map, ensuring the type matches filenames in your icon folder
  var iconMap = (_iconMap = {
    "fw190a6": "fw 190 a-6.png",
    "fw190a8": "fw 190 a-8.png",
    "bf109g6late": "bf 109 g-6 late.png",
    "bf109g14": "bf 109 g-14.png",
    "bf110g2": "bf 110 g-2.png",
    "me410a1": "me 410 a-1.png",
    "bf109g6as": "bf 109 g-6as.png",
    "ju88a4": "ju 88 a-4.png",
    "ju88c6": "ju 88 c-6.png",
    "spitfiremkixc": "spitfire mk.ixc.png",
    "typhoonmkib": "typhoon mk.ib.png",
    "spitfiremkixe": "spitfire mk.ixe.png",
    "p51b5": "p-51b-5.png",
    "a20b": "a-20b.png",
    "mosquitofbmkvis2": "mosquito f.b. mk.vi ser.2.png",
    "c47a": "c-47a.png"
  }, _defineProperty(_iconMap, "fw190a6", "fw 190 a-6.png"), _defineProperty(_iconMap, "fw190a8", "fw 190 a-8.png"), _defineProperty(_iconMap, "p47d22", "p-47d-22.png"), _defineProperty(_iconMap, "p47d28", "p-47d-28.png"), _defineProperty(_iconMap, "p38j25", "p-38j-25.png"), _defineProperty(_iconMap, "p51d15", "p-51d-15.png"), _defineProperty(_iconMap, "ju523mg4e", "ju 52 3mg4e.png"), _iconMap); // Return the mapped filename or a default icon if not found

  return iconMap[type] || "default-icon.png";
}