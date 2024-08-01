document.getElementById('BtnSavePlaca').addEventListener('click', function() {
    var fechaSolicitud = document.getElementById('fecha_solicitud').value;
    var idPlaca = document.getElementById('id_placa').value;
    var idConductor = document.getElementById('id_conductor').value;
    var modalidad = document.getElementById('modalidad').value;
    var idTipoOperacion = document.getElementById('id_tipo_operacion').value;
    var idDestino1 = document.getElementById('id_sitio_inspeccion').value;
    var idDestino2 = document.getElementById('id_sitio_inspeccion').value;
    var idDestino3 = document.getElementById('id_sitio_inspeccion').value;
    var idNaviera = document.getElementById('id_naviera').value;
    var contenedor = document.getElementById('contenedor').value;
    var idTipoContenedor = document.getElementById('id_tipo_contenedor').value;
    var peso = document.getElementById('peso').value;
    var funcionarioTransporte = document.getElementById('funcionario_transporte').value;
    var precinto = document.getElementById('precinto').value;
    var vencimientoCutofi = document.getElementById('vencimiento_cutofi').value;
    var horaSoli = document.getElementById('hora_soli').value;
    var fechaSoli = document.getElementById('fecha_soli').value;
    var observaciones = document.getElementById('observaciones').value;

    var qrData = JSON.stringify({
        fechaSolicitud: fechaSolicitud,
        idPlaca: idPlaca,
        idConductor: idConductor,
        modalidad: modalidad,
        idTipoOperacion: idTipoOperacion,
        idDestino1: idDestino1,
        idDestino2: idDestino2,
        idDestino3: idDestino3,
        idNaviera: idNaviera,
        contenedor: contenedor,
        idTipoContenedor: idTipoContenedor,
        peso: peso,
        funcionarioTransporte: funcionarioTransporte,
        precinto: precinto,
        vencimientoCutoff: vencimientoCutoff,
        horaSolicitud: horaSolicitud,
        observaciones: observaciones
    });

    var qr = qrcode(0, 'L');
    qr.addData(qrData);
    qr.make();

    // Redirigir al escanear (modificado)
    $('#qrModal').on('shown.bs.modal', function () {
        // Esperar a que el contenido del QR esté disponible
        const qrCodeImage = document.querySelector('#qrcode img');
        if (qrCodeImage.complete) {
            const qrCodeUrl = qrCodeImage.src;
            const urlEncodedData = encodeURIComponent(qrCodeUrl);
            window.location.href = `/view/patio/order_details.html?data=${urlEncodedData}`;
        } else {
            qrCodeImage.onload = function() {
                const qrCodeUrl = qrCodeImage.src;
                const urlEncodedData = encodeURIComponent(qrCodeUrl);
                window.location.href = `/view/patio/order_details.html?data=${urlEncodedData}`;
            };
        }
    });

    document.getElementById('qrcode').innerHTML = qr.createImgTag();
    $('#qrModal').modal('show');
});