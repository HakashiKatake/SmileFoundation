
const SmileKnowledgeBase = {
  
    faqs: {
        general: [
            {
                question: "What is Smile Foundation?",
                answer: "Smile Foundation is an Indian development organization established in 2002. We impact over 20 lakh children and families annually through 400+ projects across 27 states of India."
            },
            {
                question: "Where does Smile Foundation work?",
                answer: "We work in over 2,000 remote villages and urban slums across 27 states of India."
            }
        ],
        
        donation: [
            {
                question: "How can I donate?",
                answer: "You can donate through our website's donation page. We accept online payments via credit/debit cards, net banking, UPI, and digital wallets."
            },
            {
                question: "Is my donation tax deductible?",
                answer: "Yes! Donations are eligible for tax benefits under Section 80G of the Income Tax Act."
            },
            {
                question: "How is my donation used?",
                answer: "85% of your donation directly reaches beneficiaries. The remaining 15% covers administrative costs."
            }
        ],
        
        volunteering: [
            {
                question: "How can I volunteer?",
                answer: "Fill out our volunteer application form on the website. We offer opportunities in teaching, healthcare support, event management, and more."
            },
            {
                question: "What volunteer opportunities are available?",
                answer: "We offer volunteering in teaching, healthcare, event planning, digital marketing, content creation, and fundraising."
            }
        ],
        
        programs: [
            {
                question: "What programs does Smile Foundation run?",
                answer: "We run six main programs: Education, Healthcare, Women Empowerment, Livelihood training, Empowering Grassroots, and Disaster Response."
            }
        ],
        
        partnership: [
            {
                question: "How can my company partner with Smile Foundation?",
                answer: "Companies can partner through CSR initiatives, employee engagement programs, skill-based volunteering, and payroll giving."
            }
        ]
    },
    
   
    quickResponses: {
        greeting: [
            "Hello! I'm here to help you learn about Smile Foundation. How can I assist you today?",
            "Hi there! I can help with information about our programs, donations, and volunteering."
        ],
        
        thanks: [
            "You're welcome! Is there anything else you'd like to know?",
            "Happy to help! Feel free to ask if you have any other questions."
        ],
        
        goodbye: [
            "Thank you for your interest in Smile Foundation!",
            "Goodbye! We hope to see you as part of our mission soon!"
        ]
    },
    
   
    contact: {
        email: "info@smilefoundationindia.org",
        phone: "+91-11-43123700",
        address: "Smile Foundation, New Delhi - 110001",
        website: "www.smilefoundationindia.org"
    },
    

    keywords: {
        donation: ["donate", "donation", "contribute", "fund", "money"],
        volunteer: ["volunteer", "help", "join", "participate"],
        programs: ["program", "education", "healthcare", "women empowerment"],
        partnership: ["partner", "corporate", "company", "csr"],
        contact: ["contact", "phone", "email", "address"],
        about: ["about", "what is", "who are"]
    }
};


function recognizeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(SmileKnowledgeBase.keywords)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return intent;
        }
    }
    
    return 'general';
}


function getRelevantFAQ(intent, message) {
    const faqs = SmileKnowledgeBase.faqs[intent] || SmileKnowledgeBase.faqs.general;
    const lowerMessage = message.toLowerCase();
    
    for (const faq of faqs) {
        const questionWords = faq.question.toLowerCase().split(' ');
        const messageWords = lowerMessage.split(' ');
        
        const commonWords = questionWords.filter(word => 
            messageWords.some(msgWord => msgWord.includes(word) || word.includes(msgWord))
        );
        
        if (commonWords.length >= 2) {
            return faq.answer;
        }
    }
    
    return null;
}


window.SmileKnowledgeBase = SmileKnowledgeBase;
window.recognizeIntent = recognizeIntent;
window.getRelevantFAQ = getRelevantFAQ;