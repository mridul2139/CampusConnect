// Main JavaScript for CampusConnect

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-lg');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-white', 'shadow-lg');
                navbar.classList.add('bg-transparent');
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .contact-card, .stat-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
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
        
        .feature-card, .contact-card, .stat-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    // Toast notification system
    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    // Utility functions
    window.utils = {
        // Format currency
        formatCurrency: function(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        },

        // Format date
        formatDate: function(date) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(date));
        },

        // Generate random ID
        generateId: function() {
            return Math.random().toString(36).substr(2, 9);
        },

        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Local storage helpers
        storage: {
            get: function(key) {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    return null;
                }
            },
            set: function(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    return false;
                }
            },
            remove: function(key) {
                localStorage.removeItem(key);
            }
        }
    };

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'dashboard.html') {
        initDashboard();
    } else if (currentPage === 'admin.html') {
        initAdminPanel();
    } else if (currentPage === 'canteen.html') {
        initCanteen();
    }
});

// Home page specific functionality
function initHomePage() {
    // Add scroll-triggered animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Dashboard page functionality (will be implemented in dashboard.js)
function initDashboard() {
    // This will be called from dashboard.html
    console.log('Dashboard initialized');
}

// Admin panel functionality (will be implemented in admin.js)
function initAdminPanel() {
    // This will be called from admin.html
    console.log('Admin panel initialized');
}

// Canteen functionality (will be implemented in canteen.js)
function initCanteen() {
    // This will be called from canteen.html
    console.log('Canteen initialized');
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    if (window.showToast) {
        showToast('An error occurred. Please try again.', 'error');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load performance
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
    
    // Show loading indicator if page takes too long
    if (loadTime > 3000 && window.showToast) {
        showToast('Page loaded successfully!', 'success');
    }
}); 