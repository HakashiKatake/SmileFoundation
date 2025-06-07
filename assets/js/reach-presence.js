document.addEventListener('DOMContentLoaded', function() {
    // Create an intersection observer to detect when the stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is visible
            if (entry.isIntersecting) {
                // Start the counters animation
                startCounters();
                // Unobserve to prevent retriggering
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

    // Observe the stats section
    const statsSection = document.querySelector('.impact-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Function to animate counters
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Lower = faster

        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-target'));
            
            // Calculate animation speed based on target value
            // Larger numbers get faster increments
            const increment = Math.ceil(targetValue / speed);
            
            // Create the animation function
            function updateCount() {
                const currentValue = parseInt(counter.innerText);
                if (currentValue < targetValue) {
                    // Increment but don't exceed target
                    counter.innerText = Math.min(currentValue + increment, targetValue);
                    // Continue animation
                    setTimeout(updateCount, 30);
                }
            }
            
            // Start counting
            updateCount();
        });
    }

    // If IntersectionObserver isn't supported or fails, fallback to start on page load
    if (!window.IntersectionObserver) {
        setTimeout(startCounters, 500);
    }
});