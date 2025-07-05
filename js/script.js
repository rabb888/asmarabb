/**
 * Enhanced Business Website Script
 * Combines slideshow functionality with modern UI interactions
 */

class EnhancedBusinessWebsite {
    constructor() {
        this.config = {
            slideInterval: 5000,
            animationDuration: 1500,
            scrollThreshold: 100,
            swipeThreshold: 50,
            counterSpeed: 200
        };
        
        this.state = {
            currentSlide: 0,
            isPlaying: false,
            slideInterval: null,
            touchStartX: 0,
            touchEndX: 0
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initSlideshow();
        this.initNavigation();
        this.initScrollEffects();
        this.initCounters();
        this.initBackToTop();
        this.injectStyles();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Visibility change handler
        this.setupVisibilityHandler();
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger, .mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu, .main-nav');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active', 'mobile-active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active', 'mobile-active');
                });
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetInterval();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetInterval();
            }
        });
    }

    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSlideshow();
            } else {
                this.resumeSlideshow();
            }
        });
    }

    initSlideshow() {
        const slides = document.querySelectorAll('.hero-slide, .slide');
        if (slides.length === 0) return;

        this.slides = slides;
        this.totalSlides = slides.length;

        // Set initial background images
        this.slides.forEach((slide, index) => {
            const bgImage = slide.dataset.bg;
            if (bgImage) {
                slide.style.backgroundImage = `url(${bgImage})`;
            }
        });

        // Create controls if they don't exist
        this.createSlideshowControls();
        
        // Setup slideshow interactions
        this.setupSlideshowInteractions();
        
        // Start slideshow
        this.startSlideshow();
    }

    createSlideshowControls() {
        const heroSection = document.querySelector('.hero, .hero-slideshow');
        if (!heroSection) return;

        // Create indicators if they don't exist
        if (!document.querySelector('.slideshow-indicators, .indicator')) {
            this.createIndicators(heroSection);
        }

        // Create navigation buttons if they don't exist
        if (!document.querySelector('.slide-nav, .prev-btn')) {
            this.createNavigationButtons(heroSection);
        }
    }

    createIndicators(container) {
        if (this.totalSlides <= 1) return;

        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slideshow-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        
        container.appendChild(indicatorsContainer);
    }

    createNavigationButtons(container) {
        if (this.totalSlides <= 1) return;

        const prevButton = document.createElement('button');
        prevButton.className = 'slide-nav prev';
        prevButton.innerHTML = '❮';
        prevButton.setAttribute('aria-label', 'Previous slide');
        prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.resetInterval();
        });
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slide-nav next';
        nextButton.innerHTML = '❯';
        nextButton.setAttribute('aria-label', 'Next slide');
        nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.resetInterval();
        });
        
        container.appendChild(prevButton);
        container.appendChild(nextButton);
    }

    setupSlideshowInteractions() {
        const heroSection = document.querySelector('.hero, .hero-slideshow');
        if (!heroSection) return;

        // Pause on hover
        heroSection.addEventListener('mouseenter', () => {
            this.pauseSlideshow();
        });

        heroSection.addEventListener('mouseleave', () => {
            this.resumeSlideshow();
        });

        // Touch/swipe support
        heroSection.addEventListener('touchstart', (e) => {
            this.state.touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            this.state.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const diff = this.state.touchStartX - this.state.touchEndX;
        
        if (Math.abs(diff) > this.config.swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            this.resetInterval();
        }
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        this.state.currentSlide = index;
    }

    nextSlide() {
        this.state.currentSlide = (this.state.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.state.currentSlide);
    }

    prevSlide() {
        this.state.currentSlide = (this.state.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.state.currentSlide);
    }

    goToSlide(index) {
        this.state.currentSlide = index;
        this.showSlide(this.state.currentSlide);
        this.resetInterval();
    }

    startSlideshow() {
        if (this.totalSlides <= 1) return;

        this.showSlide(this.state.currentSlide);
        
        if (this.state.slideInterval) {
            clearInterval(this.state.slideInterval);
        }
        
        this.state.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.config.slideInterval);
        
        this.state.isPlaying = true;
        console.log(`Auto-slideshow started with ${this.totalSlides} slides`);
    }

    pauseSlideshow() {
        if (this.state.slideInterval) {
            clearInterval(this.state.slideInterval);
            this.state.isPlaying = false;
        }
    }

    resumeSlideshow() {
        if (!this.state.isPlaying && this.totalSlides > 1) {
            this.startSlideshow();
        }
    }

    resetInterval() {
        this.pauseSlideshow();
        this.resumeSlideshow();
    }

    initNavigation() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            const throttledScroll = this.throttle(() => {
                if (window.scrollY > this.config.scrollThreshold) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 100);

            window.addEventListener('scroll', throttledScroll);
        }
    }

    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.vm-card, .stat-item, .benefit-card, .content-text, .content-image');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const countUp = (counter) => {
            const target = parseInt(counter.dataset.count);
            const current = parseInt(counter.innerText) || 0;
            const increment = target / this.config.counterSpeed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(() => countUp(counter), 1);
            } else {
                counter.innerText = target;
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    countUp(counter);
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    initBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        const throttledScroll = this.throttle(() => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', throttledScroll);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Slideshow Styles */
            .hero, .hero-slideshow {
                position: relative;
                width: 100%;
                height: 100vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .hero-slide, .slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: opacity ${this.config.animationDuration}ms ease-in-out;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            
            .hero-slide.active, .slide.active {
                opacity: 1;
                z-index: 1;
            }
            
            .hero-slide::before, .slide::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.4);
                z-index: 1;
            }
            
            .hero-content {
                position: relative;
                z-index: 10;
                text-align: center;
                color: white;
                max-width: 800px;
                padding: 40px 20px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                animation: fadeInUp 1s ease-out;
            }
            
            .hero-content h1 {
                font-size: 3.5rem;
                font-weight: bold;
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
                line-height: 1.2;
            }
            
            .hero-content p {
                font-size: 1.4rem;
                margin-bottom: 30px;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
                line-height: 1.6;
            }
            
            .hero-content .cta-button {
                display: inline-block;
                padding: 15px 40px;
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                text-decoration: none;
                border-radius: 50px;
                font-size: 1.2rem;
                font-weight: bold;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
            }
            
            .hero-content .cta-button:hover {
                background: linear-gradient(135deg, #2980b9, #1f5f99);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
            }
            
            .slideshow-indicators {
                position: absolute;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 12px;
                z-index: 15;
            }
            
            .indicator {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid rgba(255, 255, 255, 0.8);
            }
            
            .indicator:hover {
                background: rgba(255, 255, 255, 0.8);
                transform: scale(1.1);
            }
            
            .indicator.active {
                background: white;
                transform: scale(1.2);
            }
            
            .slide-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                z-index: 20;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .slide-nav:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: translateY(-50%) scale(1.1);
            }
            
            .slide-nav.prev {
                left: 20px;
            }
            
            .slide-nav.next {
                right: 20px;
            }
            
            .back-to-top {
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
                transition: all 0.3s ease;
                z-index: 1000;
                font-size: 20px;
                font-weight: bold;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background: #2980b9;
                transform: translateY(-2px);
            }
            
            /* Scroll animations */
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .vm-card, .stat-item, .benefit-card, .content-text, .content-image {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
                .hero-content h1 {
                    font-size: 2.5rem;
                }
                
                .hero-content p {
                    font-size: 1.2rem;
                }
                
                .hero-content {
                    padding: 30px 15px;
                    margin: 0 15px;
                }
                
                .slideshow-indicators {
                    bottom: 20px;
                }
                
                .slide-nav {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }
                
                .slide-nav.prev {
                    left: 10px;
                }
                
                .slide-nav.next {
                    right: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .hero-content h1 {
                    font-size: 2rem;
                }
                
                .hero-content p {
                    font-size: 1rem;
                }
                
                .hero-content .cta-button {
                    font-size: 1rem;
                    padding: 12px 30px;
                }
                
                .slide-nav {
                    width: 35px;
                    height: 35px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedBusinessWebsite();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedBusinessWebsite;
}