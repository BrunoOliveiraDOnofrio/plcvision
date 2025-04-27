function modal(id, nome, qtd, empresa_id){
    const modal = document.getElementById('modalVisualizar');
    console.log('oi id:' + id);

    const btnEditar = document.getElementById('editarFabrica');
    
    btnEditar.setAttribute('data-id', id);

    fetch(`/fabrica/nomeEmpresa/${empresa_id}`).then((response) => response.json().then((json) => {
        console.log(json)
        document.getElementById('detalheEmpresa').innerHTML = json[0].razao_social;
    }))
    
    document.getElementById('detalheNome').textContent = nome;
    document.getElementById('detalheQtdSetor').innerHTML = qtd;

    fetch(`/fabrica/enderecoFabrica/${id}`).then((response) => response.json().then((json) => {
        console.log(json)
        document.getElementById('detalheEndereco').innerHTML = `${json[0].endereco}`;
    }))

    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalVisualizar');
    const fecharModal = document.querySelector('.fecha');
    const btnFechar = document.querySelector('.btn-fechar');
    const btnEditar = document.getElementById('editarFabrica');
    const btnConfigurar = document.getElementById('configFabrica')
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

    btnEditar.addEventListener('click', function() {
        const id = btnEditar.getAttribute('data-id');
        localStorage.setItem("id", id);
        window.location.href = enderecoApp + rotasAdm.editarFabrica(id);
    });
    btnConfigurar.addEventListener('click', function() {
        const id = btnEditar.getAttribute('data-id');
        localStorage.setItem("id", id);
        window.location.href = enderecoApp + rotasAdm.configFabrica(id);
    });
});