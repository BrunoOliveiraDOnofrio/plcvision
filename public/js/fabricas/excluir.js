function excluir(id){

    if(confirm("Tem certeza que deseja excluir essa fábrica?")){
        fetch(`/fabrica/excluir/${id}`,{
            method: "DELETE",
        })
        .then(response => response.json())
            .then(data => {
                alert("Fábrica excluída com sucesso!");
                listarFabricas();
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao tentar excluir.");
            });

    }

}