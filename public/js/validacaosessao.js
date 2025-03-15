function validacao_nivel_adm(){

    let nivel = sessionStorage.NIVEL_USUARIO

    if(nivel != 2){
        window.location = "../Login.html"
    }
    

}

function validacao_nivel_insigth(){

    let nivel = sessionStorage.NIVEL_USUARIO

    if(nivel != 1){
        window.location = "../Login.html"

    }

}

function validacao_nivel_monitoramento(){

    let nivel = sessionStorage.NIVEL_USUARIO

    if(nivel != 0){
        window.location = "../Login.html"
    }


}

function sair(){
    window.location = '../index.html'
    sessionStorage.clear()
}