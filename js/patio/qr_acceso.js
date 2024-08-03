const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    const apiUrlOrdenCargue = `https://esenttiapp-production.up.railway.app/api/ordencargue/${id}`;


    fetch(apiUrlOrdenCargue)
        .then(response => { if (!response.ok) { throw new Error(`Error fetching data: ${response.status} ${response.statusText}`); } return response.json(); }).then(data => {

            document.getElementById('fecha_solicitud').value = data.fecha_solicitud;
            document.getElementById('id_sitio_inspeccion').value = data.id_sitio_inspeccion;
            document.getElementById('id_sitio_inspeccion1').value = data.id_sitio_inspeccion1;
            document.getElementById('id_sitio_inspeccion2').value = data.id_sitio_inspeccion2;
            document.getElementById('contenedor').value = data.contenedor;
            document.getElementById('peso').value = data.peso;
            document.getElementById('funcionario_transporte').value = data.funcionario_transporte;
            document.getElementById('vencimiento_cutoff').value = data.vencimiento_cutoff;
            document.getElementById('hora_soli').value = data.hora_soli;
            document.getElementById('precinto').value = data.precinto;
            document.getElementById('observaciones').value = data.observaciones;
            setSelectedOption('modalidad', data.modalidad);


            Promise.all([
                fetch('https://esenttiapp-production.up.railway.app/api/loadplaca').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/uploadclientes').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/uploadconductor').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/tiposervicios').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/navieras').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/tipocontenedores').then(res => res.json())
            ]).then(([placas, clientes, conductores, tiposServicios, navieras, tipocontenedores]) => {

                populateSelect('id_placa', placas, data.id_placa);
                populateSelect('id_cliente', clientes, data.id_cliente);
                populateSelect('id_conductor', conductores, data.id_conductor);
                populateSelect('id_tipo_operacion', tiposServicios, data.id_tipo_operacion);
                populateSelect('id_naviera', navieras, data.id_naviera);
                populateSelect('id_tipo_contenedor', tipocontenedores, data.id_tipo_contenedor);
            }).catch(error => {
                console.error('Error data:', error);
            });
        }).catch(error => {
            console.error('Error:', error);
            hideLoadingMessage();

            showErrorMesage("Error al cargar los datos. Por favor, inténtalo de nuevo.");
        });
} else {
    console.error('ID no encontrado en la URL');
}


function populateSelect(selectId, options, selectedValue) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '';


    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;

        optionElement.text = option.nombre;
        selectElement.add(optionElement);
    });


    setSelectedOption(selectId, selectedValue);
}


function setSelectedOption(selectId, value) {
    const selectElement = document.getElementById(selectId);
    for (const option of selectElement.options) { if (option.value == value) { option.selected = true; break; } }
}


function showLoadingMessage() {
    // Crea un elemento div para el mensaje de carga
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loading-message';
    loadingMessage.textContent = 'Cargando...';

    // Estiliza el mensaje (opcional)
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.padding = '10px';
    loadingMessage.style.backgroundColor = '#f0f0f0';

    // Agrega el mensaje al cuerpo del documento
    document.body.appendChild(loadingMessage);
}

function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        document.body.removeChild(loadingMessage);
    }
}

function showErrorMessage(message) {

    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.textContent = message;

    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '10px';
    errorMessage.style.left = '10px';
    errorMessage.style.padding = '10px';
    errorMessage.style.backgroundColor = '#f5c6cb'; // Rojo claro
    errorMessage.style.color = '#721c24'; // Rojo oscuro

    document.body.appendChild(errorMessage);

    setTimeout(() => {
        if (errorMessage) {
            document.body.removeChild(errorMessage);
        }
    }, 5000); // 5 segundos
}