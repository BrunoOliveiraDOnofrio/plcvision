const modalAdicionar = document.querySelector('#dialog_adicionar')
const modalDesativar = document.querySelector('#dialog_desativar')


const abrirModalDesativar = () => modalDesativar.showModal()
const fecharModalDesativar = () => modalDesativar.close()

const abrirModalAdicionar = () => {
    modalAdicionar.showModal()
}

const fecharModalAdicionar = () => modalAdicionar.close()

