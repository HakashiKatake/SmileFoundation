// Donors Leaderboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the leaderboard functionality
    initializeLeaderboard();
    initializeCounters();
    initializeAnimations();
});

// Initialize leaderboard toggle functionality
function initializeLeaderboard() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const leaderboardSections = document.querySelectorAll('.leaderboard-section');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all leaderboard sections
            leaderboardSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected leaderboard section
            const targetSection = document.getElementById(`${category}-leaderboard`);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Trigger animations for the newly visible section
                setTimeout(() => {
                    animateLeaderboardItems(targetSection);
                }, 100);
            }
        });
    });
    
    // Initialize with corporate leaderboard visible
    const corporateSection = document.getElementById('corporate-leaderboard');
    if (corporateSection) {
        setTimeout(() => {
            animateLeaderboardItems(corporateSection);
        }, 500);
    }
}

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter numbers
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// Initialize scroll animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.leaderboard-item, .podium-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Animate leaderboard items when section becomes visible
function animateLeaderboardItems(section) {
    const items = section.querySelectorAll('.leaderboard-item, .podium-item');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add hover effects for leaderboard items
document.addEventListener('DOMContentLoaded', function() {
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    
    leaderboardItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for analytics (optional)
function trackDonationClick(source) {
    // This function can be used to track clicks on donation buttons
    // for analytics purposes
    console.log(`Donation button clicked from: ${source}`);
    
    // Example: Send to analytics service
    // gtag('event', 'click', {
    //     event_category: 'donation',
    //     event_label: source
    // });
}

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const donateButtons = document.querySelectorAll('.cta-btn.primary');
    const partnerButtons = document.querySelectorAll('.cta-btn.secondary');
    
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackDonationClick('leaderboard-cta');
        });
    });
    
    partnerButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackDonationClick('partnership-cta');
        });
    });
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states for dynamic content (if needed)
function showLoadingState(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
    element.classList.add('loading');
}

function hideLoadingState(element, content) {
    element.classList.remove('loading');
    element.innerHTML = content;
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 10000000) {
        return (num / 10000000).toFixed(1) + ' Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(1) + ' L';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}

// Add search functionality (optional enhancement)
function initializeSearch() {
    const searchInput = document.getElementById('donor-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        
        leaderboardItems.forEach(item => {
            const donorName = item.querySelector('.donor-name').textContent.toLowerCase();
            const donorSector = item.querySelector('.donor-sector')?.textContent.toLowerCase() || '';
            
            if (donorName.includes(searchTerm) || donorSector.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Add filter functionality (optional enhancement)
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter leaderboard items
            const leaderboardItems = document.querySelectorAll('.leaderboard-item');
            
            leaderboardItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'flex';
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Export functions for potential external use
window.DonorsLeaderboard = {
    initializeLeaderboard,
    initializeCounters,
    animateCounter,
    formatNumber,
    formatCurrency,
    trackDonationClick
};