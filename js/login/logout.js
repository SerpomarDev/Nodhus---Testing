document.addEventListener('DOMContentLoaded', function () {
    // Función para agregar el event listener al botón de cierre de sesión (si existe)
    function addLogoutEventListener() {
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
            logoutButton.addEventListener("click", async () => {
                const authToken = localStorage.getItem("authToken");

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
                        window.location.href = "index.html"; // Redirige a la página de inicio de sesión
                    } else {
                        const errorData = await response.json();
                        alert("Error al cerrar sesión: " + (errorData.message || "Inténtalo de nuevo."));
                    }
                } catch (error) {
                    console.error("Error de red:", error);
                    alert("Ocurrió un error de red. Por favor, inténtalo de nuevo más tarde.");
                }
            });
        } else {
            // El botón aún no existe, intentar de nuevo después de un breve retraso
            setTimeout(addLogoutEventListener, 100);
        }
    }

    // Llamar a la función para agregar el event listener
    addLogoutEventListener();
});
