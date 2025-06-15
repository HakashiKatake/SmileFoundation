// Fund Tracker JavaScript - Minimal but effective

document.addEventListener('DOMContentLoaded', function() {
    // Initialize counters
    initCounters();
    
    // Initialize allocation chart
    initAllocationChart();
    
    // Load recent donations
    loadRecentDonations();
});

// Counter animation for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            // If count is less than target, continue incrementing
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = formatNumber(target);
            }
        };
        
        updateCount();
    });
}

// Format large numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Initialize the allocation chart using Chart.js
function initAllocationChart() {
    const ctx = document.getElementById('allocation-chart').getContext('2d');
    
    const allocationData = {
        labels: ['Education Programs', 'Healthcare Initiatives', 'Nutrition & Meals', 'Administrative Costs'],
        datasets: [{
            data: [45, 30, 15, 10],
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0'],
            borderWidth: 0
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        }
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: allocationData,
        options: options
    });
}

// Load recent donations data
function loadRecentDonations() {
    // This would typically come from an API, but we'll use static data for this example
    const recentDonations = [
        { donor: 'Rahul Sharma', amount: '₹25,000', program: 'Education', date: '2023-11-15' },
        { donor: 'Priya Patel', amount: '₹10,000', program: 'Healthcare', date: '2023-11-14' },
        { donor: 'Amit Singh', amount: '₹50,000', program: 'Nutrition', date: '2023-11-12' },
        { donor: 'Neha Gupta', amount: '₹15,000', program: 'Education', date: '2023-11-10' },
        { donor: 'Vikram Mehta', amount: '₹30,000', program: 'Healthcare', date: '2023-11-08' },
        { donor: 'Anonymous', amount: '₹5,000', program: 'General Fund', date: '2023-11-07' },
        { donor: 'Sanjay Kumar', amount: '₹20,000', program: 'Education', date: '2023-11-05' }
    ];
    
    const tableBody = document.getElementById('recent-donations-body');
    
    recentDonations.forEach(donation => {
        const row = document.createElement('tr');
        
        // Format the date
        const dateObj = new Date(donation.date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        row.innerHTML = `
            <td>${donation.donor}</td>
            <td>${donation.amount}</td>
            <td>${donation.program}</td>
            <td>${formattedDate}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Add scroll animation for elements
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.stat-card, .impact-card, .report-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});