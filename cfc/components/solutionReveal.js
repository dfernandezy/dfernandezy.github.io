// solutionReveal.js - Epic GSAP ScrollTrigger animations for Solution section

export function setupSolutionReveal() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Header animation - fade in from top with elegant ease
    gsap.from('.solution-header h2', {
        scrollTrigger: {
            trigger: '.solution-header',
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -80,
        scale: 0.95,
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.solution-header p', {
        scrollTrigger: {
            trigger: '.solution-header',
            start: 'top 70%',
            end: 'top 35%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out'
    });

    // Text content - elegant slide from left
    gsap.from('.solution-text', {
        scrollTrigger: {
            trigger: '.solution-text',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.5,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -100,
        duration: 1.8,
        ease: 'power3.out'
    });

    // Feature items stagger animation
    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.solution-features',
            start: 'top 70%',
            end: 'top 35%',
            scrub: 1.5,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -60,
        stagger: {
            amount: 0.8,
            from: 'start'
        },
        duration: 1.2,
        ease: 'back.out(1.2)'
    });

    // Dashboard - epic reveal from right with scale
    gsap.from('.solution-dashboard', {
        scrollTrigger: {
            trigger: '.solution-dashboard',
            start: 'top 70%',
            end: 'top 25%',
            scrub: 1.8,
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 120,
        scale: 0.9,
        rotationY: -15,
        duration: 2,
        ease: 'power4.out'
    });

    // Progress bars animation - fill effect
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            width: targetWidth,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.3
        });
    });

    // Dashboard cards hover effect with GSAP
    const dashboardCards = document.querySelectorAll('.solution-dashboard .bg-red-50');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                y: -5,
                boxShadow: '0 10px 30px rgba(196, 18, 48, 0.15)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                y: 0,
                boxShadow: '0 0 0 rgba(196, 18, 48, 0)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Main dashboard container parallax on scroll
    gsap.to('.solution-dashboard .bg-white', {
        scrollTrigger: {
            trigger: '.solution-dashboard',
            start: 'top 60%',
            end: 'bottom 20%',
            scrub: 2
        },
        y: -30,
        ease: 'none'
    });

    // Gradient text glow animation
    const gradientText = document.querySelector('.solution-header .gradient-text');
    if (gradientText) {
        gsap.to(gradientText, {
            scrollTrigger: {
                trigger: gradientText,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            textShadow: '0 4px 30px rgba(196, 18, 48, 0.3)',
            duration: 1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 1
        });
    }

    console.log('✨ Solution section reveal animations initialized (EPIC MODE)');
}
