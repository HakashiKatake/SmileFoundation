document.addEventListener('DOMContentLoaded', function() {
    
    const storyDots = document.querySelectorAll('.nav-dot');
    const storySlides = document.querySelectorAll('.story-slide');
    
    storyDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            
            
            storySlides.forEach(slide => slide.classList.remove('active'));
            storyDots.forEach(dot => dot.classList.remove('active'));
            
            
            storySlides[index].classList.add('active');
            this.classList.add('active');
        });
    });
    
    
    const videoDots = document.querySelectorAll('.video-dot');
    
    videoDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            videoDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
        });
    });
    
    document.querySelector('.prev-video').addEventListener('click', function() {
        
        console.log('Previous video');
    });
    
    document.querySelector('.next-video').addEventListener('click', function() {
        
        console.log('Next video');
    });
    
    
    const newsDots = document.querySelectorAll('.news-dot');
    
    newsDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            newsDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            
        });
    });
});