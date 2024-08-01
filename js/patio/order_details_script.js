const urlParams = new URLSearchParams(window.location.search);
const qrCodeUrl = urlParams.get('data'); // Obtener la URL del QR code

if (qrCodeUrl) {
    // Decodificar la URL del QR code
    const qrDataJSON = decodeURIComponent(qrCodeUrl).split(',')[1];

    if (qrDataJSON) {
        const orderData = JSON.parse(qrDataJSON);

        const orderDetailsDiv = document.getElementById('orderDetails');
        for (const key in orderData) {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'field';

            const label = document.createElement('label');
            label.textContent = key + ':';

            const valueSpan = document.createElement('span');
            valueSpan.textContent = orderData[key];

            fieldDiv.appendChild(label);
            fieldDiv.appendChild(valueSpan);
            orderDetailsDiv.appendChild(fieldDiv);
        }
    } else {
        // Manejar el caso en el que no se proporcionen datos QR
        const orderDetailsDiv = document.getElementById('orderDetails');
        orderDetailsDiv.textContent = "No se encontraron datos de la orden de cargue.";
    }
} else {
    // Manejar el caso en el que no se proporcione una URL de QR code válida
    const orderDetailsDiv = document.getElementById('orderDetails');
    orderDetailsDiv.textContent = "URL de QR code no válida.";
}
