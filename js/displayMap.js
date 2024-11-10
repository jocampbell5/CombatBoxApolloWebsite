export function displayMap(dayData, mapContainerId) {
    const dayInCampaign = dayData.DayInCampaign;
    const formattedDay = dayInCampaign.toString().padStart(3, '0');

    // Construct the dynamic URLs
    const mapUrl = `https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-${formattedDay}.jpg`;
    const smallMapUrl = `https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-day-${formattedDay}-small.jpg`; // Adjust this if you have a smaller version

    // Generate the HTML for the link and image
    const mapHtml = `
        <a href="${mapUrl}" target="_blank">
            <img src="${smallMapUrl}"  class="img-fluid" alt="Campaign Map">
        </a>
    `;

    // Find the container and set its innerHTML
    const mapContainer = document.getElementById(mapContainerId);
    if (mapContainer) {
        mapContainer.innerHTML = mapHtml;
    }
}