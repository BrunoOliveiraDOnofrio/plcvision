let empresa_id = sessionStorage.getItem("EMPRESA_ID");
console.log(empresa_id)

const pegarFabrica = () =>{
    fetch(`http://localhost:3000/setor/pegarNomeFabrica/${empresa_id}`).then((response) => response.json().then((json) => {
        console.log(json)
        fillFabrica(json)
    }))
}

pegarFabrica()

const bodyOptionFabrica = document.getElementById("select_fabrica");

const fillFabrica = (dados) =>{
    let htmlString="<option value=#>Selecione uma Fábrica</option>";

    dados.map((fabrica) => {
        htmlString += `<option value="${fabrica.id}">${fabrica.nome}</option>`
    })

    bodyOptionFabrica.innerHTML = htmlString;

}


document.getElementById('select_empresa').addEventListener('change', function() {
    var selectedOption = document.getElementById('select_fabrica').value;
    console.log('Você selecionou: ' + selectedOption)
    fetch(`http://localhost:3000/setor/pegarIdFabrica/${selectedOption}`).then((response) => response.json().then((json) => {
        console.log(json)
        fillSetores(json)
    }))
});