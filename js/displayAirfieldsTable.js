// Import the icon mapping functions
import { getAircraftIcon } from './getAircraftIcon.js';
import { getReconPhoto } from './getReconPhotos.js';

export function displayAirfieldsTable(containerId, airfields) {
    const container = document.getElementById(containerId);
    let output = `
        <table class="table table-bordered table-dark table-responsive table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Supply</th>
                    <th scope="col">Runway</th> <!-- Combined column for arrow and value -->
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>`;

    airfields.forEach((item, index) => {
        const maxSupply = 200; // Assuming 200 is the max supply
        const currentSupplyPercent = (item.SupplyLevel / maxSupply) * 100;
        const arrowStyle = `transform: rotate(${item.RunwayBearing}deg);`; // Rotate based on bearing

        output += `
            <tr class="selectable-row" data-index="${index}" style="cursor: pointer;">
                <th scope="row">${item.Name}</th>
                <td>${item.Country}</td>
                <td>
                    <div class="supply-bar-container">
                        <div class="supply-bar"
                             style="width: ${currentSupplyPercent}%; background-color: ${calculateBarColor(currentSupplyPercent)};">
                        </div>
                          <div class="supply-bar-airfeild-overlay" data-supply="${item.SupplyLevel}" data-max="${item.MaxSupplyLevel}">
                            ${item.SupplyLevel}
                        </div>
                    </div>
                </td>
                <td>
                    <i class="fa-solid fa-arrow-up" style="${arrowStyle}" title="Runway Bearing: ${item.RunwayBearing}°"></i>
                    ${item.RunwayBearing}°
                </td>
                <td>${item.RunwayIsConcrete ? 'Concrete' : 'Grass'}</td>
            </tr>`;
    });

    output += `
            </tbody>
        </table>`;

    container.innerHTML = output;

    container.querySelectorAll('tr[data-index]').forEach(row => {
        row.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            openAirfieldModal(airfields[index]);
        });
    });

    function openAirfieldModal(data) {
        const reconPhotos = getReconPhoto(data.Name); // Get the image paths array
        const airframesContainer = document.getElementById('airframesContainer');

        let reconPhotosOutput = '';

        if (reconPhotos.length > 0 && reconPhotos.every(photo => photo !== "")) {
            reconPhotos.forEach(photo => {
                reconPhotosOutput += `<img src="./imgs/ReconPhotos/BigNormandy/${photo}" alt="${data.Name}" class="img-fluid my-2 w-100">`;
            });
        } else {
            reconPhotosOutput = `
                <img src="./imgs/ReconPhotos/NoReconPhotoAvailable.png" alt="${data.Name}" class="img-fluid my-2 w-100">`;
        }

        if (data.AvailableAirframes.length === 0) {
            airframesContainer.innerHTML = `
                ${reconPhotosOutput}
                <p class="px-3 py-3 text-start">The airfield is closed. <br> You can land and finish mission at this field.<br> You can rearm, repair, and refuel at this field.</p>`;
        } else {
            let airframesOutput = `
                ${reconPhotosOutput}
                <table class="table table-bordered table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Plane</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Availability</th>
                        </tr>
                    </thead>
                    <tbody>`;

            data.AvailableAirframes.forEach(airframe => {
                const iconPath = getAircraftIcon(airframe.Type);
                let numberAvailable = airframe.NumberAvailable === -1 ? 'Unlimited' : airframe.NumberAvailable;

                airframesOutput += `
                    <tr>
                        <td><img src="./imgs/AircraftIcons/${iconPath}" alt="${airframe.Type}" width="124" height="42"></td>
                        <td>${airframe.ReadableName || 'N/A'}</td>
                        <td>${airframe.ColloquialName}</td>
                        <td>${numberAvailable}</td>
                    </tr>`;
            });

            airframesOutput += `
                </tbody>
            </table>`;
            airframesContainer.innerHTML = airframesOutput;
        }

        const modalTitle = document.getElementById('airfieldModalLabel');
        modalTitle.textContent = data.Name;

        const airfieldModal = new bootstrap.Modal(document.getElementById('airfieldModal'));
        airfieldModal.show();
    }
}

// Dynamic RGB calculation for bar color
function calculateBarColor(value) {
    const green = [40, 167, 69]; // RGB for #28a745
    const red = [220, 53, 69]; // RGB for #dc3545

    const r = Math.round(red[0] + ((green[0] - red[0]) * (value / 100)));
    const g = Math.round(red[1] + ((green[1] - red[1]) * (value / 100)));
    const b = Math.round(red[2] + ((green[2] - red[2]) * (value / 100)));

    return `rgb(${r}, ${g}, ${b})`;
}

// Helper function to determine Font Awesome arrow class based on bearing

function getFontAwesomeArrowClass(bearing) {
    const direction = Math.round(bearing / 45) % 8; // Divide circle into 8 parts (45° each)
    const directions = [
        'fa-arrow-up', // 0° - 44°
        'fa-arrow-up-right', // 45° - 89°
        'fa-arrow-right', // 90° - 134°
        'fa-arrow-down-right', // 135° - 179°
        'fa-arrow-down', // 180° - 224°
        'fa-arrow-down-left', // 225° - 269°
        'fa-arrow-left', // 270° - 314°
        'fa-arrow-up-left' // 315° - 359°
    ];

    return directions[direction];
}