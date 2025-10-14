// heroStatsCounter.js - GSAP counter animation for hero stats

export function setupHeroStatsCounter() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Animate stat items appearance with stagger
    gsap.from('.hero-stats .stat-item', {
        scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)'
    });

    // Counter animation for numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat, index) => {
        const target = stat.getAttribute('data-target');
        
        // Skip if it's text like "UEFA"
        if (isNaN(parseInt(target))) {
            return;
        }

        const targetNumber = parseInt(target);
        const hasPlus = stat.textContent.includes('+');
        const hasPercent = stat.textContent.includes('%');
        
        // Start from 0
        let currentNumber = 0;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                // Animate the counter
                gsap.to({ val: 0 }, {
                    val: targetNumber,
                    duration: 2.5,
                    delay: index * 0.15,
                    ease: 'power2.out',
                    onUpdate: function() {
                        currentNumber = Math.ceil(this.targets()[0].val);
                        
                        // Format the number with suffix
                        if (hasPlus) {
                            stat.textContent = currentNumber + '+';
                        } else if (hasPercent) {
                            stat.textContent = currentNumber + '%';
                        } else {
                            stat.textContent = currentNumber;
                        }
                    },
                    onComplete: () => {
                        // Add pulse effect when complete
                        gsap.fromTo(stat, 
                            { scale: 1 },
                            { 
                                scale: 1.1,
                                duration: 0.3,
                                yoyo: true,
                                repeat: 1,
                                ease: 'power2.inOut'
                            }
                        );
                    }
                });
            }
        });
    });

    // Add hover effect to stat items
    const statItems = document.querySelectorAll('.hero-stats .stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const statNumber = item.querySelector('.stat-number');
            gsap.to(statNumber, {
                textShadow: '0 5px 25px rgba(196, 18, 48, 0.4)',
                duration: 0.3
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const statNumber = item.querySelector('.stat-number');
            gsap.to(statNumber, {
                textShadow: '0 2px 10px rgba(196, 18, 48, 0.15)',
                duration: 0.3
            });
        });
    });

    console.log('✨ Hero stats counter animations initialized');
}
