"use strict";

document.addEventListener('DOMContentLoaded', function () {
  fetchOnlinePlayers();
});

function fetchOnlinePlayers() {
  var response, html, parser, doc, playersText, totalPlayers, alliesText, alliesCount, axisText, axisCount;
  return regeneratorRuntime.async(function fetchOnlinePlayers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('https://combatbox.net/en/online/'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.text());

        case 6:
          html = _context.sent;
          // Parse the HTML to extract player counts
          parser = new DOMParser();
          doc = parser.parseFromString(html, 'text/html'); // Extract the number of players

          playersText = doc.querySelector('div:contains("Players on the server:")').textContent;
          totalPlayers = parseInt(playersText.match(/Players on the server: (\d+)/)[1], 10); // Extract the number of Allies and Axis players

          alliesText = doc.querySelector('div:contains("Allies:")').textContent;
          alliesCount = parseInt(alliesText.match(/Allies: (\d+)/)[1], 10);
          axisText = doc.querySelector('div:contains("Axis:")').textContent;
          axisCount = parseInt(axisText.match(/Axis: (\d+)/)[1], 10); // Render the chart

          renderPlayerStackedBar(alliesCount, axisCount, totalPlayers);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching online players:', _context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

function renderPlayerStackedBar(allies, axis, total) {
  var ctx = document.getElementById('playerStackedBarChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Online Players'],
      datasets: [{
        label: 'Allies',
        data: [allies],
        backgroundColor: 'red'
      }, {
        label: 'Axis',
        data: [axis],
        backgroundColor: 'blue'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function label(tooltipItem) {
              return "".concat(tooltipItem.dataset.label, ": ").concat(tooltipItem.raw);
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 84,
          // Maximum number of players
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
}