

const recolherCard = () => {
    const cardExpansivo = document.querySelector('.card-expansive');
    const icon = cardExpansivo.querySelector('.titulo i');
    const clientesContent = cardExpansivo.querySelector('.clientes-content');
    const nivelOkContent = cardExpansivo.querySelector('.nivel-ok-content');
    if (clientesContent.style.display === 'none') {
        clientesContent.style.display = 'block';
        nivelOkContent.style.display = 'block';
        icon.classList.remove('bx-caret-down');
        icon.classList.add('bx-caret-up');
    } else {
        clientesContent.style.display = 'none';
        nivelOkContent.style.display = 'none';
        icon.classList.remove('bx-caret-up');
        icon.classList.add('bx-caret-down');
    }
}

const recolherCard2 = () => {
    const cardExpansivo = document.querySelector('.card-expansive2');
    const icon = cardExpansivo.querySelector('.titulo i');
    const clientesContent = cardExpansivo.querySelector('.clientes-content');
    const nivelOkContent = cardExpansivo.querySelector('.nivel-ok-content');
    if (clientesContent.style.display === 'none') {
        clientesContent.style.display = 'block';
        nivelOkContent.style.display = 'block';
        icon.classList.remove('bx-caret-down');
        icon.classList.add('bx-caret-up');
    } else {
        clientesContent.style.display = 'none';
        nivelOkContent.style.display = 'none';
        icon.classList.remove('bx-caret-up');
        icon.classList.add('bx-caret-down');
    }
}