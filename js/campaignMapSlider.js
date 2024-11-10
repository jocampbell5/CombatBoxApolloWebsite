let intervalId;
let isAnimating = false;

export function updateImage() {
    const slider = document.getElementById('myRange');
    const campaignImage = document.getElementById('campaignImage');
    const dayDisplay = document.getElementById('dayDisplay'); // Near slider
    const dayDisplayOverlay = document.getElementById('dayDisplayOverlay'); // On the image

    if (!slider || !campaignImage || !dayDisplay || !dayDisplayOverlay) {
        console.error('Required elements not found in DOM');
        return;
    }

    const sliderValue = parseInt(slider.value);
    const maxValue = parseInt(slider.max);

    if (sliderValue === maxValue) {
        dayDisplay.textContent = `Day ${sliderValue}`;
        dayDisplayOverlay.textContent = `Day ${sliderValue} - Current Day`; // Show "Day X - Current Day"
    } else {
        dayDisplay.textContent = `Day: ${sliderValue}`;
        dayDisplayOverlay.textContent = `Day: ${sliderValue}`; // Show only "Day X"
    }

    const formattedValue = String(sliderValue).padStart(3, '0');
    const imageUrl = `https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-${formattedValue}-1200.jpg`;
    const modalImageUrl = `https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-${formattedValue}.jpg`;

    campaignImage.src = imageUrl;

    // Add click event to show modal
    campaignImage.onclick = () => openImageModal(sliderValue, modalImageUrl);
}



// Function to open the modal with the current image
function openImageModal(day, imageUrl) {
    const modalDayDisplay = document.getElementById('modalDayDisplay');
    const modalCampaignImage = document.getElementById('modalCampaignImage');

    if (modalDayDisplay && modalCampaignImage) {
        modalDayDisplay.textContent = day;
        modalCampaignImage.src = imageUrl;

        // Show the modal
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    } else {
        console.error('Modal elements not found');
    }
}




export function toggleAnimation() {
    const slider = document.getElementById('myRange');

    if (isAnimating) {
        clearInterval(intervalId);
        isAnimating = false;
        document.getElementById('toggleAnimationButton').textContent = "Start Animation";
    } else {
        intervalId = setInterval(() => {
            let sliderValue = parseInt(slider.value);
            const maxValue = parseInt(slider.max);

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

export function setSliderMaxValue(dayInCampaign) {
    const slider = document.getElementById('myRange');
    if (slider) {
        slider.max = dayInCampaign;
        slider.value = dayInCampaign;
        updateImage();
    } else {
        console.error('Slider element not found');
    }
}

export function preloadCampaignImages(maxDay) {
    const baseImageUrl = 'https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-';
    const imageExtension = '-1200.jpg';

    for (let day = 1; day <= maxDay; day++) {
        const formattedDay = String(day).padStart(3, '0'); // Format day as '001', '002', etc.
        const imageUrl = `${baseImageUrl}${formattedDay}${imageExtension}`;

        const img = new Image();
        img.src = imageUrl; // Start loading the image
    }
}