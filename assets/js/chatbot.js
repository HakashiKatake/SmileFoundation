
document.addEventListener('DOMContentLoaded', function() {
  
    setTimeout(() => {
        createChatbotUI();
        setupEventListeners();
        initSpeechRecognition();
    }, 500);
});


let isOpen = false;
let isListening = false;
let recognition = null;
const synthesis = window.speechSynthesis;


function createChatbotUI() {
    const chatbotHTML = `
        <div id="chatbot-container" class="chatbot-container">
            <div id="chatbot-toggle" class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-badge">Ask me anything!</span>
            </div>
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <div class="avatar-placeholder">🤖</div>
                        </div>
                        <div class="chatbot-title">
                            <h4>Smile Assistant</h4>
                            <span class="chatbot-status">Online • Ready to help</span>
                        </div>
                    </div>
                    <div class="chatbot-controls">
                        <button id="voice-toggle" class="voice-btn" title="Voice Chat">
                            <i class="fas fa-microphone"></i>
                        </button>
                        <button id="chatbot-minimize" class="minimize-btn" title="Minimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button id="chatbot-close" class="close-btn" title="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>Hello! I'm your Smile Foundation assistant. How can I help you today?</p>
                        </div>
                    </div>
                </div>
                <div class="chatbot-quick-actions">
                    <button class="quick-action-btn" data-message="How can I donate?">💝 Donate</button>
                    <button class="quick-action-btn" data-message="How can I volunteer?">🤝 Volunteer</button>
                    <button class="quick-action-btn" data-message="What programs do you run?">📚 Programs</button>
                    <button class="quick-action-btn" data-message="How can my company partner?">🏢 Partner</button>
                </div>
                <div class="chatbot-input-area">
                    <div class="input-container">
                        <input type="text" id="chatbot-input" placeholder="Type your message...">
                        <button id="chatbot-send" class="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div id="voice-indicator" class="voice-indicator" style="display:none">
                        <span class="voice-text">Listening...</span>
                    </div>
                </div>
                <div id="typing-indicator" class="typing-indicator" style="display:none">
                    <div class="message bot-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <div class="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}


function setupEventListeners() {
 
    document.getElementById('chatbot-toggle').addEventListener('click', toggleChatbot);
    document.getElementById('chatbot-close').addEventListener('click', closeChatbot);
    document.getElementById('chatbot-minimize').addEventListener('click', closeChatbot);
    

    document.getElementById('chatbot-send').addEventListener('click', () => sendMessage());
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.getElementById('voice-toggle').addEventListener('click', toggleVoice);
    
    
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const message = e.target.getAttribute('data-message');
            sendMessage(message);
        });
    });
    
   
    document.addEventListener('click', (e) => {
        const container = document.getElementById('chatbot-container');
        if (!container.contains(e.target) && isOpen && !e.target.closest('#chatbot-toggle')) {
            closeChatbot();
        }
    });
}


function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
            isListening = true;
            document.getElementById('voice-indicator').style.display = 'flex';
            document.getElementById('voice-toggle').classList.add('listening');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            sendMessage(transcript);
        };
        
        recognition.onend = () => {
            isListening = false;
            document.getElementById('voice-indicator').style.display = 'none';
            document.getElementById('voice-toggle').classList.remove('listening');
        };
    }
}

function toggleChatbot() {
    if (isOpen) {
        closeChatbot();
    } else {
        document.getElementById('chatbot-window').classList.add('open');
        document.getElementById('chatbot-toggle').classList.add('hidden');
        isOpen = true;
        setTimeout(() => document.getElementById('chatbot-input').focus(), 300);
    }
}


function closeChatbot() {
    document.getElementById('chatbot-window').classList.remove('open');
    document.getElementById('chatbot-toggle').classList.remove('hidden');
    isOpen = false;
    if (isListening && recognition) recognition.stop();
}


function toggleVoice() {
    if (isListening) {
        if (recognition) recognition.stop();
    } else {
        if (recognition) recognition.start();
        else alert('Speech recognition not supported in your browser');
    }
}


function sendMessage(messageText = null) {
    const input = document.getElementById('chatbot-input');
    const message = messageText || input.value.trim();
    
    if (!message) return;
    input.value = '';
    
   
    addMessage(message, 'user');
    
 
    document.getElementById('typing-indicator').style.display = 'block';
    
    
    setTimeout(() => {
        const response = getResponse(message);
        document.getElementById('typing-indicator').style.display = 'none';
        addMessage(response, 'bot');
        
        
        if (synthesis && !synthesis.speaking) {
            const utterance = new SpeechSynthesisUtterance(response.replace(/<[^>]*>/g, ''));
            synthesis.speak(utterance);
        }
    }, 800);
}


function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    message = message.replace(/\n/g, '<br>');
    
    messageElement.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function getResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('donate') || message.includes('donation'))
        return "You can donate through our website's donation page. We accept various payment methods and provide tax exemption certificates under Section 80G.";
    
    if (message.includes('tax') || message.includes('80g'))
        return "Yes! Donations to Smile Foundation are eligible for tax benefits under Section 80G of the Income Tax Act.";
    
    if (message.includes('volunteer') || message.includes('help') || message.includes('join'))
        return "We offer volunteering opportunities in teaching, healthcare support, event management, and more. Fill out our volunteer form to get started.";
    
    if (message.includes('program') || message.includes('education') || message.includes('healthcare'))
        return "We run 6 main programs: Education, Healthcare, Women Empowerment, Livelihood training, Empowering Grassroots, and Disaster Response.";
    
    if (message.includes('partner') || message.includes('corporate') || message.includes('company'))
        return "We offer CSR initiatives, employee engagement programs, and more. Contact our partnerships team at info@smilefoundationindia.org.";
    
    if (message.includes('contact') || message.includes('email') || message.includes('phone'))
        return "Email: info@smilefoundationindia.org, Phone: +91-11-43123700, Address: New Delhi - 110001";
    
    if (message.includes('about') || message.includes('what is'))
        return "Smile Foundation is an Indian NGO established in 2002. We impact 20+ lakh children annually through 400+ projects across 27 states.";
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey'))
        return "Hello! How can I assist you today?";
    
    if (message.includes('thank') || message.includes('thanks'))
        return "You're welcome! Is there anything else you'd like to know?";
    
    return "I can help with donations, volunteering, our programs, partnerships, and contact information. What would you like to know?";
}