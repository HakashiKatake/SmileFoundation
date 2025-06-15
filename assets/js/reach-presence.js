document.addEventListener('DOMContentLoaded', function() {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                
                startCounters();
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); 

    
    const statsSection = document.querySelector('.impact-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; 

        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-target'));
            
            
            
            const increment = Math.ceil(targetValue / speed);
            
            
            function updateCount() {
                const currentValue = parseInt(counter.innerText);
                if (currentValue < targetValue) {
                    
                    counter.innerText = Math.min(currentValue + increment, targetValue);
                    
                    setTimeout(updateCount, 30);
                }
            }
            
            
            updateCount();
        });
    }

    
    if (!window.IntersectionObserver) {
        setTimeout(startCounters, 500);
    }
});