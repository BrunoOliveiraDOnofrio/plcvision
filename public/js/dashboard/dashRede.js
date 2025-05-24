function criarGrafico() {
    const graficoBarra = document.getElementById('graficoBarra');
    const graficoLinha = document.getElementById('graficoLinha');

    new Chart(graficoBarra, {
        type: 'bar',
        data: {
            labels: ['0-10', '10-20', '20-30', '30-40'],
            datasets: [{
                label: 'Perda de Pacotes %',
                data: [10, 20, 30, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentagem de perda',
                        color: '#000',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de conexões abertas',
                        color: '#000',
                        font:{
                            size:14
                        }
                    }
                }
            }
        }
    });

    new Chart(graficoLinha, {
        type: 'line',
        data: {
            labels: ['7:00', '8:00', '9:00', '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'],
            datasets: [{
                label: 'Perda de Pacotes %',
                data: [10, 20, 30, 40, 35.6,23.4,40.6,50.7,45.6,12,88.9,56.00,75.50],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentagem de perda',
                        color: '#000',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade de conexões abertas',
                        color: '#000',
                        font:{
                            size:14
                        }
                    }
                }
            }
        }
    });
}
    
window.onload = function(){
    criarGrafico();
};