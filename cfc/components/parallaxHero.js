// parallaxHero.js - Parallax effect for hero background

export function setupParallaxHero() {
    window.gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}
