// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slideshow with Centered Text Functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update indicators if they exist
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
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

    function changeSlide(direction) {
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetInterval();
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetInterval();
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
            
            console.log(`Auto-slideshow started with ${heroSlides.length} slides`);
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

    function resetInterval() {
        pauseSlideshow();
        resumeSlideshow();
    }

    // Initialize slideshow and add event listeners
    if (heroSlides.length > 0) {
        const heroSlideshow = document.querySelector('.hero-slideshow') || document.querySelector('.hero');
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
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    // Restart auto-play after manual interaction
                    resetInterval();
                }
            }
        }
        
        // Create indicators dynamically if they don't exist
        if (document.querySelectorAll('.indicator').length === 0) {
            createIndicators();
        }
    }

    // Create slideshow indicators
    function createIndicators() {
        const heroSlideshow = document.querySelector('.hero-slideshow') || document.querySelector('.hero');
        if (heroSlideshow && heroSlides.length > 1) {
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'slideshow-indicators';
            
            heroSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                if (index === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    goToSlide(index);
                });
                
                indicatorsContainer.appendChild(indicator);
            });
            
            heroSlideshow.appendChild(indicatorsContainer);
        }
    }

    // Add navigation buttons if they don't exist
    function createNavigationButtons() {
        const heroSlideshow = document.querySelector('.hero-slideshow') || document.querySelector('.hero');
        if (heroSlideshow && heroSlides.length > 1) {
            const prevButton = document.createElement('button');
            prevButton.className = 'slide-nav prev';
            prevButton.innerHTML = '❮';
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
            
            const nextButton = document.createElement('button');
            nextButton.className = 'slide-nav next';
            nextButton.innerHTML = '❯';
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            
            heroSlideshow.appendChild(prevButton);
            heroSlideshow.appendChild(nextButton);
        }
    }

    // Add enhanced CSS styles for centered text and auto-moving slideshow
    const style = document.createElement('style');
    style.textContent = `
        /* Hero slideshow container */
        .hero-slideshow, .hero {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Individual slides */
        .hero-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1.5s ease-in-out;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        
        .hero-slide.active {
            opacity: 1;
            z-index: 1;
        }
        
        .hero-slide:not(.active) {
            z-index: 0;
        }
        
        /* Dark overlay for better text visibility */
        .hero-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1;
        }
        
        /* Centered text content */
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
        
        /* Slideshow indicators */
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
        
        /* Navigation buttons */
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
        
        /* Fade in animation */
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
        
        /* Mobile responsive */
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

    // Create navigation buttons
    createNavigationButtons();

    // Mobile menu toggle (keeping existing functionality)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
        });
    }
    
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
    
    // Initial animation check
    animateOnScroll();
    
    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Back to top functionality
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
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
        font-size: 20px;
        font-weight: bold;
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
    
    // Restart slideshow when page becomes visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseSlideshow();
        } else {
            resumeSlideshow();
        }
    });
    
    // Ensure slideshow starts even if there are loading delays
    setTimeout(() => {
        if (!isPlaying && heroSlides.length > 0) {
            startSlideshow();
        }
    }, 1000);
});