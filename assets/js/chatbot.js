// Smile Foundation Simple Chatbot
class SmileChatbot {
    constructor() {
        this.isOpen = false;
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.setupEventListeners();
        this.initializeSpeechRecognition();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <!-- Chatbot Toggle Button -->
                <div id="chatbot-toggle" class="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge">Ask me anything!</span>
                </div>

                <!-- Chatbot Window -->
                <div id="chatbot-window" class="chatbot-window">
                    <!-- Header -->
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">
                                <img src="../assets/images/smile-bot-avatar.png" alt="Smile Bot" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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

                    <!-- Messages Area -->
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <p>Hello! I'm your Smile Foundation assistant. I can help you with:</p>
                                <ul>
                                    <li>Information about our programs</li>
                                    <li>Donation process and options</li>
                                    <li>Volunteer opportunities</li>
                                    <li>Partnership inquiries</li>
                                    <li>General questions about our work</li>
                                </ul>
                                <p>How can I assist you today?</p>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="chatbot-quick-actions">
                        <button class="quick-action-btn" data-message="How can I donate to Smile Foundation?">
                            💝 Donate
                        </button>
                        <button class="quick-action-btn" data-message="How can I volunteer with Smile Foundation?">
                            🤝 Volunteer
                        </button>
                        <button class="quick-action-btn" data-message="What programs does Smile Foundation run?">
                            📚 Programs
                        </button>
                        <button class="quick-action-btn" data-message="How can my company partner with Smile Foundation?">
                            🏢 Partner
                        </button>
                    </div>

                    <!-- Input Area -->
                    <div class="chatbot-input-area">
                        <div class="input-container">
                            <input type="text" id="chatbot-input" placeholder="Type your message..." maxlength="500">
                            <button id="chatbot-send" class="send-btn">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div id="voice-indicator" class="voice-indicator">
                            <div class="voice-animation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span class="voice-text">Listening...</span>
                        </div>
                    </div>

                    <!-- Typing Indicator -->
                    <div id="typing-indicator" class="typing-indicator">
                        <div class="message bot-message">
                            <div class="message-avatar">🤖</div>
                            <div class="message-content">
                                <div class="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Close chatbot
        document.getElementById('chatbot-close').addEventListener('click', () => {
            this.closeChatbot();
        });

        // Minimize chatbot
        document.getElementById('chatbot-minimize').addEventListener('click', () => {
            this.minimizeChatbot();
        });

        // Send message
        document.getElementById('chatbot-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Voice toggle
        document.getElementById('voice-toggle').addEventListener('click', () => {
            this.toggleVoice();
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.sendQuickMessage(message);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            const chatbotContainer = document.getElementById('chatbot-container');
            if (!chatbotContainer.contains(e.target) && this.isOpen) {
                // Don't close if clicking on toggle button
                if (!e.target.closest('#chatbot-toggle')) {
                    this.closeChatbot();
                }
            }
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.showVoiceIndicator();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.sendMessage(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.hideVoiceIndicator();
                this.isListening = false;
            };

            this.recognition.onend = () => {
                this.hideVoiceIndicator();
                this.isListening = false;
            };
        }
    }

    toggleChatbot() {
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            chatbotWindow.classList.add('open');
            chatbotToggle.classList.add('hidden');
            this.isOpen = true;
            
            // Focus on input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 300);
        }
    }

    closeChatbot() {
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        
        chatbotWindow.classList.remove('open');
        chatbotToggle.classList.remove('hidden');
        this.isOpen = false;
        
        if (this.isListening) {
            this.stopListening();
        }
    }

    minimizeChatbot() {
        this.closeChatbot();
    }

    sendMessage(messageText = null) {
        const input = document.getElementById('chatbot-input');
        const message = messageText || input.value.trim();
        
        if (!message) return;

        // Clear input
        input.value = '';

        // Add user message to chat
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator();

        // Get response after a short delay
        setTimeout(() => {
            const response = this.getResponse(message);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add bot response
            this.addMessage(response, 'bot');
            
            // Speak response if voice is enabled
            if (this.synthesis && !this.synthesis.speaking) {
                this.speakMessage(response);
            }
        }, 1000);
    }

    sendQuickMessage(message) {
        this.sendMessage(message);
    }

    getResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Donation related
        if (message.includes('donate') || message.includes('donation') || message.includes('contribute') || message.includes('fund')) {
            return "I'd love to help you with donations! You can donate through our website's donation page. We accept various payment methods and provide tax exemption certificates under Section 80G. Your donation directly helps children - 85% goes directly to beneficiaries. Visit our donation page to get started!";
        }
        
        // Tax related
        if (message.includes('tax') || message.includes('80g') || message.includes('deduct')) {
            return "Yes! Donations to Smile Foundation are eligible for tax benefits under Section 80G of the Income Tax Act. You'll receive a tax exemption certificate for your donation via email.";
        }
        
        // Volunteer related
        if (message.includes('volunteer') || message.includes('help') || message.includes('join')) {
            return "Thank you for your interest in volunteering! We offer opportunities in teaching, healthcare support, event management, digital marketing, and more. Fill out our volunteer application form on the website to get started. We provide training and orientation for all volunteers.";
        }
        
        // Programs related
        if (message.includes('program') || message.includes('education') || message.includes('healthcare') || message.includes('shiksha')) {
            return "Smile Foundation runs 6 main programs: 1) Education (Shiksha Na Ruke, Mission Education), 2) Healthcare (Smile on Wheels), 3) Women Empowerment, 4) Livelihood training, 5) Empowering Grassroots, and 6) Disaster Response. We impact 20+ lakh children annually!";
        }
        
        // Partnership related
        if (message.includes('partner') || message.includes('corporate') || message.includes('company') || message.includes('csr')) {
            return "We'd love to partner with your organization! We offer CSR initiatives, employee engagement programs, skill-based volunteering, and payroll giving. Contact our partnerships team at info@smilefoundationindia.org for customized collaboration opportunities.";
        }
        
        // Contact related
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
            return "You can reach us at: Email: info@smilefoundationindia.org, Phone: +91-11-43123700, Address: 1st Floor, Kailash Building, 26 Kasturba Gandhi Marg, New Delhi - 110001. We're also active on social media!";
        }
        
        // About Smile Foundation
        if (message.includes('about') || message.includes('what is') || message.includes('smile foundation')) {
            return "Smile Foundation is an Indian NGO established in 2002. We impact 20+ lakh children and families annually through 400+ projects across 27 states. We work in education, healthcare, women empowerment, livelihood, and disaster response.";
        }
        
        // Greeting
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm your Smile Foundation assistant. I can help you with information about donations, volunteering, our programs, partnerships, and more. How can I assist you today?";
        }
        
        // Thank you
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else you'd like to know about Smile Foundation? I'm here to help!";
        }
        
        // Default response
        return "I'm here to help you learn about Smile Foundation! You can ask me about:\n• How to donate and tax benefits\n• Volunteer opportunities\n• Our programs (Education, Healthcare, etc.)\n• Corporate partnerships\n• Contact information\n\nWhat would you like to know?";
    }



    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const avatar = sender === 'user' ? '👤' : '🤖';
        
        messageElement.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${this.formatMessage(message)}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;


    }

    formatMessage(message) {
        // Convert URLs to links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        message = message.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
        
        // Convert line breaks to <br>
        message = message.replace(/\n/g, '<br>');
        
        return message;
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        typingIndicator.style.display = 'block';
        
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        typingIndicator.style.display = 'none';
    }

    toggleVoice() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (this.recognition) {
            this.recognition.start();
        } else {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge for voice features.');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    showVoiceIndicator() {
        const voiceIndicator = document.getElementById('voice-indicator');
        const voiceBtn = document.getElementById('voice-toggle');
        
        voiceIndicator.style.display = 'flex';
        voiceBtn.classList.add('listening');
    }

    hideVoiceIndicator() {
        const voiceIndicator = document.getElementById('voice-indicator');
        const voiceBtn = document.getElementById('voice-toggle');
        
        voiceIndicator.style.display = 'none';
        voiceBtn.classList.remove('listening');
    }

    speakMessage(message) {
        // Remove HTML tags for speech
        const textToSpeak = message.replace(/<[^>]*>/g, '');
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Try to use a female voice if available
        const voices = this.synthesis.getVoices();
        const femaleVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('female') || 
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('hazel')
        );
        
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
        
        this.synthesis.speak(utterance);
    }


}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the page to fully load
    setTimeout(() => {
        window.smileChatbot = new SmileChatbot();
    }, 1000);
});

// Export for external use
window.SmileChatbot = SmileChatbot;