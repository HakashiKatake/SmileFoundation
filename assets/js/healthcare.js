document.addEventListener('DOMContentLoaded', function() {
    // Stories of Hope navigation
    const storyDots = document.querySelectorAll('.nav-dot');
    const storySlides = document.querySelectorAll('.story-slide');
    
    storyDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            
            // Hide all slides and remove active class from dots
            storySlides.forEach(slide => slide.classList.remove('active'));
            storyDots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected slide and set active class on clicked dot
            storySlides[index].classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Video navigation (simplified for demo)
    const videoDots = document.querySelectorAll('.video-dot');
    
    videoDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            videoDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            // In a real implementation, you would change the video source here
        });
    });
    
    document.querySelector('.prev-video').addEventListener('click', function() {
        // Navigate to previous video logic
        console.log('Previous video');
    });
    
    document.querySelector('.next-video').addEventListener('click', function() {
        // Navigate to next video logic
        console.log('Next video');
    });
    
    // News navigation
    const newsDots = document.querySelectorAll('.news-dot');
    
    newsDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            newsDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            // In a real implementation, you would change the news article here
        });
    });
});