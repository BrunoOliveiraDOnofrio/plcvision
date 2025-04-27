

const rotasTempoReal = {
    alertas: '/tempo_real/alertas',
    monitoramento: '/tempo_real/monitoramento',
    plcs: '/tempo_real/plcs',
    plcsShow: (id) => `/tempo_real/plcs/${id}/show`
}

const rotasAnalista = {
    alertas: '/analista/alertas',
    dashboard: '/analista/dashboard',
    plcs: '/analista/plcs',
    plcsShow: (id) => `/analista/plcs/${id}/show`
}

const rotasAdm = {
    monitoramento: '/adm/monitoramento',
    dashboard: '/adm/dashboard',
    consumidores : '/adm/consumidores',
    adcConsumidores: '/adm/consumidores/form',
    editarConsumidores : (id) => `/adm/consumidores/${id}/form`,
    alertas: '/adm/alertas',
    fabricas: '/adm/fabricas',
    editarFabrica: (id) => `/adm/fabricas/${id}/form`,
    configFabrica: (id) => `/adm/fabricas/${id}/config`,
    adcFabrica: '/adm/fabricas/form',
    plcs: '/adm/plcs',
    plcsShow: (id) => `/adm/plcs/${id}/show`,
    editarPlc: (id) => `/adm/plcs/${id}/form`,
    setores: '/adm/setores',
    adcSetores: '/adm/setores/form',
    editarSetores: (id) =>`/adm/setores/${id}/form`,
    usuarios: '/adm/usuarios',
    adcUsuarios: '/adm/usuarios/form',
    editarUsuarios : (id) => `/adm/usuarios/${id}/form`
}
const enderecoApp = 'http://localhost:3000'

const logout = () => {
    sessionStorage.clear()
    window.location.href = enderecoApp
}

const fotosDeUsuario = {
    tempo_real: enderecoApp +'/assets/imgs/users/mariana.png',
    analista: enderecoApp +'/assets/imgs/users/carlos.png',
    gerente: enderecoApp +'/assets/imgs/users/douglas.png'
}
window.onload = function() {








let fotoUsuario

let html_menu
window.location.href.split('/').forEach(pedaco => {
    const divMenu = document.querySelector('#div_menu')
const divMenuDesk = document.querySelector('#div_menu_desk')
console.log(divMenu)
console.log(divMenuDesk)

    
    if(pedaco == 'adm'){


        html_menu = `
        <nav>
                    <ul>
                        <li>
                            <a href="${enderecoApp + rotasAdm.monitoramento}">
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="${enderecoApp + rotasAdm.alertas}">
                                <span>Alertas</span>
                            </a>
                        </li>
                        
                        <li>
                            <a onclick="logout()">
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </nav>`

        fotoUsuario =  fotosDeUsuario.gerente
        const div_side_bar = document.querySelector('#nav_sidebar')
        div_side_bar.innerHTML = ` <div class="inicio">
            <ul>
                <li>
                    <a href="${enderecoApp + rotasAdm.monitoramento}">
                        <i class='bx bx-bar-chart-square'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.dashboard}">
                        <i class='bx bx-timer'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.consumidores} ">
                        <i class='bx bx-group'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.alertas}">
                        <i class='bx bxs-bell-ring' ></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.fabricas}">
                        <i class='bx bxs-factory'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.setores}">
                <i class='bx bx-category-alt'></i>
                        
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.usuarios}">
                        <i class='bx bxs-user'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAdm.plcs}">
                        <i class='bx bx-desktop'></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="saida">
            <ul>
                <li>
                    <a href="#">
                        <i class='bx bx-exit' ></i>
                    </a>
                </li>
            </ul>
        </div>`


    }else if (pedaco == 'analista'){
        html_menu = `
        <nav>
                    <ul>
                        <li>
                            <a href="${enderecoApp + rotasAnalista.dashboard}">
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="${enderecoApp + rotasAnalista.alertas}">
                                <span>Alertas</span>
                            </a>
                        </li>
                        
                        <li>
                            <a onclick="logout()">
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </nav>`


        fotoUsuario = fotosDeUsuario.analista
        const sidebar = document.querySelector('#nav_sidebar')
        sidebar.innerHTML = `<div class="inicio">
            <ul>
             
                <li>
                    <a href="${enderecoApp + rotasAnalista.dashboard}">
                        <i class='bx bx-timer'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAnalista.alertas}">
                        <i class='bx bxs-bell-ring'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasAnalista.plcs}">
                        <i class='bx bx-desktop'></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="saida">
            <ul>
                <li>
                    <a href="#">
                        <i class='bx bx-exit'></i>
                    </a>
                </li>
            </ul>
        </div>`
    }else if (pedaco == 'tempo_real'){
        html_menu = `
        <nav>
                    <ul>
                        <li>
                            <a href="${enderecoApp + rotasTempoReal.monitoramento}">
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="${enderecoApp + rotasTempoReal.alertas}">
                                <span>Alertas</span>
                            </a>
                        </li>
                        
                        <li>
                            <a onclick="logout()">
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </nav>`


        const sidebar = document.querySelector('#nav_sidebar')
        sidebar.innerHTML = `<div class="inicio">
            <ul>
                
                <li>
                    <a href="${enderecoApp + rotasTempoReal.monitoramento}">
                        <i class='bx bx-bar-chart-square'></i>
                    </a>
                </li>
                <li>
                    <a href="${enderecoApp + rotasTempoReal.alertas}">
                        <i class='bx bxs-bell-ring' ></i>
                    </a>
                </li>
               
               
                <li>
                    <a href="${enderecoApp + rotasTempoReal.plcs}">
                        <i class='bx bx-desktop'></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="saida">
            <ul>
                <li>
                    <a href="#">
                        <i class='bx bx-exit' ></i>
                    </a>
                </li>
            </ul>
        </div>`
        fotoUsuario = fotosDeUsuario.tempo_real
    }
    console.log(html_menu)
    divMenu.innerHTML = html_menu
    divMenuDesk.innerHTML = html_menu
})




document.querySelector('#span_empresa').innerHTML = 'PLCVISION'
document.querySelector('#span_endereco_empresa').innerHTML = sessionStorage.getItem('NOME_EMPRESA')

document.querySelectorAll('#username').forEach(span => span.innerHTML = sessionStorage.getItem('NOME_USUARIO') )
console.log(document.querySelector('#username'))

document.querySelectorAll('.foto').forEach(div => div.style.backgroundImage = `url('${fotoUsuario}')`)


document.addEventListener('click', (e) => {
    const target = e.target
    
    if(nav_sidebar.classList.contains('sidebar-aberta')){
        
        if(!target.closest(".sidebar")){
            const sidebar = document.querySelector('.sidebar')
            sidebar.classList.remove('sidebar-aberta')
            sidebar.style.animation = "ocultarSide 0.2s linear"
            sidebar.classList.add('sidebar-fechada')
            
        }
    }
})

// const divMenu = document.querySelector('#div_menu')
// const nav = divMenu.querySelector('nav')
// const ul = nav.querySelector('ul')

const sidebar = document.querySelector('.sidebar').querySelector('.saida')
const icon_sair = sidebar.querySelector('ul').querySelector('li')

icon_sair.addEventListener('click', () => {
    logout()
}
)


// ul.querySelectorAll('li').forEach((li) => {
//     console.log(li)
//     const span = li.querySelector('a').querySelector('span')
    

//     if(span.innerText == "Sair"){
//         console.log('sair')
//         span.addEventListener('click', () => {
//             logout()
//         })
//     }
// })

// const divMenuDesk = document.querySelector('#div_menu_desk')
// const navDesk = divMenuDesk.querySelector('nav')
// const ulDesk = navDesk.querySelector('ul')


// ulDesk.querySelectorAll('li').forEach((li) => {
//     const span = li.querySelector('a').querySelector('span')
//     console.log(span.innerText)
//     if(span.innerText == "Sair"){
//         console.log('sair')
//         console.log(li.innerHTML)
//         li.addEventListener('click', () => {
//             logout()
//         })
//     }
// })




const autenticar = () => {  
    const id_usuario = sessionStorage.getItem('ID_USUARIO')
    if(id_usuario == null){
        window.location.href = enderecoApp
    }
}



autenticar()

}

const abrirSideBar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('sidebar-fechada')
    setTimeout(() => {

    sidebar.style.animation = "mostrarSide 0.2s linear"
    sidebar.classList.add('sidebar-aberta')
    }, 200)
}

const menuCollapse = () => {
    const menu = document.querySelector('#div_menu')
    menu.classList.toggle('collapse-menu-show')
    console.log("afs ta ingles")
}

const menuCollapseDesk = () => {
    const menu = document.querySelector('#div_menu_desk')
    menu.classList.toggle('collapse-menu-show')
    console.log("afs ta ingles")
}