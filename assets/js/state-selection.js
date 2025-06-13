// Interactive State Selection for Volunteer Registration

class StateSelection {
    constructor() {
        this.states = [
            {
                name: 'Andhra Pradesh',
                code: 'AP',
                volunteers: 2847,
                projects: 45,
                impact: '1.2L+ lives',
                color: '#FF6B6B',
                description: 'Focus on education and healthcare in rural communities'
            },
            {
                name: 'Assam',
                code: 'AS',
                volunteers: 1523,
                projects: 28,
                impact: '85K+ lives',
                color: '#4ECDC4',
                description: 'Disaster response and livelihood programs'
            },
            {
                name: 'Bihar',
                code: 'BR',
                volunteers: 3456,
                projects: 67,
                impact: '2.1L+ lives',
                color: '#45B7D1',
                description: 'Education and women empowerment initiatives'
            },
            {
                name: 'Chhattisgarh',
                code: 'CG',
                volunteers: 1876,
                projects: 34,
                impact: '95K+ lives',
                color: '#96CEB4',
                description: 'Tribal welfare and healthcare programs'
            },
            {
                name: 'Delhi',
                code: 'DL',
                volunteers: 4521,
                projects: 89,
                impact: '3.2L+ lives',
                color: '#FFEAA7',
                description: 'Urban slum development and education'
            },
            {
                name: 'Gujarat',
                code: 'GJ',
                volunteers: 2934,
                projects: 52,
                impact: '1.8L+ lives',
                color: '#DDA0DD',
                description: 'Livelihood and disaster preparedness'
            },
            {
                name: 'Haryana',
                code: 'HR',
                volunteers: 2156,
                projects: 41,
                impact: '1.3L+ lives',
                color: '#98D8C8',
                description: 'Rural education and skill development'
            },
            {
                name: 'Himachal Pradesh',
                code: 'HP',
                volunteers: 987,
                projects: 19,
                impact: '45K+ lives',
                color: '#F7DC6F',
                description: 'Mountain community development'
            },
            {
                name: 'Jharkhand',
                code: 'JH',
                volunteers: 2234,
                projects: 43,
                impact: '1.4L+ lives',
                color: '#BB8FCE',
                description: 'Tribal education and healthcare'
            },
            {
                name: 'Karnataka',
                code: 'KA',
                volunteers: 3789,
                projects: 71,
                impact: '2.5L+ lives',
                color: '#85C1E9',
                description: 'Technology-enabled education programs'
            },
            {
                name: 'Kerala',
                code: 'KL',
                volunteers: 2567,
                projects: 48,
                impact: '1.6L+ lives',
                color: '#82E0AA',
                description: 'Healthcare and disaster response'
            },
            {
                name: 'Madhya Pradesh',
                code: 'MP',
                volunteers: 4123,
                projects: 78,
                impact: '2.8L+ lives',
                color: '#F8C471',
                description: 'Rural development and education'
            },
            {
                name: 'Maharashtra',
                code: 'MH',
                volunteers: 5234,
                projects: 95,
                impact: '3.8L+ lives',
                color: '#F1948A',
                description: 'Urban and rural community programs'
            },
            {
                name: 'Odisha',
                code: 'OR',
                volunteers: 2876,
                projects: 54,
                impact: '1.9L+ lives',
                color: '#AED6F1',
                description: 'Coastal community development'
            },
            {
                name: 'Punjab',
                code: 'PB',
                volunteers: 1987,
                projects: 37,
                impact: '1.1L+ lives',
                color: '#A9DFBF',
                description: 'Agricultural community support'
            },
            {
                name: 'Rajasthan',
                code: 'RJ',
                volunteers: 3654,
                projects: 69,
                impact: '2.4L+ lives',
                color: '#D7BDE2',
                description: 'Desert community welfare programs'
            },
            {
                name: 'Tamil Nadu',
                code: 'TN',
                volunteers: 4321,
                projects: 82,
                impact: '3.1L+ lives',
                color: '#F9E79F',
                description: 'Education and healthcare excellence'
            },
            {
                name: 'Telangana',
                code: 'TS',
                volunteers: 2765,
                projects: 51,
                impact: '1.7L+ lives',
                color: '#85C1E9',
                description: 'Technology and innovation programs'
            },
            {
                name: 'Uttar Pradesh',
                code: 'UP',
                volunteers: 6789,
                projects: 124,
                impact: '4.5L+ lives',
                color: '#F5B7B1',
                description: 'Large-scale education and health initiatives'
            },
            {
                name: 'West Bengal',
                code: 'WB',
                volunteers: 4567,
                projects: 87,
                impact: '3.3L+ lives',
                color: '#A3E4D7',
                description: 'Cultural preservation and education'
            }
        ];
        
        this.selectedState = null;
        this.init();
    }
    
    init() {
        this.createStateSelectionUI();
        this.setupEventListeners();
    }
    
    createStateSelectionUI() {
        const container = document.getElementById('state-selection-container');
        if (!container) return;
        
        const stateSelectionHTML = `
            <div class="state-selection-wrapper">
                <!-- Search and Filter -->
                <div class="state-search-section">
                    <div class="search-container">
                        <input type="text" id="state-search" placeholder="Search states..." class="state-search-input">
                        <i class="fas fa-search search-icon"></i>
                    </div>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">All States</button>
                        <button class="filter-btn" data-filter="high-impact">High Impact</button>
                        <button class="filter-btn" data-filter="new-programs">New Programs</button>
                    </div>
                </div>
                
                <!-- Interactive Map Preview -->
                <div class="map-preview">
                    <div class="map-container">
                        <div class="india-map">
                            <svg viewBox="0 0 800 600" class="map-svg">
                                <!-- Simplified India map outline -->
                                <path d="M200,100 L600,100 L650,200 L600,500 L200,500 L150,200 Z" 
                                      fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" class="map-outline"/>
                                <!-- State markers will be added dynamically -->
                            </svg>
                        </div>
                        <div class="map-legend">
                            <h4>Impact Zones</h4>
                            <div class="legend-items">
                                <div class="legend-item">
                                    <div class="legend-color high-impact"></div>
                                    <span>High Impact (3L+ lives)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color medium-impact"></div>
                                    <span>Medium Impact (1-3L lives)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color low-impact"></div>
                                    <span>Growing Impact (<1L lives)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- States Grid -->
                <div class="states-grid" id="states-grid">
                    ${this.generateStatesHTML()}
                </div>
                
                <!-- Selected State Info -->
                <div class="selected-state-info" id="selected-state-info" style="display: none;">
                    <div class="state-info-content">
                        <div class="state-header">
                            <h3 id="selected-state-name">State Name</h3>
                            <div class="state-badge" id="selected-state-badge">Selected</div>
                        </div>
                        <div class="state-stats">
                            <div class="stat-item">
                                <div class="stat-icon"><i class="fas fa-users"></i></div>
                                <div class="stat-content">
                                    <span class="stat-number" id="selected-volunteers">0</span>
                                    <span class="stat-label">Active Volunteers</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-icon"><i class="fas fa-project-diagram"></i></div>
                                <div class="stat-content">
                                    <span class="stat-number" id="selected-projects">0</span>
                                    <span class="stat-label">Ongoing Projects</span>
                                </div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-icon"><i class="fas fa-heart"></i></div>
                                <div class="stat-content">
                                    <span class="stat-number" id="selected-impact">0</span>
                                    <span class="stat-label">Lives Impacted</span>
                                </div>
                            </div>
                        </div>
                        <div class="state-description">
                            <p id="selected-description">State description</p>
                        </div>
                        <div class="state-opportunities">
                            <h4>Current Opportunities</h4>
                            <div class="opportunities-list" id="opportunities-list">
                                <!-- Will be populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = stateSelectionHTML;
    }
    
    generateStatesHTML() {
        return this.states.map(state => {
            const impactLevel = this.getImpactLevel(state.impact);
            return `
                <div class="state-card" data-state="${state.code}" data-impact="${impactLevel}">
                    <div class="state-card-header">
                        <div class="state-color" style="background: ${state.color}"></div>
                        <div class="state-name">
                            <h4>${state.name}</h4>
                            <span class="state-code">${state.code}</span>
                        </div>
                        <div class="state-impact-badge ${impactLevel}">${state.impact}</div>
                    </div>
                    <div class="state-card-body">
                        <div class="state-stats-mini">
                            <div class="mini-stat">
                                <i class="fas fa-users"></i>
                                <span>${state.volunteers.toLocaleString()}</span>
                            </div>
                            <div class="mini-stat">
                                <i class="fas fa-project-diagram"></i>
                                <span>${state.projects}</span>
                            </div>
                        </div>
                        <p class="state-description-mini">${state.description}</p>
                    </div>
                    <div class="state-card-footer">
                        <button class="select-state-btn">
                            <i class="fas fa-map-marker-alt"></i>
                            Choose This State
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getImpactLevel(impact) {
        const number = parseFloat(impact.replace(/[^\d.]/g, ''));
        if (number >= 3) return 'high-impact';
        if (number >= 1) return 'medium-impact';
        return 'low-impact';
    }
    
    setupEventListeners() {
        // State card selection
        document.addEventListener('click', (e) => {
            // Handle state card selection (but not if clicking the button)
            if (e.target.closest('.state-card') && !e.target.closest('.select-state-btn')) {
                const stateCard = e.target.closest('.state-card');
                this.selectState(stateCard);
            }
            
            // Handle "Choose This State" button click
            if (e.target.closest('.select-state-btn')) {
                e.preventDefault();
                const stateCard = e.target.closest('.state-card');
                this.confirmStateSelection(stateCard);
            }
        });
        
        // Search functionality
        const searchInput = document.getElementById('state-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterStates(e.target.value);
            });
        }
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.filterByCategory(e.target.dataset.filter);
            });
        });
    }
    
    selectState(stateCard) {
        // Remove previous selection
        document.querySelectorAll('.state-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Select current state
        stateCard.classList.add('selected');
        
        const stateCode = stateCard.dataset.state;
        const stateData = this.states.find(s => s.code === stateCode);
        
        if (stateData) {
            // Update the selected state
            this.selectedState = stateData;
            
            // Update the registration form
            if (window.volunteerRegistration) {
                window.volunteerRegistration.selectedState = stateData;
                console.log('State selected:', stateData.name);
            }
            
            this.showStateInfo(stateData);
        }
    }
    
    confirmStateSelection(stateCard) {
        const stateCode = stateCard.dataset.state;
        const stateData = this.states.find(s => s.code === stateCode);
        
        if (stateData) {
            this.selectedState = stateData;
            
            // Update the registration form
            if (window.volunteerRegistration) {
                window.volunteerRegistration.selectedState = stateData;
            }
            
            // Show confirmation
            this.showSelectionConfirmation(stateData);
        }
    }
    
    showStateInfo(stateData) {
        const infoContainer = document.getElementById('selected-state-info');
        if (!infoContainer) return;
        
        // Update state info
        document.getElementById('selected-state-name').textContent = stateData.name;
        document.getElementById('selected-volunteers').textContent = stateData.volunteers.toLocaleString();
        document.getElementById('selected-projects').textContent = stateData.projects;
        document.getElementById('selected-impact').textContent = stateData.impact;
        document.getElementById('selected-description').textContent = stateData.description;
        
        // Generate opportunities
        this.generateOpportunities(stateData);
        
        // Show the info container
        infoContainer.style.display = 'block';
        infoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    generateOpportunities(stateData) {
        const opportunitiesList = document.getElementById('opportunities-list');
        if (!opportunitiesList) return;
        
        const opportunities = this.getOpportunitiesForState(stateData);
        
        opportunitiesList.innerHTML = opportunities.map(opp => `
            <div class="opportunity-item">
                <div class="opportunity-icon">
                    <i class="${opp.icon}"></i>
                </div>
                <div class="opportunity-content">
                    <h5>${opp.title}</h5>
                    <p>${opp.description}</p>
                    <div class="opportunity-meta">
                        <span class="urgency ${opp.urgency}">${opp.urgencyText}</span>
                        <span class="time-commitment">${opp.timeCommitment}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    getOpportunitiesForState(stateData) {
        // Generate relevant opportunities based on state characteristics
        const baseOpportunities = [
            {
                title: 'Education Support',
                description: 'Help children with homework and basic learning',
                icon: 'fas fa-graduation-cap',
                urgency: 'high',
                urgencyText: 'High Priority',
                timeCommitment: '4-6 hrs/week'
            },
            {
                title: 'Healthcare Assistance',
                description: 'Support medical camps and health awareness',
                icon: 'fas fa-heartbeat',
                urgency: 'medium',
                urgencyText: 'Medium Priority',
                timeCommitment: '6-8 hrs/week'
            },
            {
                title: 'Digital Literacy',
                description: 'Teach basic computer skills to communities',
                icon: 'fas fa-laptop',
                urgency: 'medium',
                urgencyText: 'Growing Need',
                timeCommitment: '3-5 hrs/week'
            }
        ];
        
        // Add state-specific opportunities
        if (stateData.name === 'Delhi') {
            baseOpportunities.push({
                title: 'Urban Slum Outreach',
                description: 'Community development in urban slums',
                icon: 'fas fa-city',
                urgency: 'high',
                urgencyText: 'Urgent Need',
                timeCommitment: '5-7 hrs/week'
            });
        }
        
        return baseOpportunities.slice(0, 3); // Return top 3 opportunities
    }
    
    showSelectionConfirmation(stateData) {
        // Create confirmation modal
        const modal = document.createElement('div');
        modal.className = 'selection-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="confirmation-header">
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Great Choice!</h3>
                    <p>You've selected <strong>${stateData.name}</strong> as your impact zone</p>
                </div>
                <div class="confirmation-body">
                    <div class="selected-state-preview">
                        <div class="state-color" style="background: ${stateData.color}"></div>
                        <div class="state-details">
                            <h4>${stateData.name}</h4>
                            <p>${stateData.description}</p>
                            <div class="quick-stats">
                                <span><i class="fas fa-users"></i> ${stateData.volunteers.toLocaleString()} volunteers</span>
                                <span><i class="fas fa-heart"></i> ${stateData.impact} impacted</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="confirmation-actions">
                    <button class="btn-confirm" onclick="this.closest('.selection-confirmation-modal').remove()">
                        Perfect! Continue <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn-change" onclick="this.closest('.selection-confirmation-modal').remove()">
                        Change Selection
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }
    
    filterStates(searchTerm) {
        const stateCards = document.querySelectorAll('.state-card');
        const term = searchTerm.toLowerCase();
        
        stateCards.forEach(card => {
            const stateName = card.querySelector('.state-name h4').textContent.toLowerCase();
            const stateCode = card.querySelector('.state-code').textContent.toLowerCase();
            
            if (stateName.includes(term) || stateCode.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    filterByCategory(category) {
        const stateCards = document.querySelectorAll('.state-card');
        
        stateCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else if (category === 'high-impact') {
                const impactLevel = card.dataset.impact;
                card.style.display = impactLevel === 'high-impact' ? 'block' : 'none';
            } else if (category === 'new-programs') {
                // Show states with newer or growing programs
                const impactLevel = card.dataset.impact;
                card.style.display = impactLevel === 'low-impact' ? 'block' : 'none';
            }
        });
    }
}

// Initialize state selection when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the registration page and on step 2
    const stateContainer = document.getElementById('state-selection-container');
    if (stateContainer) {
        // Wait a bit to ensure volunteer registration is initialized
        setTimeout(() => {
            window.stateSelection = new StateSelection();
            console.log('State selection initialized');
        }, 100);
        
        // Add CSS for state selection
        const style = document.createElement('style');
        style.textContent = `
            .state-selection-wrapper {
                max-width: 100%;
            }
            
            .state-search-section {
                margin-bottom: 30px;
                text-align: center;
            }
            
            .search-container {
                position: relative;
                max-width: 400px;
                margin: 0 auto 20px;
            }
            
            .state-search-input {
                width: 100%;
                padding: 12px 45px 12px 15px;
                border: 2px solid #e9ecef;
                border-radius: 25px;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .state-search-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.1);
            }
            
            .search-icon {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #6c757d;
            }
            
            .filter-buttons {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .filter-btn {
                padding: 8px 20px;
                border: 2px solid #e9ecef;
                background: white;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .filter-btn.active,
            .filter-btn:hover {
                border-color: var(--primary-color);
                background: var(--primary-color);
                color: white;
            }
            
            .map-preview {
                background: white;
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
                border: 2px solid #e9ecef;
            }
            
            .map-container {
                display: grid;
                grid-template-columns: 1fr 250px;
                gap: 20px;
                align-items: start;
            }
            
            .india-map {
                background: #f8f9fa;
                border-radius: 10px;
                padding: 20px;
            }
            
            .map-svg {
                width: 100%;
                height: 200px;
            }
            
            .map-legend h4 {
                margin-bottom: 15px;
                color: var(--dark-gray);
                font-family: var(--font-heading);
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                font-size: 0.9rem;
            }
            
            .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            
            .legend-color.high-impact { background: #dc3545; }
            .legend-color.medium-impact { background: #ffc107; }
            .legend-color.low-impact { background: #28a745; }
            
            .states-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .state-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 15px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .state-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(140, 198, 63, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .state-card:hover::before {
                left: 100%;
            }
            
            .state-card:hover {
                border-color: var(--primary-color);
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(140, 198, 63, 0.2);
            }
            
            .state-card.selected {
                border-color: var(--primary-color);
                background: rgba(140, 198, 63, 0.05);
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(140, 198, 63, 0.3);
            }
            
            .state-card-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 15px;
            }
            
            .state-color {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                flex-shrink: 0;
            }
            
            .state-name {
                flex: 1;
            }
            
            .state-name h4 {
                margin: 0;
                font-family: var(--font-heading);
                color: var(--dark-gray);
                font-size: 1.1rem;
            }
            
            .state-code {
                font-size: 0.8rem;
                color: #6c757d;
                font-weight: 600;
            }
            
            .state-impact-badge {
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .state-impact-badge.high-impact {
                background: #dc3545;
                color: white;
            }
            
            .state-impact-badge.medium-impact {
                background: #ffc107;
                color: #212529;
            }
            
            .state-impact-badge.low-impact {
                background: #28a745;
                color: white;
            }
            
            .state-stats-mini {
                display: flex;
                gap: 15px;
                margin-bottom: 10px;
            }
            
            .mini-stat {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 0.9rem;
                color: #6c757d;
            }
            
            .mini-stat i {
                color: var(--primary-color);
            }
            
            .state-description-mini {
                font-size: 0.9rem;
                color: #6c757d;
                line-height: 1.4;
                margin-bottom: 15px;
            }
            
            .select-state-btn {
                width: 100%;
                padding: 10px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .select-state-btn:hover {
                background: #7ab52e;
                transform: translateY(-2px);
            }
            
            .selected-state-info {
                background: white;
                border: 2px solid var(--primary-color);
                border-radius: 15px;
                padding: 25px;
                margin-top: 20px;
                animation: slideInUp 0.5s ease;
            }
            
            .state-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .state-header h3 {
                margin: 0;
                font-family: var(--font-heading);
                color: var(--dark-gray);
                font-size: 1.8rem;
            }
            
            .state-badge {
                background: var(--primary-color);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.9rem;
                font-weight: 600;
            }
            
            .state-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 12px;
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
            }
            
            .stat-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            
            .stat-content {
                display: flex;
                flex-direction: column;
            }
            
            .stat-number {
                font-family: var(--font-heading);
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--dark-gray);
            }
            
            .stat-label {
                font-size: 0.8rem;
                color: #6c757d;
            }
            
            .state-description {
                margin-bottom: 25px;
            }
            
            .state-description p {
                font-size: 1.1rem;
                color: #6c757d;
                line-height: 1.6;
            }
            
            .state-opportunities h4 {
                margin-bottom: 15px;
                font-family: var(--font-heading);
                color: var(--dark-gray);
            }
            
            .opportunity-item {
                display: flex;
                gap: 15px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 10px;
                margin-bottom: 10px;
                border-left: 4px solid var(--primary-color);
            }
            
            .opportunity-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                flex-shrink: 0;
            }
            
            .opportunity-content h5 {
                margin: 0 0 5px 0;
                font-family: var(--font-heading);
                color: var(--dark-gray);
            }
            
            .opportunity-content p {
                margin: 0 0 8px 0;
                font-size: 0.9rem;
                color: #6c757d;
                line-height: 1.4;
            }
            
            .opportunity-meta {
                display: flex;
                gap: 15px;
                font-size: 0.8rem;
            }
            
            .urgency {
                padding: 2px 8px;
                border-radius: 10px;
                font-weight: 600;
            }
            
            .urgency.high {
                background: #dc3545;
                color: white;
            }
            
            .urgency.medium {
                background: #ffc107;
                color: #212529;
            }
            
            .time-commitment {
                color: #6c757d;
                font-weight: 600;
            }
            
            .selection-confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease;
            }
            
            .confirmation-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .confirmation-header .success-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #28a745;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 15px;
                color: white;
                font-size: 1.5rem;
            }
            
            .confirmation-header h3 {
                margin: 0 0 10px 0;
                font-family: var(--font-heading);
                color: var(--dark-gray);
            }
            
            .selected-state-preview {
                display: flex;
                gap: 15px;
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .selected-state-preview .state-color {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                flex-shrink: 0;
            }
            
            .state-details h4 {
                margin: 0 0 8px 0;
                font-family: var(--font-heading);
                color: var(--dark-gray);
            }
            
            .state-details p {
                margin: 0 0 10px 0;
                font-size: 0.9rem;
                color: #6c757d;
            }
            
            .quick-stats {
                display: flex;
                gap: 15px;
                font-size: 0.8rem;
                color: #6c757d;
            }
            
            .quick-stats i {
                color: var(--primary-color);
            }
            
            .confirmation-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .btn-confirm,
            .btn-change {
                padding: 10px 20px;
                border: none;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .btn-confirm {
                background: var(--primary-color);
                color: white;
            }
            
            .btn-confirm:hover {
                background: #7ab52e;
                transform: translateY(-2px);
            }
            
            .btn-change {
                background: #f8f9fa;
                color: var(--dark-gray);
                border: 2px solid #dee2e6;
            }
            
            .btn-change:hover {
                background: #e9ecef;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
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
            
            @media (max-width: 768px) {
                .map-container {
                    grid-template-columns: 1fr;
                }
                
                .states-grid {
                    grid-template-columns: 1fr;
                }
                
                .state-stats {
                    grid-template-columns: 1fr;
                }
                
                .filter-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .confirmation-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Export for external use
window.StateSelection = StateSelection;