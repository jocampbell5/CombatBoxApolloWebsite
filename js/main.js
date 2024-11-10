// Import the map display function and other modules
import { displayAirfieldsTable } from './displayAirfieldsTable.js';
import { displayObjectivesTable } from './displayObjectivesTable.js';
import { displayWeather } from './displayWeather.js';
import { displayWarEffort } from './displayWarEffort.js';
import { displayPilotStreaks } from './displayPilotStreaks.js';
import { displayLosses } from './displayLosses.js';
import { displayCampaignInfo } from './displayCampaignInfo.js';
import { setMissionEndTime } from './setMissionEndTime.js';
import { updateImage, toggleAnimation, setSliderMaxValue, preloadCampaignImages } from './campaignMapSlider.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://m2.combatbox.net/big-normandy-campaign/big-normandy-campaign-latest.json.aspx')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);
            const airfieldsData = data.Airfields;
            const objectivesData = data.Objectives;
            const pilotStreaksAllied = data.PilotStreaksAllied;
            const pilotStreaksAxis = data.PilotStreaksAxis;
            const lossesAllied = data.LossesAllied;
            const lossesAxis = data.LossesAxis;

            let alliedAirfields = [],
                axisAirfields = [];
            let alliedObjectives = [],
                axisObjectives = [];

            if (Array.isArray(airfieldsData)) {
                alliedAirfields = airfieldsData.filter(item => item.Coalition === "Allies");
                axisAirfields = airfieldsData.filter(item => item.Coalition === "Axis");
            }

            if (Array.isArray(objectivesData)) {
                alliedObjectives = objectivesData.filter(item => item.Coalition === "Allies");
                axisObjectives = objectivesData.filter(item => item.Coalition === "Axis");
            }

            // Display components
            displayPilotStreaks('alliedTopFiveId', 'alliedRemainingId', 'axisTopFiveId', 'axisRemainingId', pilotStreaksAllied, pilotStreaksAxis);
            displayAirfieldsTable('alliedTableContainer', alliedAirfields);
            displayAirfieldsTable('axisTableContainer', axisAirfields);
            displayObjectivesTable('alliedObjectivesContainer', alliedObjectives);
            displayObjectivesTable('axisObjectivesContainer', axisObjectives);
            displayWeather(data);
            displayWarEffort(data);
            displayLosses('alliedLossesContainer', 'axisLossesContainer', lossesAllied, lossesAxis);
            displayCampaignInfo(data);
            setMissionEndTime(data.EstimatedMissionEnd);
            setSliderMaxValue(data.Day.DayInCampaign);

            // Initialize the first image and display
            updateImage();

            // Attach event listeners
            const slider = document.getElementById('myRange');
            slider.addEventListener('input', updateImage);
            const button = document.getElementById('toggleAnimationButton');
            button.addEventListener('click', toggleAnimation);

            const maxDay = data.Day.DayInCampaign; // Assuming this gives the total days
            preloadCampaignImages(maxDay); // Preload images for all campaign days
        })
        .catch(error => console.error('Error fetching JSON:', error));
});