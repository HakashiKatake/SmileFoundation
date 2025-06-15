
function loadComponents() {
    
    fetch('/components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load header');
            }
            return response.text();
        })
        .then(html => {
            
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            
            document.body.insertAdjacentHTML('afterbegin', html);
            
            
            if (window.initializeNavigation) {
                window.initializeNavigation();
            }
            if (window.initializeMobileMenu) {
                window.initializeMobileMenu();
            }
            
            
            loadFooter();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            
            loadFooter();
        });
}


function loadFooter() {
    fetch('/components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer');
            }
            return response.text();
        })
        .then(html => {
            
            document.body.insertAdjacentHTML('beforeend', html);
            
            
            initializeNewsletterForm();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}


function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            console.log('Subscribed with email:', email);
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    
    loadComponents();
}
