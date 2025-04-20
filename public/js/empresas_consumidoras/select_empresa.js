const pegarEmpresa = () =>{
    fetch("http://localhost:3000/fabrica/empresas").then((response) => response.json().then((json) => {
        console.log(json)
        fillEmpresa(json)
    }))
}

pegarEmpresa()

const bodyOptionEmpresa = document.getElementById("select_empresa");

const fillEmpresa = (dados) =>{
    let htmlString="<option value=#>Selecione uma Empresa</option>";

    dados.map((empresa) => {
        htmlString += `<option value="${empresa.razao_social}">${empresa.razao_social}</option>`
    })

    bodyOptionEmpresa.innerHTML = htmlString;

}