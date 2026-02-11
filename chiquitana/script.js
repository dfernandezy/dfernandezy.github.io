gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

// // Detectar si es dispositivo móvil
// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (isMobile) {
//     // Configuración de los puntos de anclaje
//     const sections = [".hero", ".heading", ".about-hero"];

//     // Crear un ScrollTrigger principal que maneje todos los snaps
//     ScrollTrigger.create({
//         snap: {
//             snapTo: sections.map((_, i) => i / (sections.length - 1)),
//             duration: { min: 0.3, max: 0.6 },
//             ease: "power1.inOut",
//             inertia: true
//         }
//     });

//     // Configurar cada sección
//     sections.forEach(section => {
//         ScrollTrigger.create({
//             trigger: section,
//             start: "top center",
//             end: "bottom center",
//             markers: false
//         });
//     });
// }

// Loading animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});


// Crear el efecto de scroll suave optimizado para móvil
let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 0.1,
    effects: true,
    // normalizeScroll: true, // PRueba
    // ignoreMobileResize: true, // PRueba
    // preventDefault: true, // PRueba
    lockAxis: true,    // bloquea el eje para evitar saltos
    // renderFixed: false // ayuda con elementos fijos
});

// Animación de trazado SVG
if (document.querySelector('.draw') && document.querySelector('.heading')) {
    gsap.from('.draw', {
        drawSVG: "0%",
        ease: "expo.out",
        scrollTrigger: {
            trigger: '.heading',
            start: "clamp(center center)",
            scrub: true,
            pin: '.pin',
            pinSpacing: false,
        }
    });
}

// Mostrar "En España." cuando el pin está activo
ScrollTrigger.create({
    trigger: ".hero",
    start: "center center",
    end: "bottom top",
    onEnter: () => document.getElementById('en-espana').classList.add('visible'),
    onLeaveBack: () => document.getElementById('en-espana').classList.remove('visible')
});

// Setup visual
gsap.set(".logo img", { opacity: 1 });

// // Animación para las tarjetas de texto
// gsap.from(".text-card", {
//     scrollTrigger: {
//         trigger: ".text-card",
//         start: "top bottom-=100",
//         toggleActions: "play none none reverse"
//     },
//     y: 50,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.3,
//     ease: "power3.out"
// });

// // Animación para los textos dentro de las tarjetas
// gsap.from([".overline", ".about-title, .exp-title", ".about-desc, .exp-desc", ".highlight-text"], {
//     scrollTrigger: {
//         trigger: ".text-card",
//         start: "top bottom-=100",
//         toggleActions: "play none none reverse"
//     },
//     y: 20,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: "power2.out"
// });


document.addEventListener('DOMContentLoaded', function () {
    const menuNav = document.querySelector('.menu-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', menuNav.classList.contains('open'));
    });

    // Cierra el menú al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (!menuNav.contains(e.target)) {
            menuNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Cierra el menú al seleccionar una opción
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu-list');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('open');
            // Opcional: cambia el icono o aria-expanded
            toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            smoother.scrollTo(target, true, "top top");
            // Opcional: actualiza el hash en la URL
            history.replaceState(null, null, '#' + targetId);
        }
    });
});


// Funcionalidad de deslizamiento para el slider
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    // Verificar si existe el slider antes de continuar
    if (!slider) {
        console.log("No se encontró el elemento slider");
        return;
    }

    const slides = document.querySelectorAll('.slider > div');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let startX = 0;
    let isDragging = false;
    let startTime = 0;
    let autoplayInterval;

    // Función para mostrar slide específico
    function showSlide(index) {
        // Comprobar que el índice es válido
        if (slides.length === 0) return;

        // Asegurarnos de que el índice está dentro del rango válido
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;

        // ...sin dots, solo actualiza el slide
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        if (slides.length <= 1) return; // No avanzar si solo hay un slide o ninguno
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        if (slides.length <= 1) return; // No retroceder si solo hay un slide o ninguno
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Event listeners para los botones de navegación
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Iniciar autoplay
    function startAutoplay() {
        // No iniciar autoplay si no hay suficientes slides
        if (slides.length <= 1) return;

        // Detener cualquier intervalo existente
        stopAutoplay();

        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambiar cada 5 segundos
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Pausar autoplay cuando se interactúa con el slider
    function pauseAutoplay() {
        stopAutoplay();
        // Reiniciar después de 10 segundos de inactividad solo si hay más de un slide
        if (slides.length > 1) {
            setTimeout(startAutoplay, 10000);
        }
    }

    // Agregar listeners para pausar autoplay
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    dots.forEach(dot => dot.addEventListener('click', pauseAutoplay));
    if (prevBtn) prevBtn.addEventListener('click', pauseAutoplay);
    if (nextBtn) nextBtn.addEventListener('click', pauseAutoplay);

    // Event listeners para touch (móvil)
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        isDragging = true;
        stopAutoplay();
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const timeDiff = Date.now() - startTime;

        // Determinar si fue un swipe válido (mínimo 30px de distancia y máximo 300ms)
        if (Math.abs(diff) > 30 && timeDiff < 300) {
            if (diff > 0) {
                nextSlide(); // Deslizar hacia la izquierda - siguiente imagen
            } else {
                prevSlide(); // Deslizar hacia la derecha - imagen anterior
            }
        }

        isDragging = false;
        startAutoplay();
    }, { passive: true });

    // Event listeners para mouse (escritorio)
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startTime = Date.now();
        isDragging = true;
        slider.style.cursor = 'grabbing';
        stopAutoplay();
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;

        const endX = e.clientX;
        const diff = startX - endX;
        const timeDiff = Date.now() - startTime;

        // Determinar si fue un swipe válido
        if (Math.abs(diff) > 30 && timeDiff < 300) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
        slider.style.cursor = 'grab';
        startAutoplay();
    });

    // Prevenir arrastre de imágenes
    slider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Comprobar el número de slides
    if (slides.length > 0) {
        console.log(`Número de slides encontrados: ${slides.length}`);
        // Inicializar
        showSlide(0);
        // Iniciar autoplay solo si hay más de un slide
        if (slides.length > 1) {
            startAutoplay();
        }
    } else {
        console.log("No se encontraron slides");
    }
});

// Estos event listeners ya están definidos dentro del DOMContentLoaded
// y están causando duplicación y conflictos, así que los eliminamos

// Estos event listeners ya están definidos o deberían estar dentro del DOMContentLoaded
// y están causando errores porque las variables no están definidas en este ámbito
// ========================================
// Animación del Footer Signature (Nodo Digital)
// ========================================
gsap.timeline({
    scrollTrigger: {
        trigger: "#footer-signature-section",
        start: "top bottom-=100",
        end: "top center",
        toggleActions: "play none none reverse",
        // markers: true // Descomenta para debug
    }
})
    // Animar el copyright desde abajo
    .to(".footer-copyright", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    // Animar el logo y texto de Nodo desde la derecha
    .to("#nodo-signature", {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    // Pequeña rotación y escala del logo SVG
    .from(".nodo-logo-svg", {
        scale: 0,
        rotation: -180,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.6")
    // Efecto de "respiración" sutil en el texto
    .to(".nodo-text", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.3");

// Efecto hover mejorado con GSAP para el logo
document.querySelector('#nodo-signature')?.addEventListener('mouseenter', function() {
    gsap.to('.nodo-logo-svg', {
        rotation: 5,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
    });
    gsap.to('.nodo-text', {
        x: 3,
        duration: 0.3,
        ease: "power2.out"
    });
});

document.querySelector('#nodo-signature')?.addEventListener('mouseleave', function() {
    gsap.to('.nodo-logo-svg', {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });
    gsap.to('.nodo-text', {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
    });
});

// ========================================
// Animación Nodo Glow en Footer
// ========================================
ScrollTrigger.create({
    trigger: ".footer-modern-bottom",
    start: "top bottom-=200",
    end: "top center",
    onEnter: () => {
        document.querySelector('.footer-nodo-icon')?.classList.add('glowing');
    },
    onLeaveBack: () => {
        document.querySelector('.footer-nodo-icon')?.classList.remove('glowing');
    }
});

// ========================================
// Timeline Animation - Bolivia en Barcelona
// ========================================
// Animaciones Historia con Scroll Reveal
// ========================================

gsap.utils.toArray('.historia-block').forEach((block, index) => {
    const textBlock = block.querySelector('.historia-block-text');
    const imageBlock = block.querySelector('.historia-reveal-img');
    
    // Animación del bloque completo
    gsap.fromTo(block,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: block,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Animación del texto con reveal gradual
    gsap.from(textBlock, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: block,
            start: "top center+=100",
            toggleActions: "play none none reverse"
        }
    });

    // Animación de la imagen con zoom y opacity
    gsap.from(imageBlock, {
        opacity: 0,
        scale: 1.15,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
            trigger: block,
            start: "top center+=100",
            toggleActions: "play none none reverse"
        }
    });
});


// ========================================
// Animaciones Sección Sobre Nosotros
// ========================================

// Animación del contenido
gsap.from(".sobre-nosotros-content", {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".sobre-nosotros-hero",
        start: "top center",
        toggleActions: "play none none reverse"
    }
});

// Animación de stats con contador
gsap.utils.toArray('.stat-item').forEach((item, index) => {
    const number = item.querySelector('.stat-number');
    const finalValue = number.textContent;
    
    gsap.from(item, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
            trigger: ".sobre-nosotros-hero",
            start: "top center",
            toggleActions: "play none none reverse"
        }
    });
});

// Animación de galería - items con stagger
gsap.from(".gallery-item", {
    opacity: 0,
    scale: 0.95,
    y: 30,
    duration: 0.8,
    ease: "back.out",
    stagger: 0.15,
    scrollTrigger: {
        trigger: ".sobre-nosotros-gallery",
        start: "top center+=100",
        toggleActions: "play none none reverse"
    }
});

// Parallax sutil en imágenes de galería
gsap.utils.toArray('.gallery-img').forEach((img) => {
    gsap.to(img, {
        yPercent: 10,
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            markers: false
        }
    });
});
