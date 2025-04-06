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