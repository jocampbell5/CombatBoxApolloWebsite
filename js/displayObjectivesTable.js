import { getReconPhoto } from './getReconPhotos.js';

export function displayObjectivesTable(containerId, objectives) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Element with id "${containerId}" not found.`);
        return;
    }

    let output = `
        <table class="table table-bordered table-dark table-responsive table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Supply</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>`;

    objectives.forEach(item => {
        const currentSupplyPercent = (item.SupplyLevel / item.MaxSupplyLevel) * 100;

        output += `
            <tr data-bs-toggle="modal" data-bs-target="#objectiveModal" 
                class="selectable-row" 
                data-objective='${JSON.stringify(item)}' 
                style="cursor: pointer;">
                <th scope="row">${item.Name || 'N/A'}</th>
                <td>
                    <div class="supply-bar-container position-relative">
                        <div class="supply-bar" 
                             style="width: ${currentSupplyPercent}%; background-color: ${calculateBarColor(currentSupplyPercent)};">
                        </div>
                        <div class="supply-bar-overlay" 
                             data-supply="${item.SupplyLevel}" 
                             data-max="${item.MaxSupplyLevel}">
                            ${item.SupplyLevel} / ${item.MaxSupplyLevel}
                        </div>
                    </div>
                </td>
                <td class="first-letter-cap">${item.Type || 'N/A'}</td>
            </tr>`;
    });

    output += `
            </tbody>
        </table>`;

    container.innerHTML = output;

    // Adjust supply bar text on window resize
    adjustSupplyText();
    window.addEventListener('resize', adjustSupplyText);

    // Add modal show event listener
    const modalElement = document.getElementById('objectiveModal');
    modalElement.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget; // Button that triggered the modal
        const objective = JSON.parse(button.getAttribute('data-objective')); // Extract objective data

        const modalTitle = modalElement.querySelector('.modal-title');
        const modalBody = modalElement.querySelector('.modal-body');

        modalTitle.textContent = objective.Name || 'N/A';

        // Get recon photos for the objective
        const reconPhotos = getReconPhoto(objective.Name);
        const imageSrc = (reconPhotos.length > 0) ?
            `./imgs/ReconPhotos/BigNormandy/${reconPhotos[0]}` :
            './imgs/ReconPhotos/NoReconPhotoAvailable.png';

        modalBody.innerHTML = `
            <img src="${imageSrc}" class="img-fluid my-2 w-100" alt="${objective.Name}">
            <table class="table table-bordered table-dark table-striped mt-2">
                <thead>
                    <tr>
                        <th scope="col">Current Supply</th>
                        <th scope="col">Max Supply</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${objective.SupplyLevel || 'N/A'}</td>
                        <td>${objective.MaxSupplyLevel || 'N/A'}</td>
                        <td>${objective.Type || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>`;
    });
}

function adjustSupplyText() {
    const overlays = document.querySelectorAll('.supply-bar-overlay');
    const isLargeOrSmaller = window.matchMedia('(max-width: 1200px)').matches;

    overlays.forEach(overlay => {
        const supply = overlay.getAttribute('data-supply');
        const max = overlay.getAttribute('data-max');
        overlay.textContent = isLargeOrSmaller ? supply : `${supply} / ${max}`;
    });
}

function calculateBarColor(value) {
    const green = [40, 167, 69];
    const red = [220, 53, 69];

    const r = Math.round(red[0] + ((green[0] - red[0]) * (value / 100)));
    const g = Math.round(red[1] + ((green[1] - red[1]) * (value / 100)));
    const b = Math.round(red[2] + ((green[2] - red[2]) * (value / 100)));

    return `rgb(${r}, ${g}, ${b})`;
}