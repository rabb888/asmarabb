// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slideshow Functionality - Enhanced Version
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        if (heroSlides.length > 0) {
            // Show first slide immediately
            showSlide(currentSlide);
            
            // Clear any existing interval
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            
            // Set interval for automatic slideshow
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
            isPlaying = true;
            
            console.log(`Slideshow started with ${heroSlides.length} slides`);
        }
    }

    function pauseSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            isPlaying = false;
        }
    }

    function resumeSlideshow() {
        if (!isPlaying) {
            startSlideshow();
        }
    }

    // Initialize slideshow
    if (heroSlides.length > 0) {
        // Add slideshow controls (optional)
        const heroSlideshow = document.querySelector('.hero-slideshow');
        if (heroSlideshow) {
            // Pause on hover
            heroSlideshow.addEventListener('mouseenter', pauseSlideshow);
            heroSlideshow.addEventListener('mouseleave', resumeSlideshow);
            
            // Touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            heroSlideshow.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            heroSlideshow.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swiped left - next slide
                        nextSlide();
                    } else {
                        // Swiped right - previous slide
                        prevSlide();
                    }
                    // Restart auto-play after manual interaction
                    startSlideshow();
                }
            }
        }
    }

    // Translations object
    const translations = {
        en: {
            // ... (keep existing translations object unchanged)
        },
        ar: {
            // ... (keep existing translations object unchanged)
        }
    };

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
        });
    }
    
    // Language switcher - enhanced version
    const languageSwitcher = document.querySelectorAll('[data-lang]');
    const currentLang = document.documentElement.lang || 'en';
    
    // Function to set language
    function setLanguage(lang) {
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Apply translations
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Update RTL/LTR styles
        updateLayoutDirection(lang);
    }
    
    // Function to update layout direction
    function updateLayoutDirection(lang) {
        const isRTL = lang === 'ar';
        
        // Update body class for RTL support
        document.body.classList.toggle('rtl', isRTL);
        
        // Update specific elements that might need direction changes
        const directionElements = document.querySelectorAll('[data-direction]');
        directionElements.forEach(el => {
            el.style.direction = isRTL ? 'rtl' : 'ltr';
        });
    }
    
    // Initialize language
    setLanguage(currentLang);
    
    // Language switcher event listeners
    languageSwitcher.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // Remove active class from all
            languageSwitcher.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            
            // Switch language
            setLanguage(lang);
            
            // Restart animations if needed
            animateOnScroll();
        });
        
        // Set initial active language
        if (link.dataset.lang === currentLang) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .content-text, .content-image');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Add CSS for animation - Enhanced version
    const style = document.createElement('style');
    style.textContent = `
        .hero-slideshow {
            position: relative;
            overflow: hidden;
        }
        
        .hero-slide {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1.2s ease-in-out;
            background-size: cover;
            background-position: center;
        }
        
        .hero-slide.active {
            opacity: 1;
            z-index: 1;
        }
        
        .hero-slide:not(.active) {
            z-index: 0;
        }
        
        /* Slideshow indicators (optional) */
        .slideshow-indicators {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        
        .indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .indicator.active {
            background: white;
        }
        
        .benefit-card, .content-text, .content-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-card.animate-in, .content-text.animate-in, .content-image.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .main-nav.mobile-active {
            display: block !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #2c3e50;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .main-nav.mobile-active ul {
            flex-direction: column;
            gap: 15px;
        }
        
        /* RTL specific styles */
        body.rtl {
            text-align: right;
        }
        
        body.rtl .hero-content {
            text-align: right;
        }
        
        body.rtl .benefit-card {
            text-align: right;
        }
        
        /* Smooth loading animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-slide.active {
            animation: fadeInUp 1.2s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Initial animation check
    animateOnScroll();
    
    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Back to top functionality
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Start the slideshow automatically
    startSlideshow();
    
    // Restart slideshow when page becomes visible (if user switches tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseSlideshow();
        } else {
            resumeSlideshow();
        }
    });
});
