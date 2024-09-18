export function displayLosses(alliedContainerId, axisContainerId, lossesAllied, lossesAxis) {
    // Function to generate the losses table body for a faction
    function generateLossesRows(losses) {
        let rows = '';
        Object.keys(losses).forEach(type => {
            rows += `
                <tr>
                    <th scope="row">${type}</th>
                    <td>${losses[type]}</td>
                </tr>`;
        });
        return rows;
    }

    // Get the containers by their IDs
    const alliedContainer = document.getElementById(alliedContainerId);
    const axisContainer = document.getElementById(axisContainerId);

    // Check if containers exist
    if (alliedContainer && axisContainer) {
        // Generate the losses table for Allied
        alliedContainer.innerHTML = `
            <table class="table table-bordered table-dark table-responsive table-striped">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Losses</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateLossesRows(lossesAllied)}
                </tbody>
            </table>`;

        // Generate the losses table for Axis
        axisContainer.innerHTML = `
            <table class="table table-bordered table-dark table-responsive table-striped">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Losses</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateLossesRows(lossesAxis)}
                </tbody>
            </table>`;
    } else {
        console.error('Allied or Axis container not found.');
    }
}