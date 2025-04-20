function modal(id, nome, qtd, empresa_id){
    const modal = document.getElementById('modalVisualizar');
    console.log('oi id:' + id);

    fetch(`http://localhost:3000/fabrica/nomeEmpresa/${empresa_id}`).then((response) => response.json().then((json) => {
        console.log(json)
        document.getElementById('detalheEmpresa').innerHTML = json[0].razao_social;
    }))
    
    document.getElementById('detalheNome').textContent = nome;
    // document.getElementById('detalheEndereco').textContent = data.empresa;
    document.getElementById('detalheQtdSetor').innerHTML = qtd;

    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalVisualizar');
    const fecharModal = document.querySelector('.fecha');
    const btnFechar = document.querySelector('.btn-fechar');

    fecharModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    btnFechar.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});