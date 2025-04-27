function excluir(id){

    if(confirm("Tem certeza que deseja excluir esse setor?")){
        fetch(`/setor/excluir/${id}`,{
            method: "DELETE",
        })
        .then(response => response.json())
            .then(data => {
                alert("Setor excluído com sucesso!");
                listarSetorFabrica();
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao tentar excluir.");
            });

    }

}