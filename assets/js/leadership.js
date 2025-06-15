document.addEventListener('DOMContentLoaded', function() {
    
    const toggleButtons = document.querySelectorAll('.profile-toggle');
    
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const card = this.closest('.profile-card');
            
            
            card.classList.toggle('expanded');
            
            
            const toggleIcon = this.querySelector('.toggle-icon');
            if (card.classList.contains('expanded')) {
                toggleIcon.textContent = '−'; 
            } else {
                toggleIcon.textContent = '+'; 
            }
        });
    });
    
    
    const mentorCard = document.querySelector('.mentor-container .profile-card');
    if (mentorCard) {
        mentorCard.classList.add('expanded');
        const mentorToggle = mentorCard.querySelector('.toggle-icon');
        if (mentorToggle) {
            mentorToggle.textContent = '−';
        }
    }
});