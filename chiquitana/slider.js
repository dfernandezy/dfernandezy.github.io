class Slider {
    constructor () {
        this.slider = document.querySelector('.slider');
        this.dots = document.querySelectorAll('.slider-dot');
        this.currentIndex = 0;
        this.autoplayInterval = 5000; // 5 segundos entre slides

        // Solo inicializar si los elementos existen
        if (this.slider && this.dots.length > 0) {
            this.init();
        }
    }

    init() {
        this.dots.forEach(dot => {
            if (dot) {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.dataset.index);
                    this.goToSlide(index);
                });
            }
        });

        // Iniciar autoplay solo si hay dots
        if (this.dots.length > 0) {
            this.startAutoplay();
        }
    }

    goToSlide(index) {
        // Validar que el slider existe
        if (!this.slider) return;
        
        this.currentIndex = index;
        this.slider.style.transform = `translateX(-${index * 100}%)`;

        // Actualizar dots
        this.dots.forEach(dot => {
            if (dot) dot.classList.remove('active');
        });
        
        // Validar que el dot existe antes de añadir la clase
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
    }

    startAutoplay() {
        // Solo iniciar autoplay si hay dots
        if (this.dots.length === 0) return;
        
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.dots.length;
            this.goToSlide(this.currentIndex);
        }, this.autoplayInterval);
    }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo crear el slider si los elementos necesarios existen
    const slider = document.querySelector('.slider');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slider && dots.length > 0) {
        new Slider();
    }
});
