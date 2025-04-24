const listarSetores = () => {
    fetch("/setor/listarSetorFabrica/:fabricaId").then((response) => response.json().then((json) => {
        console.log(json)
        fillFabricas(json)
    }))
}

listarFabricas();

const bodyTabelaFabricas = document.getElementById("tbody_fabricas");

const fillFabricas = (dados) => {
    let htmlString = "";

    dados.map((fabricas) => {
        console.log(fabricas)
        htmlString += ` <tr>
                            <td>${fabricas.id}</td>
                            <td>${fabricas.nome}</td>
                            <td>${fabricas.qtdSetor}</td>
                            <td class="central_viz_rem">
                                <button class="btn-visualizar" id="${fabricas.id}" onclick="modal(${fabricas.id},'${fabricas.nome}',${fabricas.qtdSetor},${fabricas.empresa_consumidor_id})">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    
                                </button>
                            </td>
                            <td class="central_viz_rem">
                                <button class="btn-remover" data-id="${fabricas.id}" onclick="excluir(${fabricas.id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                </button>
                            </td>
                        </tr>`;
    });

    bodyTabelaFabricas.innerHTML = htmlString;
}

function adicionar(){
    window.location.href = "./form";
}