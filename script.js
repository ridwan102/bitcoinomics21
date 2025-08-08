// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeScrollEffects();
    initializeMilestonesSteps();
    initializeExchangeWidget();
    initializeContactForm();
    initializeAnimations();
    initializeMobileMenu();
    initializeParallax();
    initializeGetStartedButton();
    
    // Initialize live Bitcoin price
    updateBitcoinPrice();
    
    // Update price every 309 seconds
    setInterval(updateBitcoinPrice, 300000);
    
    // Buy button click handler
    initializeBuyButton();
});

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'linear-gradient(145deg, #1a1a1a,rgb(255, 255, 255))';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'linear-gradient(145deg, #1a1a1a,rgb(255, 255, 255))';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for anchor links
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

// Get Started button functionality
function initializeGetStartedButton() {
    const getStartedButton = document.querySelector('.btn-primary');
    
    if (getStartedButton && getStartedButton.textContent.trim() === 'Get Started') {
        getStartedButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the features section with "Unify your crypto finances"
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                smoothScrollTo(featuresSection.offsetTop, 1500);
            }
        });
    }
}

// Buy button functionality
function initializeBuyButton() {
    const buyButton = document.querySelector('.buy-btn');
    
    if (buyButton) {
        buyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const exchangeSection = document.querySelector('.exchange-section');
            if (exchangeSection) {
                smoothScrollTo(exchangeSection.offsetTop, 1500);
            }
        });
    }
}

// Global function for onclick attribute
function scrollToFeatures() {
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        smoothScrollTo(featuresSection.offsetTop, 1500);
    }
}

// Fetch live Bitcoin price and update balance
async function updateBitcoinPrice() {
    try {
        // Try multiple API endpoints for better reliability
        const apis = [
            'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
        ];
        
        let bitcoinPrice = null;
        
        for (const apiUrl of apis) {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                // Handle Coinbase API response
                if (apiUrl.includes('coinbase') && data.data && data.data.rates && data.data.rates.USD) {
                    bitcoinPrice = parseFloat(data.data.rates.USD);
                    break;
                }
            } catch (apiError) {
                console.log(`Failed to fetch from ${apiUrl}:`, apiError);
                continue;
            }
        }
        
        if (bitcoinPrice) {
            const balanceElement = document.querySelector('.balance');
            
            if (balanceElement) {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(bitcoinPrice);
                
                balanceElement.textContent = `1 BTC = ${formattedPrice}`;
            }
        } else {
            console.log('Failed to fetch Bitcoin price from all APIs');
        }
        
    } catch (error) {
        console.log('Error fetching Bitcoin price:', error);
        // Keep the previous price displayed instead of showing "Loading..."
    }
}

// Ensure external links open in new tabs
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Custom smooth scrolling function with easing
function smoothScrollTo(targetPosition, duration = 1500) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Easing function for smooth animation
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Make function globally accessible
window.scrollToFeatures = scrollToFeatures;

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileToggle && navMenu) {
        // Function to toggle menu
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = navMenu.classList.contains('mobile-open');
            
            if (isOpen) {
                navMenu.classList.remove('mobile-open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            } else {
                navMenu.classList.add('mobile-open');
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
                body.style.overflow = 'hidden';
            }
        }
        
        // Add multiple event listeners for better touch support
        mobileToggle.addEventListener('click', toggleMenu);
        mobileToggle.addEventListener('touchstart', toggleMenu, { passive: false });
        mobileToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
        }, { passive: false });

        // Handle nav menu item clicks
        const navItems = navMenu.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = item.getAttribute('href');
                let targetSection = null;
                
                // Map href to actual section
                switch(href) {
                    case '#features':
                        targetSection = document.querySelector('.features');
                        break;
                    case '#contact-section':
                        targetSection = document.querySelector('.contact-section');
                        break;
                    case '#milestones':
                        targetSection = document.querySelector('.milestones');
                        break;
                    case '#exchange-section':
                        targetSection = document.querySelector('.exchange-section');
                        break;
                }
                
                if (targetSection) {
                    smoothScrollTo(targetSection.offsetTop, 1500);
                    
                    // Close mobile menu after clicking
                    navMenu.classList.remove('mobile-open');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        function closeMenu() {
            navMenu.classList.remove('mobile-open');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = '';
        }
        
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('mobile-open') && 
                !mobileToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                closeMenu();
            }
        });
        
        document.addEventListener('touchstart', (e) => {
            if (navMenu.classList.contains('mobile-open') && 
                !mobileToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                closeMenu();
            }
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .testimonial-card, .step').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Milestones steps interaction
function initializeMilestonesSteps() {
    const steps = document.querySelectorAll('.step');
    const restartBtn = document.querySelector('.btn-restart');
    let currentStep = 0;
    let intervalId;

    function activateStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
    }

    function nextStep() {
        currentStep = (currentStep + 1) % steps.length;
        activateStep(currentStep);
    }

    function startAutoProgress() {
        intervalId = setInterval(nextStep, 3000);
    }

    function stopAutoProgress() {
        clearInterval(intervalId);
    }

    function restartProgress() {
        currentStep = 0;
        activateStep(currentStep);
        stopAutoProgress();
        startAutoProgress();
    }

    // Initialize auto progress
    startAutoProgress();

    // Step click handlers
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            currentStep = index;
            activateStep(currentStep);
            stopAutoProgress();
            setTimeout(startAutoProgress, 5000); // Restart auto after 5 seconds
        });
    });

    // Restart button
    if (restartBtn) {
        restartBtn.addEventListener('click', restartProgress);
    }

    // Pause on hover
    const milestonesSection = document.querySelector('.milestones');
    if (milestonesSection) {
        milestonesSection.addEventListener('mouseenter', stopAutoProgress);
        milestonesSection.addEventListener('mouseleave', startAutoProgress);
    }
}

// Exchange widget functionality
function initializeExchangeWidget() {
    const exchangeArrow = document.querySelector('.exchange-arrow');
    const btcInput = document.querySelector('.exchange-input .amount-input');
    const usdInput = document.querySelector('.exchange-output .amount-input');
    
    // Mock exchange rate (in real app, this would come from an API)
    let btcToUsd = 45250.00;
    let usdToBtc = 1 / btcToUsd;
    let isReversed = false;

    function updateExchange() {
        if (!isReversed) {
            const btcValue = parseFloat(btcInput.value) || 0;
            usdInput.value = (btcValue * btcToUsd).toFixed(2);
        } else {
            const usdValue = parseFloat(usdInput.value) || 0;
            btcInput.value = (usdValue * usdToBtc).toFixed(8);
        }
    }

    function swapCurrencies() {
        isReversed = !isReversed;
        
        // Swap input values
        const tempValue = btcInput.value;
        btcInput.value = usdInput.value;
        usdInput.value = tempValue;
        
        // Update readonly states
        btcInput.readOnly = isReversed;
        usdInput.readOnly = !isReversed;
        
        // Add rotation animation
        exchangeArrow.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            exchangeArrow.style.transform = 'rotate(0deg)';
        }, 300);
        
        updateExchange();
    }

    if (exchangeArrow) {
        exchangeArrow.addEventListener('click', swapCurrencies);
    }

    if (btcInput) {
        btcInput.addEventListener('input', updateExchange);
    }

    if (usdInput) {
        usdInput.addEventListener('input', updateExchange);
    }

    // Simulate real-time price updates
    setInterval(() => {
        const variation = (Math.random() - 0.5) * 1000; // ±$500 variation
        btcToUsd = Math.max(40000, Math.min(50000, btcToUsd + variation));
        usdToBtc = 1 / btcToUsd;
        updateExchange();
    }, 10000); // Update every 10 seconds
}

// Contact form functionality
function initializeContactForm() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close');
    const contactForm = document.querySelector('.contact-form');
    
    // Open modal (you can add triggers for this)
    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                closeModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Add contact triggers (you can customize these)
    document.querySelectorAll('[data-contact]').forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });
}

// Animation utilities
function initializeAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Number counter animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    });

    document.querySelectorAll('[data-counter]').forEach(counter => {
        observer.observe(counter);
    });
}

// Parallax effects
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// Utility functions
function debounce(func, wait) {
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

function throttle(func, limit) {
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

// Loading screen
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

// API simulation
class CryptoAPI {
    static async getPrice(symbol = 'BTC') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock price data
        const prices = {
            BTC: 45250 + (Math.random() - 0.5) * 1000,
            ETH: 3200 + (Math.random() - 0.5) * 100,
            ADA: 1.2 + (Math.random() - 0.5) * 0.1
        };
        
        return prices[symbol] || 0;
    }
    
    static async getPortfolio() {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
            totalValue: 12847.65,
            btcAmount: 0.2847,
            ethAmount: 1.2456,
            adaAmount: 150.50
        };
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CryptoAPI,
        debounce,
        throttle
    };
}
