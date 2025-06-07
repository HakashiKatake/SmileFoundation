// Function to load header and footer components
function loadComponents() {
    // Load header
    fetch('/components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load header');
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary container to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Insert the header at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Initialize header-related functionality
            if (window.initializeNavigation) {
                window.initializeNavigation();
            }
            if (window.initializeMobileMenu) {
                window.initializeMobileMenu();
            }
            
            // Load footer after header is loaded
            loadFooter();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Still try to load footer even if header fails
            loadFooter();
        });
}

// Function to load footer
function loadFooter() {
    fetch('/components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer');
            }
            return response.text();
        })
        .then(html => {
            // Insert the footer at the end of the body
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Initialize any footer-related functionality here
            initializeNewsletterForm();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            console.log('Subscribed with email:', email);
            // Show success message or handle the subscription
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
}

// Load components when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    // DOMContentLoaded has already fired
    loadComponents();
}
