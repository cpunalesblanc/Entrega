        // Crear un elemento de enlace para el CSS
        const themeStyle = document.createElement('link');
        themeStyle.rel = 'stylesheet';
        document.head.appendChild(themeStyle);
    
        // Cargar el tema preferido
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            themeStyle.href = 'css/modo-noche.css'; // Ruta a tu CSS de modo oscuro
            document.getElementById('toggle-theme').textContent = 'Modo Día';
        } else {
            themeStyle.href = 'css/products-info.css'; // Ruta a tu CSS de modo claro
        }
    
        // Evento para el botón de cambio de tema
        document.getElementById('toggle-theme').addEventListener('click', function() {
            if (themeStyle.href.includes('products-info.css')) {
                themeStyle.href = 'css/modo-noche.css';
                localStorage.setItem('theme', 'dark');
                this.textContent = 'Modo Día';
            } else {
                themeStyle.href = 'css/products-info.css';
                localStorage.setItem('theme', 'light');
                this.textContent = 'Modo Noche';
            }
        });