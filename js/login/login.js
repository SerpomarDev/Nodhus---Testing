// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM relevantes
    const loginButton = document.getElementById("login-button");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close-btn");
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Manejar el clic en el botón de inicio de sesión
    loginButton.addEventListener("click", () => {
        overlay.style.display = "block"; // Mostrar el formulario de inicio de sesión
    });

    // Manejar el clic en el botón de cerrar
    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none"; // Ocultar el formulario de inicio de sesión
    });

    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar el envío predeterminado del formulario

        // Obtener los valores de los campos de usuario y contraseña
        const email = usernameInput.value;
        const password = passwordInput.value;

        try {
            // Realizar la solicitud de inicio de sesión a la API
            const response = await fetch("https://esenttiapp-production.up.railway.app/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario: email,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Almacenar el token en el almacenamiento local del navegador
                localStorage.setItem("authToken", data.token);

                // Redirigir al usuario a la página home.html
                window.location.href = "home.html";
            } else {
                // Manejar el caso en que las credenciales son inválidas
                alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            // Manejar errores de red o de la API
            console.error("Error durante el inicio de sesión:", error);
            alert("Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.");
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Asegura que el evento se adjunte después de que el contenido del formulario esté cargado
    $("#layoutv2-placeholder").load("/Componentes/layoutv2.html", function() {
      console.log('layoutv2 loaded'); // Mensaje de depuración
      initializeLoginComponent(); // Inicializa el componente después de cargar el contenido
      attachLoginFormEvent(); // Agrega el evento al formulario de login
    });
  });
