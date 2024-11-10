export function displayCampaignInfo(data) {
    const missionStartTime = data.CampaignDayMissionStartTime;
    const date = data.Day;
    const daysRemaining = data.DaysRemaining;
    const campaignDay = data.Day.DayInCampaign;

    function formatDate() {
        const day = date.Day.toString().padStart(2, '0'); // Ensure day is two digits
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = monthNames[date.Month - 1]; // Get the 3-letter month abbreviation
        const year = date.Year;

        // Return the formatted date as 01-JAN-1944
        return `${day}-${month}-${year}`;
    }



    // Display the data in the respective HTML elements
    document.getElementById('dateContainer').textContent = formatDate();
    document.getElementById('timeContainer').textContent = missionStartTime;
    document.getElementById('daysRemainingContainer').textContent = daysRemaining;
    document.getElementById('campaignDayContainer').textContent = campaignDay;

}