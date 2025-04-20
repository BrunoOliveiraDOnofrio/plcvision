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

const divMenu = document.querySelector('#div_menu')
const nav = divMenu.querySelector('nav')
const ul = nav.querySelector('ul')

const sidebar = document.querySelector('.sidebar').querySelector('.saida')
const icon_sair = sidebar.querySelector('ul').querySelector('li')

icon_sair.addEventListener('click', () => {
    logout()
}
)


ul.querySelectorAll('li').forEach((li) => {
    console.log(li)
    const span = li.querySelector('a').querySelector('span')

    if(span.innerText == "Sair"){
        console.log('sair')
        span.addEventListener('click', () => {
            logout()
        })
    }
})

const divMenuDesk = document.querySelector('#div_menu_desk')
const navDesk = divMenuDesk.querySelector('nav')
const ulDesk = navDesk.querySelector('ul')


ulDesk.querySelectorAll('li').forEach((li) => {
    const span = li.querySelector('a').querySelector('span')
    console.log(span.innerText)
    if(span.innerText == "Sair"){
        console.log('sair')
        console.log(li.innerHTML)
        li.addEventListener('click', () => {
            logout()
        })
    }
})

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


const autenticar = () => {  
    const id_usuario = sessionStorage.getItem('ID_USUARIO')
    if(id_usuario == null){
        window.location.href = 'http://localhost:3000/'
    }
}

const logout = () => {
    sessionStorage.clear()
    window.location.href = 'http://localhost:3000/'
}

autenticar()