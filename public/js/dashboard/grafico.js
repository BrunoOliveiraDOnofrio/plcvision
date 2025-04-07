
const graficos = document.querySelectorAll('.meuGrafico')
console.log(graficos)
for(let i =0; i < graficos.length; i++){
    const ctx = graficos[i].getContext('2d')
    const meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['10h', '11h', '12h', '13h', '14h', '15h', '16h'],
          datasets: [{
            label: 'Valor',
            data: [70, 75, 85, 90, 80, 78, 85],
            fill: true,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(0, 123, 255, 1)',
            pointRadius: 5
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
      
}
