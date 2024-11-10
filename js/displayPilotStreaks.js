export function displayPilotStreaks(alliedTopFiveId, alliedRemainingId, axisTopFiveId, axisRemainingId, pilotStreaksAllied, pilotStreaksAxis) {
    function generatePilotRows(pilotGroup, isSelectable = false) {
        let rows = '';

        pilotGroup.forEach(pilot => {
                    let streakValue = Math.round(pilot.StreakBonus * 100); // Convert to whole number percentage
                    let missionStreak = streakValue / 10;

                    rows += `
                <tr ${isSelectable ? `class="selectable-row" data-pilot="${pilot.Name}" style="cursor: pointer;"` : ''}>
                    <th scope="row">${pilot.Name}</th>
                    <td>${missionStreak}</td>
                    <td>${streakValue}%</td> <!-- Display streak bonus as whole number percentage -->
                </tr>`;
        });
        return rows;
    }

    // Filter out pilots with a StreakBonus of 0
    pilotStreaksAllied = pilotStreaksAllied.filter(pilot => pilot.StreakBonus > 0);
    pilotStreaksAxis = pilotStreaksAxis.filter(pilot => pilot.StreakBonus > 0);

    // Sort the pilot streaks by StreakBonus in descending order
    pilotStreaksAllied.sort((a, b) => b.StreakBonus - a.StreakBonus);
    pilotStreaksAxis.sort((a, b) => b.StreakBonus - a.StreakBonus);

    // Split Allied pilots into top five and remaining
    const alliedTopFive = pilotStreaksAllied.slice(0, 5);
    const alliedRemaining = pilotStreaksAllied.slice(5);

    // Split Axis pilots into top five and remaining
    const axisTopFive = pilotStreaksAxis.slice(0, 5);
    const axisRemaining = pilotStreaksAxis.slice(5);

    // Select the containers for top five and remaining pilots
    const alliedTopFiveContainer = document.getElementById(alliedTopFiveId);
    const alliedRemainingContainer = document.getElementById(alliedRemainingId);
    const axisTopFiveContainer = document.getElementById(axisTopFiveId);
    const axisRemainingContainer = document.getElementById(axisRemainingId);

    // Populate the tables with pilot data for both top five and remaining
    alliedTopFiveContainer.innerHTML = generatePilotRows(alliedTopFive, true); // Selectable rows
    alliedRemainingContainer.innerHTML = generatePilotRows(alliedRemaining, false); // Non-selectable rows
    axisTopFiveContainer.innerHTML = generatePilotRows(axisTopFive, true); // Selectable rows
    axisRemainingContainer.innerHTML = generatePilotRows(axisRemaining, false); // Non-selectable rows

    // Add event listeners only to selectable rows
    document.querySelectorAll('.selectable-row').forEach(row => {
        row.addEventListener('click', function () {
            const pilotName = this.getAttribute('data-pilot');
            fetchPilotData(pilotName);
        });
    });

    function fetchPilotData(pilotName) {
        const jsonUrl = `https://m2.combatbox.net/big-normandy-campaign/${encodeURIComponent(pilotName)}.json`;
    
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                showPilotModal(data);
            })
            .catch(error => {
                console.error('Error fetching pilot data:', error);
                showPilotModal({ PlayerName: pilotName, error: true }); // Pass an error flag to the modal
            });
    }
    
    function showPilotModal(data) {
        const modalElement = document.getElementById('pilotModal');
        const modalTitle = modalElement.querySelector('.modal-title');
        const modalBody = modalElement.querySelector('.modal-body');
    
        modalTitle.textContent = data.PlayerName || 'N/A';
    
        if (data.error) {
            modalBody.innerHTML = `<p>No story for this pilot.</p>`;
        } else {
            let eventsHtml = '';
            data.Events.forEach(event => {
                eventsHtml += `
                    <tr>
                        <td>${event.EventType}</td>
                        <td>${event.DateTime}</td>
                        <td>${event.Position}</td>
                        <td>${event.AirfieldName || event.EnemyType || 'N/A'}</td>
                    </tr>`;
            });
    
            modalBody.innerHTML = `
                <p><strong>Aircraft Type:</strong> ${data.AircraftType}</p>
                <p><strong>Country:</strong> ${data.Country}</p>
                <p><strong>Coalition:</strong> ${data.Coalition}</p>
                <table class="table table-bordered table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Event</th>
                            <th scope="col">Time</th>
                            <th scope="col">Position</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${eventsHtml}
                    </tbody>
                </table>`;
        }
    
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}