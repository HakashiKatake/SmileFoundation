// Volunteer Registration JavaScript

class VolunteerRegistration {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.selectedInterests = [];
        this.selectedAvailability = null;
        this.selectedState = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeSlider();
        this.setupFormValidation();
    }
    
    setupEventListeners() {
        // Interest cards selection
        document.querySelectorAll('.interest-card').forEach(card => {
            card.addEventListener('click', () => {
                this.toggleInterest(card);
            });
        });
        
        // Availability cards selection
        document.querySelectorAll('.availability-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectAvailability(card);
            });
        });
        
        // Form input validation
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    initializeSlider() {
        const slider = document.getElementById('timeCommitment');
        const valueDisplay = document.getElementById('commitmentValue');
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', (e) => {
                valueDisplay.textContent = e.target.value;
            });
        }
    }
    
    setupFormValidation() {
        const form = document.getElementById('volunteer-registration-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
    }
    
    toggleInterest(card) {
        const interest = card.getAttribute('data-interest');
        
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selectedInterests = this.selectedInterests.filter(i => i !== interest);
        } else {
            card.classList.add('selected');
            this.selectedInterests.push(interest);
        }
        
        this.updateNextButtonState();
    }
    
    selectAvailability(card) {
        // Remove selection from all cards
        document.querySelectorAll('.availability-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Select clicked card
        card.classList.add('selected');
        this.selectedAvailability = card.getAttribute('data-availability');
        
        this.updateNextButtonState();
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    validateCurrentStep() {
        // Always return true - no validation checks
        return true;
    }
    
    showStepError(message) {
        // Remove existing error
        const existingError = document.querySelector('.step-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'step-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        const currentStep = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const formActions = currentStep.querySelector('.form-actions');
        formActions.parentNode.insertBefore(errorDiv, formActions);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    updateNextButtonState() {
        const nextButton = document.querySelector('.btn-next');
        if (!nextButton) {
            console.log('Next button not found');
            return;
        }
        
        // Always enable the next button - no validation checks
        nextButton.disabled = false;
        console.log('Next button always enabled');
    }
    
    collectFormData() {
        const formElements = document.querySelectorAll('#volunteer-registration-form input, #volunteer-registration-form select, #volunteer-registration-form textarea');
        
        formElements.forEach(element => {
            if (element.name) {
                this.formData[element.name] = element.value;
            }
        });
        
        // Add selected preferences
        this.formData.interests = this.selectedInterests;
        this.formData.availability = this.selectedAvailability;
        this.formData.selectedState = this.selectedState;
        this.formData.timeCommitment = document.getElementById('timeCommitment').value;
    }
    
    handleFormSubmit() {
        this.collectFormData();
        
        // Simulate API call
        this.showLoadingState();
        
        setTimeout(() => {
            this.hideLoadingState();
            this.showSuccessMessage();
            
            // Store registration data (in real app, this would be sent to server)
            localStorage.setItem('volunteerRegistration', JSON.stringify(this.formData));
            
            // Send welcome email (simulation)
            this.sendWelcomeEmail();
            
        }, 2000);
    }
    
    showLoadingState() {
        const submitButton = document.querySelector('.btn-next');
        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
        }
    }
    
    hideLoadingState() {
        const submitButton = document.querySelector('.btn-next');
        if (submitButton) {
            submitButton.innerHTML = 'Complete Registration <i class="fas fa-check"></i>';
            submitButton.disabled = false;
        }
    }
    
    showSuccessMessage() {
        // This will be handled by the step transition to step 4
        console.log('Registration completed successfully!');
    }
    
    sendWelcomeEmail() {
        // Simulate sending welcome email
        console.log('Welcome email sent to:', this.formData.email);
        
        // In a real application, this would make an API call to send the email
        // fetch('/api/send-welcome-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: this.formData.email, name: this.formData.firstName })
        // });
    }
}

// Step navigation functions (called from HTML)
function nextStep() {
    const registration = window.volunteerRegistration;
    
    if (!registration.validateCurrentStep()) {
        return;
    }
    
    if (registration.currentStep < registration.totalSteps) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${registration.currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${registration.currentStep}"]`).classList.add('completed');
        
        // Show next step
        registration.currentStep++;
        document.querySelector(`.form-step[data-step="${registration.currentStep}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${registration.currentStep}"]`).classList.add('active');
        
        // Update progress lines
        updateProgressLines();
        
        // Handle final step
        if (registration.currentStep === registration.totalSteps) {
            registration.handleFormSubmit();
        }
        
        // Scroll to top
        document.querySelector('.registration-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function prevStep() {
    const registration = window.volunteerRegistration;
    
    if (registration.currentStep > 1) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${registration.currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${registration.currentStep}"]`).classList.remove('active');
        
        // Show previous step
        registration.currentStep--;
        document.querySelector(`.form-step[data-step="${registration.currentStep}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${registration.currentStep}"]`).classList.remove('completed');
        
        // Update progress lines
        updateProgressLines();
        
        // Scroll to top
        document.querySelector('.registration-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function updateProgressLines() {
    const progressLines = document.querySelectorAll('.progress-line');
    const completedSteps = document.querySelectorAll('.progress-step.completed');
    
    progressLines.forEach((line, index) => {
        const afterElement = line.querySelector('::after') || line;
        if (index < completedSteps.length) {
            line.style.setProperty('--progress-width', '100%');
        } else {
            line.style.setProperty('--progress-width', '0%');
        }
    });
}

function goToDashboard() {
    // Redirect to volunteer dashboard
    window.location.href = '/pages/volunteer-dashboard.html';
}

function exploreOpportunities() {
    // Redirect to opportunities page
    window.location.href = '/pages/volunteer-opportunities.html';
}

// Initialize registration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.volunteerRegistration = new VolunteerRegistration();
    
    // Add CSS for error states
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .error-message::before {
            content: "⚠";
        }
        
        .step-error {
            background: #f8d7da;
            color: #721c24;
            padding: 12px 16px;
            border-radius: 8px;
            margin: 20px 0;
            border: 1px solid #f5c6cb;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInDown 0.3s ease;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .progress-line::after {
            width: var(--progress-width, 0%);
        }
    `;
    document.head.appendChild(style);
});

// Export for external use
window.VolunteerRegistration = VolunteerRegistration;