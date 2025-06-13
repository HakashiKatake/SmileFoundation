// Volunteer Opportunities JavaScript

class VolunteerOpportunities {
    constructor() {
        this.opportunities = [];
        this.filteredOpportunities = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.activeFilters = {
            location: [],
            category: [],
            time: [],
            skills: [],
            urgency: [],
            search: ''
        };
        this.sortBy = 'relevance';
        
        this.init();
    }
    
    init() {
        this.generateOpportunities();
        this.setupEventListeners();
        this.renderOpportunities();
        this.animateNumbers();
    }
    
    generateOpportunities() {
        // Generate sample opportunities data
        const categories = ['education', 'healthcare', 'women-empowerment', 'digital-literacy', 'environment', 'disaster-relief'];
        const locations = ['mumbai', 'delhi', 'pune', 'bangalore', 'remote'];
        const urgencies = ['urgent', 'high', 'normal'];
        const timeCommitments = ['1-2', '3-5', '6-10', '10+', 'one-time'];
        const skills = ['teaching', 'medical', 'technology', 'counseling', 'no-skills'];
        
        const opportunityTemplates = [
            {
                title: 'Mathematics Tutor for Government School',
                organization: 'Smile Foundation',
                description: 'Help Grade 8-10 students improve their mathematics skills through personalized tutoring sessions.',
                impact: '50+ students',
                volunteersNeeded: 5,
                duration: 'Ongoing',
                skillsRequired: ['Mathematics', 'Teaching', 'Hindi/English']
            },
            {
                title: 'Health Awareness Campaign',
                organization: 'Smile Foundation',
                description: 'Conduct health awareness sessions in urban slums focusing on hygiene and preventive care.',
                impact: '500+ families',
                volunteersNeeded: 8,
                duration: '3 months',
                skillsRequired: ['Public Speaking', 'Health Knowledge', 'Community Work']
            },
            {
                title: 'Digital Literacy Workshop',
                organization: 'Smile Foundation',
                description: 'Teach basic computer skills to elderly citizens and help them navigate digital services.',
                impact: '100+ seniors',
                volunteersNeeded: 6,
                duration: '2 months',
                skillsRequired: ['Computer Skills', 'Patience', 'Teaching']
            },
            {
                title: 'Women Empowerment Program',
                organization: 'Smile Foundation',
                description: 'Support skill development workshops for women in rural communities.',
                impact: '200+ women',
                volunteersNeeded: 4,
                duration: '6 months',
                skillsRequired: ['Counseling', 'Skill Training', 'Communication']
            },
            {
                title: 'Environmental Cleanup Drive',
                organization: 'Smile Foundation',
                description: 'Organize community cleanup drives and environmental awareness programs.',
                impact: '10+ communities',
                volunteersNeeded: 15,
                duration: 'One-time event',
                skillsRequired: ['Physical Activity', 'Leadership', 'Environmental Awareness']
            },
            {
                title: 'Disaster Relief Support',
                organization: 'Smile Foundation',
                description: 'Provide immediate relief and support to disaster-affected communities.',
                impact: '1000+ people',
                volunteersNeeded: 20,
                duration: '1 month',
                skillsRequired: ['Crisis Management', 'Physical Stamina', 'Empathy']
            },
            {
                title: 'Child Nutrition Program',
                organization: 'Smile Foundation',
                description: 'Help prepare and distribute nutritious meals to underprivileged children.',
                impact: '300+ children',
                volunteersNeeded: 10,
                duration: 'Ongoing',
                skillsRequired: ['Food Handling', 'Child Care', 'Hygiene Awareness']
            },
            {
                title: 'Adult Literacy Classes',
                organization: 'Smile Foundation',
                description: 'Teach reading and writing skills to adults who missed formal education.',
                impact: '80+ adults',
                volunteersNeeded: 7,
                duration: '4 months',
                skillsRequired: ['Teaching', 'Patience', 'Local Language']
            }
        ];
        
        // Generate 247 opportunities
        for (let i = 0; i < 247; i++) {
            const template = opportunityTemplates[i % opportunityTemplates.length];
            const opportunity = {
                id: `opp-${i + 1}`,
                title: template.title + (i > 7 ? ` - Location ${Math.floor(i / 8) + 1}` : ''),
                organization: template.organization,
                location: locations[Math.floor(Math.random() * locations.length)],
                category: categories[Math.floor(Math.random() * categories.length)],
                urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
                timeCommitment: timeCommitments[Math.floor(Math.random() * timeCommitments.length)],
                skills: skills[Math.floor(Math.random() * skills.length)],
                description: template.description,
                impact: template.impact,
                volunteersNeeded: template.volunteersNeeded + Math.floor(Math.random() * 5),
                duration: template.duration,
                skillsRequired: template.skillsRequired,
                datePosted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
                featured: i < 2 // First 2 are featured
            };
            
            this.opportunities.push(opportunity);
        }
        
        this.filteredOpportunities = [...this.opportunities];
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('opportunity-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }
        
        // Quick filters
        document.querySelectorAll('.quick-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleQuickFilter(e.target);
            });
        });
        
        // Sidebar filters
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleFilterChange(e.target);
            });
        });
        
        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.sortOpportunities();
                this.renderOpportunities();
            });
        }
    }
    
    handleQuickFilter(filterElement) {
        // Remove active class from all quick filters
        document.querySelectorAll('.quick-filter').forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        filterElement.classList.add('active');
        
        const filterValue = filterElement.dataset.filter;
        
        // Reset all filters
        this.resetFilters();
        
        // Apply quick filter
        if (filterValue !== 'all') {
            if (filterValue === 'urgent') {
                this.activeFilters.urgency = ['urgent'];
            } else if (filterValue === 'remote') {
                this.activeFilters.location = ['remote'];
            } else {
                this.activeFilters.category = [filterValue];
            }
        }
        
        this.applyFilters();
    }
    
    handleFilterChange(checkbox) {
        const filterType = checkbox.name;
        const filterValue = checkbox.value;
        
        if (checkbox.checked) {
            if (!this.activeFilters[filterType].includes(filterValue)) {
                this.activeFilters[filterType].push(filterValue);
            }
        } else {
            this.activeFilters[filterType] = this.activeFilters[filterType].filter(v => v !== filterValue);
        }
        
        this.applyFilters();
    }
    
    resetFilters() {
        this.activeFilters = {
            location: [],
            category: [],
            time: [],
            skills: [],
            urgency: [],
            search: ''
        };
        
        // Uncheck all checkboxes
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear search
        const searchInput = document.getElementById('opportunity-search');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    applyFilters() {
        this.filteredOpportunities = this.opportunities.filter(opportunity => {
            // Search filter
            if (this.activeFilters.search) {
                const searchTerm = this.activeFilters.search;
                const searchableText = `${opportunity.title} ${opportunity.description} ${opportunity.organization}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }
            
            // Location filter
            if (this.activeFilters.location.length > 0) {
                if (!this.activeFilters.location.includes(opportunity.location)) {
                    return false;
                }
            }
            
            // Category filter
            if (this.activeFilters.category.length > 0) {
                if (!this.activeFilters.category.includes(opportunity.category)) {
                    return false;
                }
            }
            
            // Time commitment filter
            if (this.activeFilters.time.length > 0) {
                if (!this.activeFilters.time.includes(opportunity.timeCommitment)) {
                    return false;
                }
            }
            
            // Skills filter
            if (this.activeFilters.skills.length > 0) {
                if (!this.activeFilters.skills.includes(opportunity.skills)) {
                    return false;
                }
            }
            
            // Urgency filter
            if (this.activeFilters.urgency.length > 0) {
                if (!this.activeFilters.urgency.includes(opportunity.urgency)) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.sortOpportunities();
        this.currentPage = 1;
        this.renderOpportunities();
        this.updateResultsCount();
    }
    
    sortOpportunities() {
        this.filteredOpportunities.sort((a, b) => {
            switch (this.sortBy) {
                case 'date':
                    return new Date(b.datePosted) - new Date(a.datePosted);
                case 'urgency':
                    const urgencyOrder = { urgent: 3, high: 2, normal: 1 };
                    return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
                case 'location':
                    return a.location.localeCompare(b.location);
                case 'time-commitment':
                    return a.timeCommitment.localeCompare(b.timeCommitment);
                default: // relevance
                    return b.featured ? 1 : -1;
            }
        });
    }
    
    renderOpportunities() {
        const opportunitiesList = document.getElementById('opportunities-list');
        if (!opportunitiesList) return;
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const opportunitiesToShow = this.filteredOpportunities.slice(startIndex, endIndex);
        
        opportunitiesList.innerHTML = opportunitiesToShow.map(opportunity => 
            this.createOpportunityCard(opportunity)
        ).join('');
        
        this.updateLoadMoreButton();
    }
    
    createOpportunityCard(opportunity) {
        const locationName = this.getLocationName(opportunity.location);
        const categoryName = this.getCategoryName(opportunity.category);
        const urgencyClass = opportunity.urgency;
        const categoryClass = opportunity.category;
        
        return `
            <div class="opportunity-card" data-id="${opportunity.id}">
                <div class="card-header">
                    <div class="urgency-badge ${urgencyClass}">${this.getUrgencyText(opportunity.urgency)}</div>
                    <div class="category-tag ${categoryClass}">${categoryName}</div>
                </div>
                <div class="card-content">
                    <h4>${opportunity.title}</h4>
                    <p class="organization">${opportunity.organization} • ${locationName}</p>
                    <p class="description">${opportunity.description}</p>
                    
                    <div class="opportunity-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${this.getTimeCommitmentText(opportunity.timeCommitment)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${opportunity.duration}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${opportunity.volunteersNeeded} volunteers needed</span>
                        </div>
                    </div>
                    
                    <div class="skills-required">
                        ${opportunity.skillsRequired.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="impact-info">
                        <span class="impact-text">Impact: <strong>${opportunity.impact}</strong></span>
                    </div>
                    <button class="apply-btn" onclick="applyForOpportunity('${opportunity.id}')">
                        Apply Now <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    getLocationName(location) {
        const locationMap = {
            mumbai: 'Mumbai',
            delhi: 'Delhi',
            pune: 'Pune',
            bangalore: 'Bangalore',
            remote: 'Remote'
        };
        return locationMap[location] || location;
    }
    
    getCategoryName(category) {
        const categoryMap = {
            education: 'Education',
            healthcare: 'Healthcare',
            'women-empowerment': 'Women Empowerment',
            'digital-literacy': 'Digital Literacy',
            environment: 'Environment',
            'disaster-relief': 'Disaster Relief'
        };
        return categoryMap[category] || category;
    }
    
    getUrgencyText(urgency) {
        const urgencyMap = {
            urgent: 'Urgent Need',
            high: 'High Priority',
            normal: 'Normal'
        };
        return urgencyMap[urgency] || urgency;
    }
    
    getTimeCommitmentText(timeCommitment) {
        const timeMap = {
            '1-2': '1-2 hours/week',
            '3-5': '3-5 hours/week',
            '6-10': '6-10 hours/week',
            '10+': '10+ hours/week',
            'one-time': 'One-time event'
        };
        return timeMap[timeCommitment] || timeCommitment;
    }
    
    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = this.filteredOpportunities.length;
        }
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const loadInfo = document.querySelector('.load-info');
        
        const totalShown = this.currentPage * this.itemsPerPage;
        const hasMore = totalShown < this.filteredOpportunities.length;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
        }
        
        if (loadInfo) {
            const actualShown = Math.min(totalShown, this.filteredOpportunities.length);
            loadInfo.textContent = `Showing ${actualShown} of ${this.filteredOpportunities.length} opportunities`;
        }
    }
    
    loadMore() {
        this.currentPage++;
        const opportunitiesList = document.getElementById('opportunities-list');
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const opportunitiesToShow = this.filteredOpportunities.slice(startIndex, endIndex);
        
        const newOpportunities = opportunitiesToShow.map(opportunity => 
            this.createOpportunityCard(opportunity)
        ).join('');
        
        opportunitiesList.innerHTML += newOpportunities;
        this.updateLoadMoreButton();
    }
    
    animateNumbers() {
        const numberElements = [
            { element: document.getElementById('total-opportunities'), target: 247 },
            { element: document.getElementById('volunteers-needed'), target: 1250 },
            { element: document.getElementById('locations-count'), target: 28 }
        ];
        
        numberElements.forEach(({ element, target }) => {
            if (element) {
                this.animateNumber(element, 0, target, 2000);
            }
        });
    }
    
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end;
            }
        };
        
        requestAnimationFrame(updateNumber);
    }
    
    clearAllFilters() {
        this.resetFilters();
        
        // Reset quick filters
        document.querySelectorAll('.quick-filter').forEach(f => f.classList.remove('active'));
        document.querySelector('.quick-filter[data-filter="all"]').classList.add('active');
        
        this.applyFilters();
    }
}

// Global functions for HTML onclick handlers
function searchOpportunities() {
    const searchInput = document.getElementById('opportunity-search');
    if (searchInput && window.volunteerOpportunities) {
        window.volunteerOpportunities.activeFilters.search = searchInput.value.toLowerCase();
        window.volunteerOpportunities.applyFilters();
    }
}

function sortOpportunities() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect && window.volunteerOpportunities) {
        window.volunteerOpportunities.sortBy = sortSelect.value;
        window.volunteerOpportunities.sortOpportunities();
        window.volunteerOpportunities.renderOpportunities();
    }
}

function clearAllFilters() {
    if (window.volunteerOpportunities) {
        window.volunteerOpportunities.clearAllFilters();
    }
}

function loadMoreOpportunities() {
    if (window.volunteerOpportunities) {
        window.volunteerOpportunities.loadMore();
    }
}

function applyForOpportunity(opportunityId) {
    // Show application modal
    showApplicationModal(opportunityId);
}

function showApplicationModal(opportunityId) {
    const opportunity = window.volunteerOpportunities.opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content application-modal">
            <div class="modal-header">
                <h3>Apply for Volunteer Opportunity</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="opportunity-summary">
                    <h4>${opportunity.title}</h4>
                    <p class="organization">${opportunity.organization} • ${window.volunteerOpportunities.getLocationName(opportunity.location)}</p>
                    <p class="description">${opportunity.description}</p>
                    
                    <div class="opportunity-highlights">
                        <div class="highlight-item">
                            <i class="fas fa-clock"></i>
                            <span>${window.volunteerOpportunities.getTimeCommitmentText(opportunity.timeCommitment)}</span>
                        </div>
                        <div class="highlight-item">
                            <i class="fas fa-calendar"></i>
                            <span>${opportunity.duration}</span>
                        </div>
                        <div class="highlight-item">
                            <i class="fas fa-heart"></i>
                            <span>Impact: ${opportunity.impact}</span>
                        </div>
                    </div>
                </div>
                
                <div class="application-form">
                    <h4>Application Details</h4>
                    
                    <div class="form-group">
                        <label for="motivation">Why are you interested in this opportunity? *</label>
                        <textarea id="motivation" rows="4" placeholder="Tell us about your motivation and how you can contribute..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="experience">Relevant Experience</label>
                        <textarea id="experience" rows="3" placeholder="Describe any relevant experience or skills..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="availability">Your Availability</label>
                        <select id="availability">
                            <option value="">Select your availability</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="weekends">Weekends</option>
                            <option value="flexible">Flexible</option>
                            <option value="specific">Specific days (mention in comments)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="start-date">Preferred Start Date</label>
                        <input type="date" id="start-date" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="form-group">
                        <label for="additional-comments">Additional Comments</label>
                        <textarea id="additional-comments" rows="2" placeholder="Any additional information you'd like to share..."></textarea>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="terms-agreement" required>
                            <span class="checkmark"></span>
                            I agree to the terms and conditions and commit to the volunteer responsibilities
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" onclick="submitApplication('${opportunityId}')">
                    Submit Application <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function submitApplication(opportunityId) {
    const motivation = document.getElementById('motivation').value;
    const experience = document.getElementById('experience').value;
    const availability = document.getElementById('availability').value;
    const startDate = document.getElementById('start-date').value;
    const comments = document.getElementById('additional-comments').value;
    const termsAgreed = document.getElementById('terms-agreement').checked;
    
    if (!motivation.trim()) {
        alert('Please provide your motivation for applying.');
        return;
    }
    
    if (!termsAgreed) {
        alert('Please agree to the terms and conditions.');
        return;
    }
    
    // Simulate application submission
    const applicationData = {
        opportunityId,
        motivation,
        experience,
        availability,
        startDate,
        comments,
        submittedAt: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, this would be sent to server)
    const existingApplications = JSON.parse(localStorage.getItem('volunteerApplications') || '[]');
    existingApplications.push(applicationData);
    localStorage.setItem('volunteerApplications', JSON.stringify(existingApplications));
    
    // Close modal
    document.querySelector('.modal-overlay').remove();
    
    // Show success message
    showSuccessMessage('Application submitted successfully! We will contact you within 2-3 business days.');
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

function createCustomRequest() {
    alert('Custom request feature coming soon! Please contact us directly for now.');
}

function contactUs() {
    alert('Contact us at volunteer@smilefoundation.org or call +91-11-43123700');
}

// Initialize opportunities when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.volunteerOpportunities = new VolunteerOpportunities();
    
    // Add modal and success message styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #2C3E50;
            font-family: var(--font-heading);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #6c757d;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f8f9fa;
            color: #2C3E50;
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .modal-footer {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            padding: 20px 25px;
            border-top: 1px solid #e9ecef;
            background: #f8f9fa;
            border-radius: 0 0 15px 15px;
        }
        
        .opportunity-summary {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid var(--opportunities-primary);
        }
        
        .opportunity-summary h4 {
            margin: 0 0 8px 0;
            color: var(--opportunities-dark);
            font-family: var(--font-heading);
        }
        
        .opportunity-summary .organization {
            margin: 0 0 10px 0;
            color: var(--opportunities-primary);
            font-weight: 600;
        }
        
        .opportunity-summary .description {
            margin: 0 0 15px 0;
            color: #6c757d;
        }
        
        .opportunity-highlights {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .highlight-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9rem;
            color: #6c757d;
        }
        
        .highlight-item i {
            color: var(--opportunities-primary);
        }
        
        .application-form h4 {
            margin: 0 0 20px 0;
            color: var(--opportunities-dark);
            font-family: var(--font-heading);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2C3E50;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--opportunities-primary);
            box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.1);
        }
        
        .checkbox-group {
            margin-top: 25px;
        }
        
        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            cursor: pointer;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .checkbox-label input[type="checkbox"] {
            display: none;
        }
        
        .checkbox-label .checkmark {
            width: 18px;
            height: 18px;
            border: 2px solid #e9ecef;
            border-radius: 4px;
            position: relative;
            transition: all 0.3s ease;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .checkbox-label input[type="checkbox"]:checked + .checkmark {
            background: var(--opportunities-primary);
            border-color: var(--opportunities-primary);
        }
        
        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        
        .btn-primary,
        .btn-secondary {
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            border: none;
        }
        
        .btn-primary {
            background: var(--opportunities-primary);
            color: white;
        }
        
        .btn-primary:hover {
            background: var(--opportunities-secondary);
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: #f8f9fa;
            color: #6c757d;
            border: 1px solid #e9ecef;
        }
        
        .btn-secondary:hover {
            background: #e9ecef;
            color: #495057;
        }
        
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .success-content {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        
        .success-content i {
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 20px;
                max-height: 95vh;
            }
            
            .modal-footer {
                flex-direction: column;
            }
            
            .opportunity-highlights {
                flex-direction: column;
                gap: 8px;
            }
            
            .success-message {
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for external use
window.VolunteerOpportunities = VolunteerOpportunities;