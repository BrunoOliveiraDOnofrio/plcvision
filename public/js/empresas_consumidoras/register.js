const form = document.querySelector('#form_empresa_consumidora');

const cadastrar = async (event) => {
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data['empresa_fabricante_id'] = sessionStorage.getItem('EMPRESA_ID')
    console.log(data);
    try {
        const response = await fetch('/consumidor/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.href = '../consumidores';
        } else {
            console.log('Erro ao cadastrar empresa consumidora:', response.statusText);
            const errorData = await response.json();
            console.error('Error data:', errorData);
            console.log(response.body)
            alert('Erro ao cadastrar empresa consumidora');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}