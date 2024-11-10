export function displayWarEffort(data) {
    const alliedControlledObjectives = data.AlliedControlledPointsToday;
    const axisControlledObjectives = data.AxisControlledPointsToday;
    const alliedSupplyToday = data.AlliedSupplyToday;
    const axisSupplyToday = data.AxisSupplyToday;
    let currentDayStateDescription = data.CurrentDayStateDescription;
    const previousDayEventsDescription = data.PreviousDaysEventsDescription;

    // Remove the phrase "The current situation" from the description
    currentDayStateDescription = currentDayStateDescription.replace(/<b>The current situation<\/b><br\/><br\/>/, '');

    // Display the data in the respective HTML elements
    document.getElementById('alliedControlledObjectivesContainer').textContent = alliedControlledObjectives;
    document.getElementById('axisControlledObjectivesContainer').textContent = axisControlledObjectives;
    document.getElementById('alliedSupplyContainer').textContent = alliedSupplyToday;
    document.getElementById('axisSupplyContainer').textContent = axisSupplyToday;
    document.getElementById('currentDayStateDescriptionContainer').innerHTML = currentDayStateDescription;
    document.getElementById('previousDayEventsDescriptionContainer').innerHTML = previousDayEventsDescription;
}