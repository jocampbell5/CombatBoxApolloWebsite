"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateImage = updateImage;
exports.toggleAnimation = toggleAnimation;
exports.setSliderMaxValue = setSliderMaxValue;
exports.preloadCampaignImages = preloadCampaignImages;
var intervalId;
var isAnimating = false;

function updateImage() {
  var slider = document.getElementById('myRange');
  var campaignImage = document.getElementById('campaignImage');
  var dayDisplay = document.getElementById('dayDisplay'); // Near slider

  var dayDisplayOverlay = document.getElementById('dayDisplayOverlay'); // On the image

  if (!slider || !campaignImage || !dayDisplay || !dayDisplayOverlay) {
    console.error('Required elements not found in DOM');
    return;
  }

  var sliderValue = parseInt(slider.value);
  var maxValue = parseInt(slider.max);

  if (sliderValue === maxValue) {
    dayDisplay.textContent = "Day ".concat(sliderValue);
    dayDisplayOverlay.textContent = "Day ".concat(sliderValue, " - Current Day"); // Show "Day X - Current Day"
  } else {
    dayDisplay.textContent = "Day: ".concat(sliderValue);
    dayDisplayOverlay.textContent = "Day: ".concat(sliderValue); // Show only "Day X"
  }

  var formattedValue = String(sliderValue).padStart(3, '0');
  var imageUrl = "https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-".concat(formattedValue, "-1200.jpg");
  var modalImageUrl = "https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-".concat(formattedValue, ".jpg");
  campaignImage.src = imageUrl; // Add click event to show modal

  campaignImage.onclick = function () {
    return openImageModal(sliderValue, modalImageUrl);
  };
} // Function to open the modal with the current image


function openImageModal(day, imageUrl) {
  var modalDayDisplay = document.getElementById('modalDayDisplay');
  var modalCampaignImage = document.getElementById('modalCampaignImage');

  if (modalDayDisplay && modalCampaignImage) {
    modalDayDisplay.textContent = day;
    modalCampaignImage.src = imageUrl; // Show the modal

    var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
  } else {
    console.error('Modal elements not found');
  }
}

function toggleAnimation() {
  var slider = document.getElementById('myRange');

  if (isAnimating) {
    clearInterval(intervalId);
    isAnimating = false;
    document.getElementById('toggleAnimationButton').textContent = "Start Animation";
  } else {
    intervalId = setInterval(function () {
      var sliderValue = parseInt(slider.value);
      var maxValue = parseInt(slider.max);
      sliderValue += 1;

      if (sliderValue > maxValue) {
        sliderValue = parseInt(slider.min);
      }

      slider.value = sliderValue;
      updateImage();
    }, 200);
    isAnimating = true;
    document.getElementById('toggleAnimationButton').textContent = "Stop Animation";
  }
}

function setSliderMaxValue(dayInCampaign) {
  var slider = document.getElementById('myRange');

  if (slider) {
    slider.max = dayInCampaign;
    slider.value = dayInCampaign;
    updateImage();
  } else {
    console.error('Slider element not found');
  }
}

function preloadCampaignImages(maxDay) {
  var baseImageUrl = 'https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-';
  var imageExtension = '-1200.jpg';

  for (var day = 1; day <= maxDay; day++) {
    var formattedDay = String(day).padStart(3, '0'); // Format day as '001', '002', etc.

    var imageUrl = "".concat(baseImageUrl).concat(formattedDay).concat(imageExtension);
    var img = new Image();
    img.src = imageUrl; // Start loading the image
  }
}