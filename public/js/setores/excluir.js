function excluir(id){

    if(confirm("Tem certeza que deseja excluir esse Setor?")){
        fetch(`/setor/excluir/${id}`,{
            method: "DELETE",
        })
        .then(response => response.json())
            .then(data => {
                alert("Setor excluído com sucesso!");
            })

    }

}