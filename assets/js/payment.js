const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'fa-mobile-alt', options: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'] },
    { id: 'card', name: 'Card', icon: 'fa-credit-card', options: ['Visa', 'Mastercard', 'RuPay', 'American Express'] },
    { id: 'netbanking', name: 'Net Banking', icon: 'fa-university', options: ['SBI', 'HDFC', 'ICICI', 'Axis', 'Other Banks'] },
    { id: 'wallet', name: 'Wallet', icon: 'fa-wallet', options: ['Paytm', 'Amazon Pay', 'MobiKwik', 'Freecharge'] },
    { id: 'paypal', name: 'PayPal', icon: 'fa-paypal', options: [] }
];

document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    
    if (donationForm) {
        createPaymentGateway();
        
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm()) {
                showPaymentGateway();
            } else {
                alert('Please fill in all the required fields correctly.');
            }
        });
    }
});

function createPaymentGateway() {
    const container = document.createElement('div');
    container.id = 'paymentGateway';
    container.className = 'payment-gateway-container';
    container.style.display = 'none';
    
    const tabs = document.createElement('div');
    tabs.className = 'payment-methods-tabs';
    
    paymentMethods.forEach(method => {
        const tab = document.createElement('button');
        tab.className = 'payment-method-tab';
        tab.setAttribute('data-method', method.id);
        tab.innerHTML = `<i class="fas ${method.icon}"></i> ${method.name}`;
        tab.addEventListener('click', () => selectPaymentMethod(method.id));
        tabs.appendChild(tab);
    });
    
    const content = document.createElement('div');
    content.className = 'payment-method-content';
    
    const actions = document.createElement('div');
    actions.className = 'payment-actions';
    actions.innerHTML = `
        <button class="cancel-payment-btn" onclick="hidePaymentGateway()">Cancel</button>
        <button class="pay-now-btn" onclick="processPayment()">Pay Now</button>
    `;
    
    container.appendChild(tabs);
    container.appendChild(content);
    container.appendChild(actions);
    
    document.getElementById('donationForm').parentNode.insertBefore(container, document.getElementById('donationForm').nextSibling);
}

function validateForm() {
    const requiredFields = document.querySelectorAll('#donationForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => field.classList.remove('error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        }
    });
    
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

function showPaymentGateway() {
    document.getElementById('donationForm').style.display = 'none';
    document.getElementById('paymentGateway').style.display = 'block';
    
    const firstTab = document.querySelector('.payment-method-tab');
    if (firstTab) {
        firstTab.click();
    }
    
    updatePaymentAmount();
}

function hidePaymentGateway() {
    document.getElementById('donationForm').style.display = 'block';
    document.getElementById('paymentGateway').style.display = 'none';
}

function selectPaymentMethod(methodId) {
    document.querySelectorAll('.payment-method-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-method') === methodId);
    });
    
    const method = paymentMethods.find(m => m.id === methodId);
    
    const content = document.querySelector('.payment-method-content');
    content.innerHTML = '';
    
    const methodContent = document.createElement('div');
    methodContent.className = `${methodId}-content`;
    
    const heading = document.createElement('h3');
    heading.textContent = `Pay using ${method.name}`;
    methodContent.appendChild(heading);
    
    if (method.options && method.options.length > 0) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = `${methodId}-options`;
        
        method.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = `${methodId}-option`;
            optionElement.innerHTML = `
                <div class="option-icon"><i class="fas ${method.icon}"></i></div>
                <div class="option-name">${option}</div>
            `;
            optionElement.addEventListener('click', function() {
                document.querySelectorAll(`.${methodId}-option`).forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
            optionsContainer.appendChild(optionElement);
        });
        
        methodContent.appendChild(optionsContainer);
    }
    
    if (methodId === 'card') {
        methodContent.innerHTML += `
            <div class="card-form">
                <div class="form-group">
                    <input type="text" placeholder="Card Number" maxlength="19">
                </div>
                <div class="form-row">
                    <input type="text" placeholder="MM/YY" maxlength="5">
                    <input type="password" placeholder="CVV" maxlength="3">
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Name on Card">
                </div>
            </div>
        `;
    } else if (methodId === 'upi') {
        methodContent.innerHTML += `
            <div class="upi-input">
                <input type="text" placeholder="Enter UPI ID (e.g., name@upi)">
            </div>
        `;
    } else if (methodId === 'netbanking') {
        const select = document.createElement('select');
        select.innerHTML = '<option value="">-- Select Bank --</option>';
        ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'BOB', 'IDFC'].forEach(bank => {
            select.innerHTML += `<option value="${bank}">${bank}</option>`;
        });
        methodContent.appendChild(select);
    } else if (methodId === 'paypal') {
        methodContent.innerHTML += `
            <div class="paypal-logo"><i class="fab fa-paypal"></i></div>
            <p class="paypal-info">Secure payment via PayPal. Supports multiple currencies.</p>
            <select>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
            </select>
        `;
    }
    
    content.appendChild(methodContent);
}

function updatePaymentAmount() {
    let amount = 3000;
    
    const selectedAmount = document.querySelector('input[name="amount"]:checked');
    if (selectedAmount) {
        amount = parseInt(selectedAmount.value);
    }
    
    const otherAmount = document.getElementById('otherAmount');
    if (otherAmount && otherAmount.value) {
        amount = parseInt(otherAmount.value);
    }
    
    const payButton = document.querySelector('.pay-now-btn');
    if (payButton) {
        payButton.textContent = `Pay ₹${amount.toLocaleString()}`;
    }
}

function processPayment() {
    const payButton = document.querySelector('.pay-now-btn');
    const originalText = payButton.textContent;
    payButton.disabled = true;
    payButton.textContent = 'Processing...';
    
    setTimeout(() => {
        payButton.disabled = false;
        payButton.textContent = originalText;
        
        const success = Math.random() < 0.8;
        
        showPaymentResult(success);
    }, 2000);
}

function showPaymentResult(success) {
    const overlay = document.createElement('div');
    overlay.className = 'payment-result-overlay';
    
    const message = success ? 
        'Payment successful! Thank you for your donation.' : 
        'Payment failed. Please try again or use a different payment method.';
    
    overlay.innerHTML = `
        <div class="payment-result-container">
            <div class="result-icon">
                <i class="fas ${success ? 'fa-check-circle success' : 'fa-times-circle failure'}"></i>
            </div>
            <p class="result-message">${message}</p>
            <button class="close-result-btn" onclick="handlePaymentResult(${success})">${success ? 'Done' : 'Try Again'}</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function handlePaymentResult(success) {
    document.querySelector('.payment-result-overlay').remove();
    
    if (success) {
        document.getElementById('donationForm').reset();
        hidePaymentGateway();
        
        window.scrollTo(0, 0);
        alert('Thank you for your donation! A receipt has been sent to your email.');
    }
}