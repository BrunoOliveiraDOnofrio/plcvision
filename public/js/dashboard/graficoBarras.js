const criarDesktop = () => {
      const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['PLC - 21', 'PLC - 21', 'PLC - 21', 'PLC - 21', 'PLC - 21'],
      datasets: [{
        label: 'RAM Uso %',
        data: [12, 9, 6, 4, 2],
        backgroundColor: 'orangered',
        borderRadius: 6,
        barThickness: 30
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Quantidade Registros',
            font: { size: 14 }
          },
          ticks: { stepSize: 2 }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 14 }
          }
        }
      }
    }
  });
}

const criarGrafico = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['PLC - 21', 'PLC - 21', 'PLC - 21', 'PLC - 21'],
      datasets: [{
        label: 'Quantidade Registros',
        data: [8, 6, 4, 2],
        backgroundColor: 'orangered',
        borderRadius: 5,
        barThickness: 20
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Quantidade Registros'
          },
          ticks: {
            beginAtZero: true
          },
          grid: { display: false }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

criarGrafico()