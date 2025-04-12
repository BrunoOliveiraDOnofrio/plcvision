const listarUsuarios = () => {
    fetch("http://localhost:3000/usuario").then((response) => response.json().then((json) => {
        console.log(json)
        fillUsuarios(json)
    }))
}
listarUsuarios()

const bodyTabelaUsuarios = document.getElementById("tbody_usuarios")



const fillUsuarios = (dados) => {
    let htmlString = "";
    
    dados.map((usuario) => {
        htmlString += `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.setor}</td>
                        <td>${usuario.cargo}</td>
                        <td class="central_viz_rem">
                            <button class="btn-visualizar" id="1">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                  </svg>
                                  
                            </button>
                        </td>
                        <td class="central_viz_rem">
                            <button class="btn-remover" id="1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                            </button>
                        </td>
                    </tr>
`
    }

)
// fechou o map, hora de colocar na tela

bodyTabelaUsuarios.innerHTML = htmlString

}

//                     esse vai ser nosso inner html