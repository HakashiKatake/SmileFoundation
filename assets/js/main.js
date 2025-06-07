// Main JavaScript file for Smile Foundation Clone

// Main JavaScript for Smile Foundation

// Make sure functions are available globally
window.initializeNavigation = function() {
    const navItems = document.querySelectorAll('.nav-item.dropdown');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                const dropdown = this.querySelector('.dropdown-content');
                if (dropdown) dropdown.style.display = 'block';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                const dropdown = this.querySelector('.dropdown-content');
                if (dropdown) dropdown.style.display = 'none';
            }
        });
    });
}

// Initialize mobile menu toggle
window.initializeMobileMenu = function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const closeButton = document.querySelector('.close-mobile-menu');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu) return;
    
    console.log('Mobile menu elements found:', { menuToggle, mobileMenu, closeButton });
    
    // Toggle mobile menu
    function toggleMenu(e) {
        if (e) e.stopPropagation();
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        console.log('Menu toggled. Active:', mobileMenu.classList.contains('active'));
    }
    
    // Close menu when clicking outside
    function closeMenuOnClickOutside(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuToggle) {
            toggleMenu(e);
        }
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    if (closeButton) {
        closeButton.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.mobile-nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', closeMenuOnClickOutside);
    
    // Prevent closing when clicking inside the menu
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close menu on window resize if it becomes desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    return { menuToggle, mobileMenu, closeButton };
};

// Initialize Hero Carousel with Owl Carousel
function initializeHeroCarousel() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (!heroCarousel) return;
    
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(heroCarousel).owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            responsive: {
                0: {
                    nav: false
                },
                768: {
                    nav: true
                }
            }
        });
    } else {
        // Retry initialization after a short delay if jQuery isn't loaded yet
        setTimeout(initializeHeroCarousel, 500);
    }
}

// Initialize SDG carousel
function initializeSDGCarousel() {
    const sdgCarousel = document.querySelector('.sdg-carousel');
    if (!sdgCarousel) return;
    
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(sdgCarousel).owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                576: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 2,
                    nav: true
                },
                992: {
                    items: 3,
                    nav: true
                },
                1200: {
                    items: 4,
                    nav: true
                }
            },
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ]
        });
    } else {
        setTimeout(initializeSDGCarousel, 500);
    }
}

// Initialize Stories carousel
function initializeStoriesCarousel() {
    const storiesCarousel = document.querySelector('.stories-carousel');
    if (!storiesCarousel) return;
    
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(storiesCarousel).owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                576: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 2,
                    nav: true
                },
                992: {
                    items: 2,
                    nav: true
                },
                1200: {
                    items: 3,
                    nav: true
                }
            },
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ]
        });
    } else {
        setTimeout(initializeStoriesCarousel, 500);
    }
}

// Load jQuery and Owl Carousel if not already loaded
function loadCarouselDependencies() {
    if (typeof $ === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            // Load Owl Carousel after jQuery is loaded
            const owlScript = document.createElement('script');
            owlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
            owlScript.onload = function() {
                initializeHeroCarousel();
                initializeSDGCarousel();
            };
            document.head.appendChild(owlScript);
        };
        document.head.appendChild(script);
    } else if (typeof $.fn.owlCarousel === 'undefined') {
        // Load only Owl Carousel if jQuery is already loaded
        const owlScript = document.createElement('script');
        owlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
        owlScript.onload = function() {
            initializeHeroCarousel();
            initializeSDGCarousel();
        };
        document.head.appendChild(owlScript);
    } else {
        // Both are already loaded
        initializeHeroCarousel();
        initializeSDGCarousel();
    }
}

// Animate numbers counting up
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const windowHeight = window.innerHeight;
    
    statNumbers.forEach(stat => {
        const statPosition = stat.getBoundingClientRect().top;
        const animationTrigger = windowHeight - 100; // Start animation 100px from bottom
        
        if (statPosition < animationTrigger && !stat.classList.contains('animated')) {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            stat.classList.add('animated');
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            updateCount();
        }
    });
}

// Initialize Awards Carousel
function initializeAwardsCarousel() {
    const awardsCarousel = document.querySelector('.awards-carousel');
    if (!awardsCarousel) return;
    
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(awardsCarousel).owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            responsive: {
                0: {
                    nav: true
                },
                768: {
                    nav: true
                }
            }
        });
    }
}

// Initialize Empanelment Carousel
function initializeEmpanelmentCarousel() {
    const empanelmentCarousel = document.querySelector('.empanelment-carousel');
    if (!empanelmentCarousel) return;
    
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(empanelmentCarousel).owlCarousel({
            loop: true,
            items: 3,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            navText: [
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                576: {
                    items: 2,
                    nav: true
                },
                992: {
                    items: 3,
                    nav: true
                }
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation and mobile menu
    initializeNavigation();
    initializeMobileMenu();
    
    // Initialize carousels after dependencies are loaded
    const carouselDependencies = [
        'https://code.jquery.com/jquery-3.6.0.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'
    ];
    
    // Check if jQuery is already loaded
    if (typeof jQuery == 'undefined') {
        loadScript(carouselDependencies[0], function() {
            // After jQuery is loaded, load Owl Carousel
            loadScript(carouselDependencies[1], function() {
                initializeAwardsCarousel();
                initializeEmpanelmentCarousel();
            });
        });
    } else {
        // If jQuery is already loaded, just load Owl Carousel
        if (typeof $.fn.owlCarousel === 'undefined') {
            loadScript(carouselDependencies[1], function() {
                initializeAwardsCarousel();
                initializeEmpanelmentCarousel();
            });
        } else {
            // If both are already loaded, just initialize the carousels
            initializeAwardsCarousel();
            initializeEmpanelmentCarousel();
        }
    }
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                const mainNav = document.querySelector('.main-nav');
                const overlay = document.querySelector('.overlay');
                const menuToggle = document.querySelector('.menu-toggle i');
                
                if (mainNav) mainNav.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('fa-times');
                    menuToggle.classList.add('fa-bars');
                }
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Toggle dropdown on mobile
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdown = this.nextElementSibling;
                
                if (parent && dropdown && dropdown.classList.contains('dropdown-content')) {
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(item => {
                        if (item !== parent) {
                            item.classList.remove('active');
                            const otherDropdown = item.querySelector('.dropdown-content');
                            if (otherDropdown) otherDropdown.style.display = 'none';
                        }
                    });
                    
                    // Toggle current dropdown
                    parent.classList.toggle('active');
                    dropdown.style.display = parent.classList.contains('active') ? 'block' : 'none';
                }
            }
        });
    });
    
    // Initialize carousels
    initializeHeroCarousel();
    initializeSDGCarousel();
    initializeStoriesCarousel();
    
    // Load carousel dependencies
    loadCarouselDependencies();
    
    // Initialize impact numbers animation
    animateNumbers();
    
    // Run on scroll with debounce for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                animateNumbers();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
});

// Handle window resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 992) {
            const mainNav = document.querySelector('.main-nav');
            const overlay = document.querySelector('.overlay');
            const menuToggle = document.querySelector('.menu-toggle i');
            
            if (mainNav) mainNav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
            }
            document.body.classList.remove('menu-open');
            
            // Reset dropdowns
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            
            document.querySelectorAll('.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    }, 250);
});

$(document).ready(function() {
  $('.menu-toggle').on('click', function() {
    $('.mobile-nav-overlay').addClass('active');
  });
  $('.close-mobile-nav, .mobile-nav-list a').on('click', function() {
    $('.mobile-nav-overlay').removeClass('active');
  });
});
