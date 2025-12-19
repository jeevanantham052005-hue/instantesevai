// ===========================
// MAIN JAVASCRIPT FILE
// ===========================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursorAnimation();
    initMobileMenu();
    initScrollHeader();
    initSmoothScroll();
    initContactForm();
});

// ===========================
// CURSOR ANIMATION
// ===========================
function initCursorAnimation() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show glow on first movement
        if (cursorGlow.style.opacity === '0' || cursorGlow.style.opacity === '') {
            cursorGlow.style.opacity = '1';
        }
    });
    
    // Smooth animation loop
    function animateGlow() {
        // Smooth follow effect
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// ===========================
// SCROLL HEADER EFFECT
// ===========================
function initScrollHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===========================
// SMOOTH SCROLLING
// ===========================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// CONTACT FORM HANDLING
// ===========================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.phone || !formData.service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(formData);
        
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        
        // Redirect to WhatsApp after 2 seconds
        setTimeout(function() {
            window.open(`https://wa.me/917806875131?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            
            // Reset form after 3 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'grid';
                formSuccess.style.display = 'none';
            }, 3000);
        }, 2000);
    });
}

// ===========================
// CREATE WHATSAPP MESSAGE
// ===========================
function createWhatsAppMessage(formData) {
    let message = `Hello InstanteSevai,\n\n`;
    message += `I'm interested in your services.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    
    if (formData.email) {
        message += `*Email:* ${formData.email}\n`;
    }
    
    message += `*Service Required:* ${formData.service}\n`;
    
    if (formData.message) {
        message += `\n*Message:*\n${formData.message}`;
    }
    
    return message;
}

// ===========================
// BUTTON HOVER EFFECTS
// ===========================
(function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .service-card, .feature-card');
    
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
})();

// ===========================
// SCROLL ANIMATIONS (OPTIONAL)
// ===========================
(function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation to cards
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .why-card, .service-detail-card');
    
    animatedElements.forEach(function(element, index) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
})();