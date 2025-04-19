const pegarEmpresa = () =>{
    fetch("http://localhost:3000/fabrica").then((response) => response.json().then((json) => {
        console.log(json)
        fillEmpresa(json)
    }))
}

pegarEmpresa()

const bodyOptionEmpresa = document.getElementById("select_empresa");

const fillEmpresa = (dados) =>{
    let htmlString="";

    dados.map((empresa) => {
        htmlString += `<option value="${empresa.razao_social}">${empresa.razao_social}</option>`
    })

    bodyOptionEmpresa.innerHTML = htmlString;

}