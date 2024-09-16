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
                    <th scope="col">Current Supply</th>
                    <th scope="col">Max Supply</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody>`;

    // Loop through the objectives data and create table rows
    objectives.forEach(item => {
        output += `
            <tr>
                <th scope="row">${item.Name || 'N/A'}</th>
                <td>${item.SupplyLevel || 'N/A'}</td>
                <td>${item.MaxSupplyLevel || 'N/A'}</td>
                <td class="first-letter-cap">${item.Type || 'N/A'}</td>
            </tr>`;
    });

    output += `
            </tbody>
        </table>`;

    container.innerHTML = output; // Insert the generated HTML into the container
}