document.addEventListener('DOMContentLoaded', function() {
    
    const yearTabs = document.querySelectorAll('.pr-year-tab');
    
    
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            
            const year = this.getAttribute('data-year');
            
            
            yearTabs.forEach(t => t.classList.remove('pr-active'));
            
            
            this.classList.add('pr-active');
            
            
            const yearContents = document.querySelectorAll('.pr-year-content');
            yearContents.forEach(content => {
                content.style.display = 'none';
            });
            
            
            const selectedYearContent = document.getElementById(`year-${year}`);
            if (selectedYearContent) {
                selectedYearContent.style.display = 'block';
            }
        });
    });
});