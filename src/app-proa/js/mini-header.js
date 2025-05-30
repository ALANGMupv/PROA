document.querySelectorAll('.btn-header-rol').forEach(boton => {
    boton.addEventListener('click', () => {
        const rol = boton.dataset.rol;

        // Detecta ruta base relativa correcta
        let basePath = '';
        const path = window.location.pathname;

        if (path.includes('/app-proa/alumno/') || path.includes('/app-proa/profesor/') || path.includes('/app-proa/pas/')) {
            basePath = '../../';
        } else if (path.includes('/app-proa/')) {
            basePath = '../';
        }

        const url = basePath + 'app-proa/app/cambiar-rol.php';
        console.log("Llamando a:", url);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: new URLSearchParams({ rol })
        })
            .then(res => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (res.status >= 400) {
                    return res.text().then(msg => {
                        console.error("Error del servidor:", msg);
                        alert("No se pudo cambiar de rol");
                    });
                } else {
                    console.warn("No redirigido. Revisa la respuesta.");
                }
            })
            .catch(err => {
                console.error("Error de red al cambiar de rol:", err);
                alert("Error de red al cambiar de rol");
            });
    });
});
