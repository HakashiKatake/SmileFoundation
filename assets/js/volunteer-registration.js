
document.addEventListener('DOMContentLoaded', function() {
    
    let currentStep = 1;
    const totalSteps = 4;
    const formData = {};
    let selectedInterests = [];
    let selectedAvailability = null;
    
    function setupListeners() {
       
        document.querySelectorAll('.interest-card').forEach(card => {
            card.addEventListener('click', () => {
                const interest = card.getAttribute('data-interest');
                
                if (card.classList.contains('selected')) {
                    card.classList.remove('selected');
                    selectedInterests = selectedInterests.filter(i => i !== interest);
                } else {
                    card.classList.add('selected');
                    selectedInterests.push(interest);
                }
            });
        });
        
  
        document.querySelectorAll('.availability-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.availability-card').forEach(c => {
                    c.classList.remove('selected');
                });
                
                card.classList.add('selected');
                selectedAvailability = card.getAttribute('data-availability');
            });
        });
        
     
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
        
  
        const slider = document.getElementById('timeCommitment');
        const valueDisplay = document.getElementById('commitmentValue');
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', (e) => {
                valueDisplay.textContent = e.target.value;
            });
        }
    }
    

    function validateField(field) {
        const value = field.value.trim();
        
    
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
        
 
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'This field is required';
            field.parentNode.appendChild(errorDiv);
            return false;
        }
        

        if (field.name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = 'Please enter a valid email address';
                field.parentNode.appendChild(errorDiv);
                return false;
            }
        }
        
        return true;
    }
    

    function handleSubmit() {
      
        document.querySelectorAll('#volunteer-registration-form input, #volunteer-registration-form select, #volunteer-registration-form textarea').forEach(element => {
            if (element.name) {
                formData[element.name] = element.value;
            }
        });
        
        formData.interests = selectedInterests;
        formData.availability = selectedAvailability;
        formData.timeCommitment = document.getElementById('timeCommitment').value;
        
     
        const submitButton = document.querySelector('.btn-next');
        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
        }
     
        setTimeout(() => {
            localStorage.setItem('volunteerRegistration', JSON.stringify(formData));
            
            if (submitButton) {
                submitButton.innerHTML = 'Complete Registration <i class="fas fa-check"></i>';
                submitButton.disabled = false;
            }
            
            alert('Registration completed successfully!');
        }, 1000);
    }
    
 
    window.nextStep = function() {
        if (currentStep < totalSteps) {
         
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
            
         
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
            
      
            updateProgress();
            
            
            if (currentStep === totalSteps) {
                handleSubmit();
            }
            
       
            document.querySelector('.registration-section').scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    window.prevStep = function() {
        if (currentStep > 1) {
       
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
            
    
            currentStep--;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
            
         
            updateProgress();
            
       
            document.querySelector('.registration-section').scrollIntoView({ behavior: 'smooth' });
        }
    };
    
   
    function updateProgress() {
        const progressLines = document.querySelectorAll('.progress-line');
        const completedSteps = document.querySelectorAll('.progress-step.completed');
        
        progressLines.forEach((line, index) => {
            if (index < completedSteps.length) {
                line.style.setProperty('--progress-width', '100%');
            } else {
                line.style.setProperty('--progress-width', '0%');
            }
        });
    }
    
    
    window.goToDashboard = function() {
        window.location.href = '/pages/volunteer-dashboard.html';
    };
    
    window.exploreOpportunities = function() {
        window.location.href = '/pages/volunteer-opportunities.html';
    };
    
  
    setupListeners();
});

