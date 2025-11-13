// ===================================
// BPSS Website JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Form submission handler
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                parentName: document.getElementById('parentName').value,
                childName: document.getElementById('childName').value,
                childAge: document.getElementById('childAge').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value
            };
            
            // Here you would normally send the data to your backend
            // For now, we'll just show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for registering! We will contact you shortly to confirm your free trial class.');
            
            // Reset form
            registrationForm.reset();
            
            // In production, you would integrate with:
            // - Google Forms API
            // - Email service (like EmailJS)
            // - Your backend API
            // - WhatsApp Business API
            // Example with EmailJS:
            // emailjs.send('service_id', 'template_id', formData)
            //     .then(function(response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //     }, function(error) {
            //         console.log('FAILED...', error);
            //     });
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.problem-card, .program-card, .testimonial-card, .benefit-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stat counter animation
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('s')) {
                element.textContent = current.toFixed(1) + 's';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Trigger stat counter when stats section is visible
    const statsSection = document.querySelector('.stats-banner');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        let target;
                        
                        if (text.includes('%')) {
                            target = parseInt(text);
                        } else if (text.includes('s')) {
                            target = parseFloat(text);
                        } else if (text.includes('+')) {
                            target = parseInt(text);
                        } else {
                            target = parseInt(text);
                        }
                        
                        animateCounter(stat, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // FAQ accordion functionality (optional enhancement)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const content = item.querySelector('p');
                if (content) {
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        content.style.paddingTop = '0';
                    } else {
                        // Close other items
                        faqItems.forEach(otherItem => {
                            const otherContent = otherItem.querySelector('p');
                            if (otherContent && otherItem !== item) {
                                otherContent.style.maxHeight = null;
                                otherContent.style.paddingTop = '0';
                            }
                        });
                        
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.paddingTop = '1rem';
                    }
                }
            });
        }
    });
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Bhakta Prahlad Sunday School. All rights reserved.`;
    }
    
    // Highlight active nav link based on scroll position
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Add active class style
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--saffron);
            position: relative;
        }
        .nav-menu a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--saffron);
        }
    `;
    document.head.appendChild(style);
    
    // Console welcome message
    console.log('%c🕉️ Hare Krishna! Welcome to BPSS Website 🕉️', 'color: #FF9933; font-size: 20px; font-weight: bold;');
    console.log('%cWhere Education Becomes Enlightenment', 'color: #6A1B9A; font-size: 14px;');
    
});

// Additional utility functions

// Function to validate phone number (Indian format)
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (form) {
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !validatePhone(this.value)) {
                    this.style.borderColor = 'red';
                    this.setCustomValidity('Please enter a valid 10-digit phone number');
                } else {
                    this.style.borderColor = '';
                    this.setCustomValidity('');
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = 'red';
                    this.setCustomValidity('Please enter a valid email address');
                } else {
                    this.style.borderColor = '';
                    this.setCustomValidity('');
                }
            });
        }
    }
});
