// ===== GLOBAL VARIABLES =====
let scrollPosition = 0;
let isLoading = true;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    createBackgroundParticles();
    handlePageLoad();
    initializeScrollAnimations();
    setupSmoothScrolling();
});

// ===== PAGE LOADING =====
function handlePageLoad() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Simulate loading time and fade out
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
            isLoading = false;
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }, 1500);
}

// ===== BACKGROUND PARTICLES =====
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'background-particles';
    
    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and size
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 6 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Animate particles continuously
    animateParticles();
}

function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Random movement
        setInterval(() => {
            const newX = Math.random() * 100;
            const newY = Math.random() * 100;
            
            particle.style.transition = 'all 3s ease-in-out';
            particle.style.left = newX + '%';
            particle.style.top = newY + '%';
        }, 3000 + (index * 200));
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger effect for grid items
                if (entry.target.classList.contains('solution-card') || 
                    entry.target.classList.contains('industry-card') || 
                    entry.target.classList.contains('area-card')) {
                    addStaggerEffect(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.solution-card, .industry-card, .area-card, .step, .cta-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function addStaggerEffect(element) {
    const siblings = element.parentElement.children;
    const index = Array.from(siblings).indexOf(element);
    element.style.animationDelay = (index * 0.1) + 's';
}

// ===== ENTRANCE ANIMATIONS =====
function triggerEntranceAnimations() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Animate navigation
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Modal events
    setupModalEvents();
    
    // Form submission
    setupFormSubmission();
    
    // Button hover effects
    setupButtonEffects();
    
    // Resize handler
    window.addEventListener('resize', handleResize);
    
    // Mouse move parallax effect
    document.addEventListener('mousemove', handleMouseMove);
}

// ===== SCROLL HANDLER =====
function handleScroll() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Header background opacity based on scroll
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && currentScroll < window.innerHeight) {
        hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
    
    // Update scroll position
    scrollPosition = currentScroll;
    
    // Animate elements on scroll
    animateOnScroll();
}

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== MODAL FUNCTIONS =====
function setupModalEvents() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeBookingModal();
        }
    });
}

function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'slideIn 0.3s ease';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'slideOut 0.3s ease';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ===== FORM SUBMISSION =====
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    // Add loading animation to button
    submitBtn.style.background = 'linear-gradient(45deg, #B8860B, #D4AF37)';
    
    // Simulate form submission
    setTimeout(() => {
        // Success animation
        submitBtn.textContent = '✓ Audit Scheduled!';
        submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        
        // Show success message
        showNotification('Success! We\'ll contact you within 24 hours to schedule your free hospitality audit.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            closeBookingModal();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, var(--primary-gold), var(--dark-gold))';
        }, 2000);
        
    }, 2000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? 
        'linear-gradient(45deg, #28a745, #20c997)' : 
        'linear-gradient(45deg, var(--primary-gold), var(--dark-gold))';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease';
    notification.style.maxWidth = '400px';
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ===== BUTTON EFFECTS =====
function setupButtonEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== MOUSE MOVE PARALLAX =====
function handleMouseMove(e) {
    if (isLoading) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrollPosition < window.innerHeight) {
        const translateX = (mouseX - 0.5) * 20;
        const translateY = (mouseY - 0.5) * 20;
        hero.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    
    // Subtle parallax for cards
    const cards = document.querySelectorAll('.solution-card, .industry-card, .area-card');
    cards.forEach((card, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ===== RESIZE HANDLER =====
function handleResize() {
    // Recalculate animations and positions
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
}

// ===== INITIALIZATION =====
function initializeAnimations() {
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes slideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-50px); opacity: 0; }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}

// ===== INTERACTIVE ELEMENTS =====
function addInteractiveEffects() {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.solution-card, .industry-card, .area-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--primary-gold), var(--dark-gold))';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll progress indicator
    createScrollProgress();
    
    // Add interactive effects
    setTimeout(() => {
        addInteractiveEffects();
    }, 2000);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16));

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===== GLOBAL FUNCTIONS (for HTML onclick attributes) =====
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;