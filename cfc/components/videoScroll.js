// videoScroll.js - GSAP ScrollTrigger animation for hero video

export function setupHeroVideoScroll() {
    const heroVideo = document.getElementById('hero-video');
    const videoWrapper = document.getElementById('video-wrapper');
    const videoContainer = document.getElementById('video-container');

    const videoTimeline = window.gsap.timeline({
        scrollTrigger: {
            trigger: videoContainer,
            start: 'center 90%',
            end: 'bottom 80%',
            scrub: 1,
            pin: false,
            onEnter: () => heroVideo.play(),
            onLeave: () => heroVideo.pause(),
            onEnterBack: () => heroVideo.play(),
            onLeaveBack: () => heroVideo.pause()
        }
    });

    videoTimeline
        .to(videoWrapper, {
            scale: 2.5,
            borderRadius: '0px',
            padding: '0px',
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(videoWrapper, {
            scale: 4,
            duration: 0.5,
            ease: 'power2.in'
        })
        .to(videoWrapper, {
            scale: 4,
            y: '20vh',
            duration: 0.5,
            ease: 'power2.inOut'
        })
        .to(videoWrapper, {
            opacity: 0,
            scale: 5,
            y: '30vh',
            duration: 0.5,
            ease: 'power2.out'
        });
}
