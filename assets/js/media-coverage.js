document.addEventListener('DOMContentLoaded', function() {
    
    const yearTabs = document.querySelectorAll('.po-year-tab');
    
    
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            
            const year = this.getAttribute('data-year');
            
            
            yearTabs.forEach(t => t.classList.remove('po-active'));
            
            
            this.classList.add('po-active');
            
            
            const yearContents = document.querySelectorAll('.po-year-content');
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