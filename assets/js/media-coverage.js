document.addEventListener('DOMContentLoaded', function() {
    // Get all year tabs
    const yearTabs = document.querySelectorAll('.po-year-tab');
    
    // Add click event listener to each tab
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the year from the data attribute
            const year = this.getAttribute('data-year');
            
            // Remove active class from all tabs
            yearTabs.forEach(t => t.classList.remove('po-active'));
            
            // Add active class to clicked tab
            this.classList.add('po-active');
            
            // Hide all year content
            const yearContents = document.querySelectorAll('.po-year-content');
            yearContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected year content
            const selectedYearContent = document.getElementById(`year-${year}`);
            if (selectedYearContent) {
                selectedYearContent.style.display = 'block';
            }
        });
    });
});