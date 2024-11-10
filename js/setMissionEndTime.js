export function setMissionEndTime(missionEndTimeUTC) {
    if (!missionEndTimeUTC) {
        console.warn("Mission End Time is missing or undefined.");
        return;
    }

    const missionEndTime = new Date(missionEndTimeUTC);

    // Update remaining mission time initially and every second
    updateRemainingTime(missionEndTime);
    setInterval(() => updateRemainingTime(missionEndTime), 1000);
}

function updateRemainingTime(missionEndTime) {
    const now = new Date();
    let remainingTime = missionEndTime - now;

    if (remainingTime < 0) {
        remainingTime = 0; // Mission is over
    }

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Format time as HH:MM:SS
    const formattedRemainingTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update remaining time in the DOM
    const remainingTimeElement = document.querySelector('#remainingMissionTimeContainer');
    if (remainingTimeElement) {
        remainingTimeElement.textContent = formattedRemainingTime;
    } else {
        console.error("Element with ID 'remainingMissionTimeContainer' not found.");
    }
}