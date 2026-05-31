/**
 * RENAISSANCE STUDIO - Architectural Interactions
 * Designed with GSAP and custom minimal luxury animations.
 */

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavbarScroll();
    initMobileNav();
    initHeroAnimations();
    initPhilosophyDraw();
    initFounderAnimations();
    initPortfolioParallax();
    initServicesStagger();
    initProcessTimeline();
    initQuoteParallax();
    initContactScroll();
});

/**
 * Custom Minimal Cursor - Follows mouse with sleek easing and expands on hover
 */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('customCursorDot');
    
    if (!cursor || !dot) return;

    // Move cursor with mouse
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: 'power3.out'
        });
        
        gsap.to(dot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power3.out'
        });
    });

    // Expand cursor on hoverable elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .form-input, .btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = '#B08D57'; // Accent Gold color
            cursor.style.backgroundColor = 'rgba(176, 141, 87, 0.05)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = '#B08D57';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/**
 * Navbar - Transitions to solid background after scrolling past Hero height
 */
function initNavbarScroll() {
    const header = document.getElementById('headerNav');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Dynamically adjust header theme if currently over dark sections (like quote section)
        let isOverDark = false;
        sections.forEach(sec => {
            if (sec.classList.contains('dark-section') || sec.id === 'dramaticQuote') {
                const rect = sec.getBoundingClientRect();
                if (rect.top <= 70 && rect.bottom >= 0) {
                    isOverDark = true;
                }
            }
        });

        if (isOverDark) {
            header.classList.add('scrolled-dark');
            header.style.color = '#F8F6F1';
            document.querySelectorAll('.nav-link').forEach(link => link.style.color = '#F8F6F1');
            document.querySelector('.nav-logo-text').style.color = '#F8F6F1';
            document.querySelectorAll('.mobile-nav-toggle span').forEach(span => span.style.backgroundColor = '#F8F6F1');
        } else {
            header.classList.remove('scrolled-dark');
            header.style.color = '';
            document.querySelectorAll('.nav-link').forEach(link => link.style.color = '');
            document.querySelector('.nav-logo-text').style.color = '';
            document.querySelectorAll('.mobile-nav-toggle span').forEach(span => span.style.backgroundColor = '');
        }
    });
}

/**
 * Mobile Navigation Toggle Overlay
 */
function initMobileNav() {
    const toggle = document.getElementById('mobileNavToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('open');
        
        // Inline layout adaptation for mobile links
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '0';
            navLinks.style.right = '0';
            navLinks.style.width = '70%';
            navLinks.style.height = '100vh';
            navLinks.style.backgroundColor = '#F8F6F1';
            navLinks.style.padding = '120px 40px';
            navLinks.style.boxShadow = '-10px 0 30px rgba(0,0,0,0.05)';
            navLinks.style.zIndex = '99';
            
            // Stagger nav links in
            gsap.fromTo('.nav-link', {
                opacity: 0,
                x: 30
            }, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: 'power3.out'
            });
        } else {
            navLinks.style.display = '';
        }
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('open');
            navLinks.style.display = '';
        });
    });
}

/**
 * Hero Section - Staggered fade in/scale reveals for high editorial feel
 */
function initHeroAnimations() {
    const tl = gsap.timeline();

    // Scale down hero image slightly (gives professional space compression feel)
    tl.to('#heroBgImg', {
        scale: 1,
        duration: 2.5,
        ease: 'power3.out'
    });

    // Fade in text blocks line by line
    tl.fromTo('#heroAccent', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=1.8");

    tl.fromTo('#heroTitle', {
        opacity: 0,
        letterSpacing: '0.05em',
        y: 40
    }, {
        opacity: 1,
        letterSpacing: '0.18em',
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, "-=1.5");

    tl.fromTo('#heroSubheading', {
        opacity: 0,
        y: 25
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=1.1");

    tl.fromTo('#heroBtnWrap', {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.8");

    // Fade up scroll indicator
    tl.fromTo('#scrollIndicator', {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.8
    }, "-=0.3");
}

/**
 * Philosophy Section - SVG line-drawing temple and fade-up texts
 */
function initPhilosophyDraw() {
    // Staggered quote and paragraph reveal
    gsap.fromTo('#philosophyQuote', {
        opacity: 0,
        y: 30
    }, {
        scrollTrigger: {
            trigger: '#philosophy',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.fromTo('#philosophyDesc', {
        opacity: 0,
        y: 20
    }, {
        scrollTrigger: {
            trigger: '#philosophyQuote',
            start: 'bottom 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // SVG Line Drawing Animation representing the Greek temple columns
    const paths = document.querySelectorAll('#templeDrawing svg .draw-path');
    
    paths.forEach(path => {
        const length = path.getTotalLength();
        
        // Clear previous dash array styles
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '#templeDrawing',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

/**
 * Founder Section - Mask clip-path slide in reveal and staggered textual info
 */
function initFounderAnimations() {
    // Founder Image Slide Up Mask Reveal
    gsap.fromTo('#founderImgWrapper img', {
        scale: 1.2,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
    }, {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%'
        },
        scale: 1,
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
        duration: 1.6,
        ease: 'power4.inOut'
    });

    // Content fade and text offset entries
    gsap.fromTo('#founderContent', {
        opacity: 0,
        x: 40
    }, {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%'
        },
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
}

/**
 * Portfolio masonry Section - Parallax scaling on images as viewport scrolls past
 */
function initPortfolioParallax() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(card => {
        const img = card.querySelector('.project-img');
        
        gsap.fromTo(img, {
            yPercent: -10
        }, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Fade in project card container initially
        gsap.fromTo(card, {
            opacity: 0,
            y: 40
        }, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

/**
 * Services List - Sequential card animations that reveal sequentially in a grid
 */
function initServicesStagger() {
    gsap.fromTo('.service-card', {
        opacity: 0,
        y: 50
    }, {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });
}

/**
 * Design Process Timeline - Horizontal scroll snapping and timeline highlights
 */
function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step, idx) => {
        gsap.fromTo(step, {
            opacity: 0,
            x: 50
        }, {
            scrollTrigger: {
                trigger: '#process',
                start: 'top 75%'
            },
            opacity: 1,
            x: 0,
            delay: idx * 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Connect visual progress lines
        const line = step.querySelector('.process-step-line');
        if (line) {
            gsap.fromTo(line, {
                scaleX: 0
            }, {
                scrollTrigger: {
                    trigger: '#process',
                    start: 'top 70%'
                },
                scaleX: 1,
                transformOrigin: 'left',
                delay: idx * 0.15 + 0.3,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    });
}

/**
 * Quote Section - Dramatic Parallax & text scaling
 */
function initQuoteParallax() {
    gsap.fromTo('#quoteBg', {
        scale: 1.15,
        yPercent: -12
    }, {
        scale: 1.02,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
            trigger: '#dramaticQuote',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.fromTo('#quoteText', {
        opacity: 0,
        y: 30
    }, {
        scrollTrigger: {
            trigger: '#dramaticQuote',
            start: 'top 60%'
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
}

/**
 * Contact Details & Form Elements Fade up
 */
function initContactScroll() {
    gsap.fromTo('#contactInfo', {
        opacity: 0,
        x: -40
    }, {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.fromTo('#contactFormContainer', {
        opacity: 0,
        x: 40
    }, {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });
}
