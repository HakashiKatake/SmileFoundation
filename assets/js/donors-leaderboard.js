
document.addEventListener('DOMContentLoaded', function() {
    
    initializeLeaderboard();
    initializeCounters();
    setupSearch();
    setupFilters();
    setupSmoothScroll();
});

function initializeLeaderboard() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const leaderboardSections = document.querySelectorAll('.leaderboard-section');
    
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
           
            leaderboardSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(`${category}-leaderboard`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    

    document.querySelectorAll('.leaderboard-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}


function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = Math.ceil(target / 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current;
        }, 30);
    });
}


function setupSearch() {
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

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
        
            const leaderboardItems = document.querySelectorAll('.leaderboard-item');
            
            leaderboardItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'flex';
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    item.style.display = (itemCategory === filterValue) ? 'flex' : 'none';
                }
            });
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
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
}


function trackDonationClick(source) {
    console.log(`Donation button clicked from: ${source}`);
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-btn.primary').forEach(button => {
        button.addEventListener('click', () => trackDonationClick('leaderboard-cta'));
    });
    
    document.querySelectorAll('.cta-btn.secondary').forEach(button => {
        button.addEventListener('click', () => trackDonationClick('partnership-cta'));
    });
});


function formatNumber(num) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(1) + ' L';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}


window.DonorsLeaderboard = {
    formatNumber,
    formatCurrency,
    trackDonationClick
};