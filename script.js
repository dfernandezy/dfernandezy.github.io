document.addEventListener('DOMContentLoaded', function() {
    const dividedSection = document.querySelector('.divided');
    let isScrolling = false;
    let canActivate = false; // Inicialmente, no se puede activar

    // Espera 2 segundos antes de permitir la activación inicial
    setTimeout(() => {
        canActivate = true;
    }, 2000); // 2000 milisegundos = 2 segundos

    dividedSection.addEventListener('mouseover', function() {
        if (!canActivate || isScrolling) return; // Evita activaciones si no se puede activar o ya está desplazándose

        const targetY = dividedSection.getBoundingClientRect().top + window.scrollY; // Posición absoluta de la sección
        const startingY = window.scrollY; // Posición actual de desplazamiento
        const distance = targetY - startingY; // Distancia a desplazar
        const startTime = performance.now(); // Tiempo de inicio del desplazamiento

        // Duración del desplazamiento (ms)
        const duration = 1000; // Ajusta este valor según la velocidad deseada (1000ms = 1 segundo)

        function easeInOutQuad(t, b, c, d) {
            // Función easing para suavizar el movimiento
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        function scroll() {
            isScrolling = true; // Marca que el desplazamiento está en progreso
            const currentTime = performance.now();
            const timeElapsed = currentTime - startTime;

            window.scrollTo(0, easeInOutQuad(timeElapsed, startingY, distance, duration));

            if (timeElapsed < duration) {
                requestAnimationFrame(scroll);
            } else {
                window.scrollTo(0, targetY);
                isScrolling = false; // Reinicia la bandera al finalizar el desplazamiento

                // Configura un tiempo de espera antes de permitir otra activación
                setTimeout(() => {
                    canActivate = true;
                }, 5000); // 5000 milisegundos = 5 segundos
            }
        }

        scroll();
        canActivate = false; // Desactiva la capacidad de activar nuevamente
    });
});
