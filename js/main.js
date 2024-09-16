// Import or include the other JavaScript files
import { displayAirfieldsTable } from './displayAirfieldsTable.js';
import { displayObjectivesTable } from './displayObjectivesTable.js';
import { displayDate, formatDate } from './displayDate.js';
import { displayWeather } from './displayWeather.js';
import { displayWarEffort } from './displayWarEffort.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('/apollo-campaign.json') // Ensure path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            console.log("Fetched data:", data);
            const airfieldsData = data.Airfields;
            const objectivesData = data.Objectives;
            const formattedDate = formatDate(data.Day);

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

            displayAirfieldsTable('alliedTableContainer', alliedAirfields);
            displayAirfieldsTable('axisTableContainer', axisAirfields);
            displayObjectivesTable('alliedObjectivesContainer', alliedObjectives);
            displayObjectivesTable('axisObjectivesContainer', axisObjectives);
            displayDate('dateContainer', formattedDate);
            displayWeather(data);
            displayWarEffort(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});