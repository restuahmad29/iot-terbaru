let chart;

async function getHistory() {

  try {

    const response =
      await apiFetch(
        "/sensor/history"
      );

    const data =
      response;

    const labels =
      data.map(item => item.id);

    const moistureData =
      data.map(
        item => item.moisture
      );

    renderChart(
      labels,
      moistureData
    );

    calculateStatistics(
      moistureData
    );

  } catch(error) {

    console.log(error);
  }
}

function renderChart(
  labels,
  moistureData
) {

  const ctx =
    document
      .getElementById(
        "moistureChart"
      );

  if(chart) {

    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: "line",

    data: {

      labels,

      datasets: [

        {

          label:
            "Kelembaban Tanah",

          data: moistureData,

          borderWidth: 3,

          tension: 0.4,
        },
      ],
    },

    options: {

      responsive: true,
    },
  });
}

function calculateStatistics(
  data
) {

  const total =
    data.reduce(
      (a, b) => a + b,
      0
    );

  const avg =
    (
      total / data.length
    ).toFixed(1);

  const max =
    Math.max(...data);

  const min =
    Math.min(...data);

  document.getElementById(
    "avgMoisture"
  ).innerText =
    `${avg}%`;

  document.getElementById(
    "maxMoisture"
  ).innerText =
    `${max}%`;

  document.getElementById(
    "minMoisture"
  ).innerText =
    `${min}%`;
}

getHistory();

setInterval(() => {

  getHistory();

}, 5000);