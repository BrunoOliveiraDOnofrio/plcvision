const modalAdicionar = document.querySelector('#dialog_adicionar')
const modalDesativar = document.querySelector('#dialog_desativar')


const abrirModalDesativar = () => modalDesativar.showModal()
const fecharModalDesativar = () => modalDesativar.close()

const abrirModalAdicionar = () => {
    modalAdicionar.showModal()
}

const fecharModalAdicionar = () => modalAdicionar.close()

// função de listar somente oque estiver com o id no session storage
function listaPorId(){
    const plcID = sessionStorage.getItem('plcID');

    fetch(`/plc/${plcID}`)
        .then(response => response.json())
        .then(plc => {
            console.log('Dados recebidos do servidor:', plc); // Para verificar o que está vindo do servidor
            
            document.getElementById('span_nome').textContent = plc.modelo || 'N/A';
            document.getElementById('span_ano').textContent = plc.ano || 'N/A';
            document.getElementById('span_ram').textContent = plc.capacidade_ram || 'N/A';
            document.getElementById('span_mac').textContent = plc.endereco_mac || 'N/A';
            document.getElementById('span_so').textContent = plc.sistema_operacional || 'N/A';
            document.getElementById('span_hostname').textContent = plc.hostname || 'N/A';
            
        })
        .catch(error => {
            console.error('Erro ao obter dados do PLC:', error);
        });
}

window.onload = function() {
    listaPorId();
};