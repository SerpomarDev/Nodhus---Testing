const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    const apiUrlOrdenCargue = `https://esenttiapp-production.up.railway.app/api/ordencargue/${id}`;


    fetch(apiUrlOrdenCargue)
        .then(response => { if (!response.ok) { throw new Error(`Error fetching data: ${response.status} ${response.statusText}`); } return response.json(); }).then(data => { // Llenar los campos del formulario con los datos obtenidos

            document.getElementById('fecha_solicitud').value = data.fecha_solicitud;
            document.getElementById('id_sitio_inspeccion').value = data.id_sitio_inspeccion;
            document.getElementById('id_sitio_inspeccion1').value = data.id_sitio_inspeccion1;
            document.getElementById('id_sitio_inspeccion2').value = data.id_sitio_inspeccion2;
            document.getElementById('contenedor').value = data.contenedor;
            document.getElementById('peso').value = data.peso;
            document.getElementById('funcionario_transporte').value = data.funcionario_transporte;
            document.getElementById('vencimiento_cutoff').value = data.vencimiento_cutoff;
            document.getElementById('hora_soli').value = data.hora_soli;
            document.getElementById('observaciones').value = data.observaciones;
            setSelectedOption('modalidad', data.modalidad);

                   // Obtener datos adicionales y llenar los campos correspondientes
                   // Obtener datos adicionales y llenar los campos correspondientes

            Promise.all([
                fetch('https://esenttiapp-production.up.railway.app/api/loadplaca').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/uploadclientes').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/uploadconductor').then(res => res.json()),
                fetch('https://esenttiapp-production.up.railway.app/api/tiposervicios').then(res => res.json())
            ]).then(([placas, clientes, conductores, tiposServicios]) => { // Llenar los campos de placa, cliente, conductor y tipo de servicio

                populateSelect('id_placa', placas, data.id_placa);
                populateSelect('id_cliente', clientes, data.id_cliente);
                populateSelect('id_conductor', conductores, data.id_conductor);
                populateSelect('id_tipo_operacion', tiposServicios, data.id_tipo_operacion);
            }).catch(error => {
                console.error('Error fetching additional data:', error); // Manejar el error (mostrar un mensaje al usuario, etc.)
            });
        }).catch(error => {
            console.error('Error:', error);
            hideLoadingMessage(); // Ocultar el mensaje de carga en caso de error
                   // Manejar el error (mostrar un mensaje al usuario, etc.)

            showErrorMesage("Error al cargar los datos. Por favor, inténtalo de nuevo.");
        });
} else {
    console.error('ID no encontrado en la URL');
}

// Función auxiliar para llenar un menú desplegable
function populateSelect(selectId, options, selectedValue) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Limpiar opciones existentes


    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.id; // O la propiedad que corresponda en tus datos

        optionElement.text = option.nombre; // O la propiedad que corresponda en tus datos

        selectElement.add(optionElement);
    });


    setSelectedOption(selectId, selectedValue);
}

// Función auxiliar para establecer la opción seleccionada en un menú desplegable
function setSelectedOption(selectId, value) {
    const selectElement = document.getElementById(selectId);
    for (const option of selectElement.options) { if (option.value == value) { option.selected = true; break; } }
}

// Funciones para mostrar/ocultar mensajes de carga y error (debes implementarlas)
function showLoadingMessage() { // ... (Implementa la lógica para mostrar un mensaje de carga)
}

function hideLoadingMessage() { // ... (Implementa la lógica para ocultar el mensaje de carga)
}

function showErrorMesage(message) { // ... (Implementa la lógica para mostrar un mensaje de error)
}