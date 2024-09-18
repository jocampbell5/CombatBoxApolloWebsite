export function displayPilotStreaks(alliedContainerId, axisContainerId, pilotStreaksAllied, pilotStreaksAxis) {
    // Function to generate the table body HTML for each faction
    function generatePilotRows(pilotStreaks) {
        let rows = '';

        // Sort pilots by streak bonus in descending order
        pilotStreaks.sort((a, b) => b.StreakBonus - a.StreakBonus);

        pilotStreaks.forEach(pilot => {
            let streakValue = Math.round(pilot.StreakBonus * 100); // Convert to whole number percentage
            let missionStreak = pilot.SuccessfulMissionStreak;

            rows += `
                <tr>
                    <th scope="row">${pilot.Name}</th>
                    <td>${missionStreak}</td>
                    <td>${streakValue}%</td> <!-- Display streak bonus as whole number percentage -->
                </tr>`;
        });
        return rows;
    }

    // Select the containers
    const alliedContainer = document.getElementById(alliedContainerId);
    const axisContainer = document.getElementById(axisContainerId);

    // Populate the tables with pilot data
    alliedContainer.innerHTML = generatePilotRows(pilotStreaksAllied);
    axisContainer.innerHTML = generatePilotRows(pilotStreaksAxis);
}