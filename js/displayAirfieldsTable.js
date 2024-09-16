export function displayAirfieldsTable(containerId, airfields) {
    const container = document.getElementById(containerId);
    let output = `
        <table class="table table-bordered table-dark table-responsive table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Supply</th>
                    <th scope="col">Runway</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>`;

    // Loop through the airfields data and create table rows
    airfields.forEach((item, index) => {
        output += `
            <tr class="selectable-row" data-index="${index}" style="cursor: pointer;">
                <th scope="row">${item.Name}</th>
                <td>${item.Country}</td>
                <td>${item.SupplyLevel}</td>
                <td>${item.RunwayBearing}°</td>
                <td>${item.RunwayIsConcrete ? 'Concrete' : 'Grass'}</td>
            </tr>`;
    });

    output += `
            </tbody>
        </table>`;

    container.innerHTML = output; // Insert the generated HTML into the container

    // Add event listeners to each row
    container.querySelectorAll('tr[data-index]').forEach(row => {
        row.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            openAirfieldModal(airfields[index]); // Pass the specific airfield data
        });
    });

    function openAirfieldModal(data) {
        // Populate airframes data
        const airframesContainer = document.getElementById('airframesContainer');
        if (data.AvailableAirframes.length === 0) {
            // If no airframes, display a message
            airframesContainer.innerHTML = `<p class="px-3 py-3 text-start">The airfield is closed. <br> You can land and finish mission at this field.<br> You can rearm, repair, and refuel at this field.</p>`;
        } else {
            let airframesOutput = `
            <table class="table table-bordered table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Plane</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>`;

            data.AvailableAirframes.forEach(airframe => {
                let numberAvailable = airframe.NumberAvailable === -1 ? 'Unlimited' : airframe.NumberAvailable;

                airframesOutput += `
                <tr>
                    <td>${airframe.FriendlyName}</td>
                    <td>${numberAvailable}</td>
                    <td>${airframe.Type || 'N/A'}</td>
                </tr>`;
            });

            airframesOutput += `
            </tbody>
        </table>`;
            airframesContainer.innerHTML = airframesOutput;
        }
        // Set the modal title
        const modalTitle = document.getElementById('airfieldModalLabel');
        modalTitle.textContent = data.Name;

        // Show the modal
        const airfieldModal = new bootstrap.Modal(document.getElementById('airfieldModal'));
        airfieldModal.show();
    }
}