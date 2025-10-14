// postVideoReveal.js - PRO GSAP ScrollTrigger animations for post-video content

export function setupPostVideoReveal() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Configuración base para todas las animaciones
    gsap.defaults({
        ease: 'power3.out',
        duration: 1
    });

    // Animación del headline principal
    gsap.from('#post-video-reveal h2', {
        scrollTrigger: {
            trigger: '#post-video-reveal',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1.5
    });

    // Animación del párrafo
    gsap.from('#post-video-reveal p', {
        scrollTrigger: {
            trigger: '#post-video-reveal',
            start: 'top 65%',
            end: 'top 30%',
            scrub: 1,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        duration: 1.5
    });

    // Animación stagger de las stat cards (efecto cascada PRO)
    const statCards = document.querySelectorAll('.stat-card');
    gsap.from(statCards, {
        scrollTrigger: {
            trigger: '.stat-card',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotationX: -15,
        stagger: {
            amount: 0.6,
            from: 'start'
        },
        duration: 1.2
    });

    // Hover effect para stat cards (3D tilt)
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(196, 18, 48, 0.15)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Animación de los botones CTA
    const ctaButtons = document.querySelectorAll('#post-video-reveal a[href^="#"]');
    gsap.from(ctaButtons, {
        scrollTrigger: {
            trigger: '#post-video-reveal a[href^="#"]',
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.2,
        duration: 1
    });

    // Efecto parallax suave en el overlay gradient
    gsap.to('#post-video-reveal .absolute.inset-0', {
        scrollTrigger: {
            trigger: '#post-video-reveal',
            start: 'top bottom',
            end: 'top top',
            scrub: 2
        },
        opacity: 0,
        y: -50
    });

    // Animación de entrada para números (counter effect)
    statCards.forEach((card, index) => {
        const numberElement = card.querySelector('.gradient-text');
        const originalText = numberElement.textContent;
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 75%',
            onEnter: () => {
                // Efecto de counter animado
                gsap.from(numberElement, {
                    textContent: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    delay: index * 0.1,
                    onUpdate: function() {
                        // Mantener el formato original (7+, 500+, etc.)
                        if (originalText.includes('+')) {
                            numberElement.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                        }
                    },
                    onComplete: () => {
                        numberElement.textContent = originalText;
                    }
                });
            }
        });
    });

    // Efecto de brillo en hover para CTAs
    const primaryCTA = document.querySelector('#post-video-reveal a[href="#contact"]');
    if (primaryCTA) {
        primaryCTA.addEventListener('mouseenter', () => {
            gsap.to(primaryCTA, {
                boxShadow: '0 10px 40px rgba(196, 18, 48, 0.4)',
                duration: 0.3
            });
        });

        primaryCTA.addEventListener('mouseleave', () => {
            gsap.to(primaryCTA, {
                boxShadow: '0 4px 20px rgba(196, 18, 48, 0.2)',
                duration: 0.3
            });
        });
    }

    console.log('✨ Post-video reveal animations initialized (PRO MODE)');
}
