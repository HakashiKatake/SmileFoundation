
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeCarousels();
    setupCounters();
    setupAccreditationViews();
    setupScrollAnimations();
});


function initializeNavigation() {
  
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
    
 
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdown = this.nextElementSibling;
                
                if (parent && dropdown && dropdown.classList.contains('dropdown-content')) {
              
                    parent.classList.toggle('active');
                    dropdown.style.display = parent.classList.contains('active') ? 'block' : 'none';
                }
            }
        });
    });
}


function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const closeButton = document.querySelector('.close-mobile-menu');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu) return;
    
    
    function toggleMenu(e) {
        if (e) e.stopPropagation();
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    

    menuToggle.addEventListener('click', toggleMenu);
    if (closeButton) closeButton.addEventListener('click', toggleMenu);
    
    
    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    

    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuToggle) {
            toggleMenu(e);
        }
    });
    

    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
   
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}


function initializeCarousels() {
    
    if (typeof jQuery === 'undefined') {
        loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function() {
            loadOwlCarousel();
        });
    } else if (typeof $.fn.owlCarousel === 'undefined') {
        loadOwlCarousel();
    } else {
        setupCarousels();
    }
}


function loadOwlCarousel() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', function() {
        setupCarousels();
    });
}


function setupCarousels() {
  
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel && $.fn.owlCarousel) {
        $(heroCarousel).owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive: {
                0: { nav: false },
                768: { nav: true }
            }
        });
    }
    
    
    const sdgCarousel = document.querySelector('.sdg-carousel');
    if (sdgCarousel && $.fn.owlCarousel) {
        $(sdgCarousel).owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            responsive: {
                0: { items: 1, nav: false },
                768: { items: 2, nav: true },
                992: { items: 3, nav: true },
                1200: { items: 4, nav: true }
            }
        });
    }
    

    const storiesCarousel = document.querySelector('.stories-carousel');
    if (storiesCarousel && $.fn.owlCarousel) {
        $(storiesCarousel).owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            responsive: {
                0: { items: 1, nav: false },
                768: { items: 2, nav: true },
                1200: { items: 3, nav: true }
            }
        });
    }
}


function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}


function setupCounters() {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    

    const statsSection = document.querySelector('.impact-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
   
    if (!window.IntersectionObserver) {
        setTimeout(animateCounters, 1000);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'));
        const increment = targetValue > 100 ? Math.ceil(targetValue / 200) : 1;
        
        function updateCount() {
            const currentValue = parseInt(counter.innerText || '0');
            if (currentValue < targetValue) {
                counter.innerText = Math.min(currentValue + increment, targetValue);
                setTimeout(updateCount, 30);
            }
        }
        
        updateCount();
    });
}



    
function setupAccreditationViews() {
        const awardsView = document.querySelector('.accreditations-grid');
        const certificatesView = document.querySelector('.certificate-accreditations');
        
        
        const viewToggleContainer = document.createElement('div');
        viewToggleContainer.className = 'view-toggle-container';
        viewToggleContainer.innerHTML = `
            <button class="view-toggle active" data-view="awards">Award Photos</button>
            <button class="view-toggle" data-view="certificates">Certificates</button>
        `;
        
      
        const sectionTitle = document.querySelector('.accreditations-section .section-title');
        sectionTitle.insertAdjacentElement('afterend', viewToggleContainer);
        
      
        const toggleButtons = document.querySelectorAll('.view-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
               
                toggleButtons.forEach(btn => btn.classList.remove('active'));
              
                this.classList.add('active');
                
               
                if (this.getAttribute('data-view') === 'awards') {
                    awardsView.style.display = 'grid';
                    certificatesView.style.display = 'none';
                } else {
                    awardsView.style.display = 'none';
                    certificatesView.style.display = 'grid';
                }
            });
        });
    }
    
    
    function setupScrollAnimations() {
        const accreditationItems = document.querySelectorAll('.accreditation-item, .cert-item');
        
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.2 
        });
        
      
        accreditationItems.forEach(item => {
            observer.observe(item);
        });
    }
    
   
   
    
    
    const style = document.createElement('style');
    style.textContent = `
        /* Toggle Buttons Styles */
        .view-toggle-container {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            gap: 15px;
        }
        
        .view-toggle {
            padding: 8px 16px;
            border: 1px solid #ccc;
            background: #f5f5f5;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .view-toggle.active {
            background: #333;
            color: white;
            border-color: #333;
        }
        
        /* Animation Styles */
        .accreditation-item, .cert-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .accreditation-item.animated, .cert-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation delay */
        .accreditation-item:nth-child(2), .cert-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .accreditation-item:nth-child(3), .cert-item:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
