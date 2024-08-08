document.addEventListener('DOMContentLoaded', function() {
    let inactivityTimeout;

    function startInactivityTimer() {
        inactivityTimeout = setTimeout(logoutUser, 1 * 60 * 1000); // 5 minutos en milisegundos
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimeout);
        startInactivityTimer();
    }

    async function logoutUser() {
        const authToken = localStorage.getItem("authToken");

        if (authToken) { // Verifica si hay un token antes de intentar cerrar sesión
            try {
                const response = await fetch("https://esenttiapp-production.up.railway.app/api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("userData");
                    document.cookie.split(";").forEach(function(c) {
                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    window.location.href = "index.html";
                } else {
                    // Manejo de errores (puedes mostrar una alerta, etc.)
                    console.error("Error al cerrar sesión:", response.status);
                }
            } catch (error) {
                // Manejo de errores de red
                console.error("Error de red:", error);
            }
        } else {
            // No hay token, redirige directamente a la página de inicio de sesión
            window.location.href = "/index.html";
        }
    }

    // Agrega el event listener al botón de logout
    function addLogoutEventListener() {
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
            logoutButton.addEventListener("click", logoutUser);
        } else {
            setTimeout(addLogoutEventListener, 100);
        }
    }

    // Reinicia el temporizador en cada evento de usuario
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);

    // Inicia el temporizador al cargar la página
    startInactivityTimer();
    addLogoutEventListener();
});