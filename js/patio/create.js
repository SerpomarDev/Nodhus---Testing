document.getElementById('createOrdenCargue').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const jsonData = JSON.stringify(Object.fromEntries(formData));

    fetch('https://esenttiapp-production.up.railway.app/api/ordencargue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos del formulario');
        }
        // Fetch the last inserted ID from the API after successful form submission
        return fetch('https://esenttiapp-production.up.railway.app/api/ordencargue/{id}'); 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el último ID de la orden de cargue');
        }
        return response.json();
    })
    .then(data => {
        const ordenCargueId = data.id; // Extract the ID from the response

        Swal.fire({
            icon: 'success',
            title: 'Formulario enviado',
            text: 'El formulario ha sido enviado con éxito.',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                generarQRCode(ordenCargueId); // Pass the ID to the QR code function
                time(); // Reset the form and redirect after QR code generation
            }
        });
    })
    .catch(error => {
        console.error('Error:', error); 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    });
});


function generarQRCode(ordenCargueId) {
    const qrCodeText = `http://127.0.0.1:5506/view/patio/qr_acceso.html?id=${ordenCargueId}`;
    const qrCodeElement = document.getElementById('qrcode');
    qrCodeElement.innerHTML = ""; 

    new QRCode(qrCodeElement, {
        text: qrCodeText,
        width: 256,
        height: 256,
    });

    const qrModal = new bootstrap.Modal(document.getElementById('qrModal'));
    qrModal.show();

    const downloadButton = document.getElementById('downloadQR');
    downloadButton.addEventListener('click', function() {
        const qrCodeImage = qrCodeElement.querySelector('img');
        const link = document.createElement('a');
        link.href = qrCodeImage.src;
        link.download = `OrdenCargue-${ordenCargueId}.png`;
        link.click();
    });
}

