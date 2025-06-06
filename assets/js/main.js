// Main JavaScript file for Smile Foundation Clone

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components immediately since they're already in the HTML
    initializeComponents();
});

// Initialize all interactive components
function initializeComponents() {
    initializeNavigation();
    initializeSliders();
    initializeDropdowns();
    initializeSearchBox();
    initializeHeroSlider();
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item.dropdown');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    });
}

// Slider functionality
function initializeSliders() {
    // Stories in Motion slider
    const storiesSlider = document.querySelector('.stories-slider');
    if (storiesSlider) {
        const track = storiesSlider.querySelector('.stories-track');
        const slides = track.querySelectorAll('.story-item');
        const indicators = storiesSlider.querySelectorAll('.indicator');
        const prevBtn = storiesSlider.querySelector('.slider-prev');
        const nextBtn = storiesSlider.querySelector('.slider-next');
        
        let currentSlide = 0;
        
        // Set initial position
        updateSliderPosition();
        
        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSliderPosition();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSliderPosition();
            });
        }
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSliderPosition();
            });
        });
        
        function updateSliderPosition() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // Partners slider dots
    const partnersDots = document.querySelectorAll('.partners-slider .dot');
    if (partnersDots.length > 0) {
        partnersDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                partnersDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                // In a real implementation, this would change the visible partners
            });
        });
    }
}

// Dropdown functionality
function initializeDropdowns() {
    // Mobile navigation dropdown toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
}

// Search box functionality
function initializeSearchBox() {
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            // In a real implementation, this would toggle a search box
            alert('Search functionality would open here');
        });
    }
}

// Video play functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.play-button') || e.target.closest('.story-thumbnail')) {
        // In a real implementation, this would play the video
        alert('Video would play here');
    }
});

// Hero Slider Functionality
(function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    let current = 0;
    let interval = null;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            indicators[i].classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function startAutoplay() {
        interval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            showSlide(idx);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoplay);
        heroSlider.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize
    showSlide(0);
    startAutoplay();
})();
