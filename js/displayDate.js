export function formatDate(date) {
    const day = date.Day.toString().padStart(2, '0'); // Ensure day is two digits
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.Month - 1]; // Get the 3-letter month abbreviation
    const year = date.Year;

    // Return the formatted date as 01-JAN-1944
    return `${day}-${month}-${year}`;
}

export function displayDate(containerId, date) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Element with id "${containerId}" not found.`);
        return;
    }

    container.innerHTML = `${date}`;
}