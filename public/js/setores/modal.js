function modal(id, nome, qtd) {
    console.log("Abrindo modal");
    const modal = document.getElementById('modalVisualizar');
    console.log("oi ID: " + id);
    const btnEditar = document.getElementById('editarFabrica');
    btnEditar.setAttribute('data-id', id);
    
    document.getElementById('detalheNome').textContent = nome;
    document.getElementById('detalheQtdPLC').textContent = qtd;

    fetch(`/setor/buscarFabricaPorSetor/${id}`)
        .then(response => response.json())
        .then(json => {
            console.log("Fábrica:", json);
                document.getElementById('detalheFabrica').textContent = json[0].nome;
        })
        .catch(error => {
            console.error("Erro ao buscar fábrica:", error);
            document.getElementById('detalheFabrica').textContent = "Erro ao buscar fábrica";
        });

    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalVisualizar');
    const fecharModal = document.querySelector('.fecha');
    const btnFechar = document.querySelector('.btn-fechar');
    const btnEditar = document.getElementById('editarFabrica');
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
        window.location.href = `/adm/setores/${id}/form`;
    });
});