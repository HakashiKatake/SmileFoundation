document.addEventListener('DOMContentLoaded', function() {
    // Get all the toggle elements
    const toggleButtons = document.querySelectorAll('.profile-toggle');
    
    // Add click event listener to each toggle button
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent profile card
            const card = this.closest('.profile-card');
            
            // Toggle expanded class on the card
            card.classList.toggle('expanded');
            
            // Update toggle icon based on expanded state
            const toggleIcon = this.querySelector('.toggle-icon');
            if (card.classList.contains('expanded')) {
                toggleIcon.textContent = '−'; // Minus sign
            } else {
                toggleIcon.textContent = '+'; // Plus sign
            }
        });
    });
    
    // Set mentor card as expanded by default
    const mentorCard = document.querySelector('.mentor-container .profile-card');
    if (mentorCard) {
        mentorCard.classList.add('expanded');
        const mentorToggle = mentorCard.querySelector('.toggle-icon');
        if (mentorToggle) {
            mentorToggle.textContent = '−';
        }
    }
});