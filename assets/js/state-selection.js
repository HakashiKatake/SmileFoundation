
document.addEventListener('DOMContentLoaded', function() {
    
    const stateContainer = document.getElementById('state-selection-container');
    if (stateContainer) {
        setTimeout(() => {
            initStateSelection();
        }, 100);
    }
});


const states = [
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
        name: 'Delhi',
        code: 'DL',
        volunteers: 4521,
        projects: 89,
        impact: '3.2L+ lives',
        color: '#FFEAA7',
        description: 'Urban slum development and education'
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
        name: 'Maharashtra',
        code: 'MH',
        volunteers: 5234,
        projects: 95,
        impact: '3.8L+ lives',
        color: '#F1948A',
        description: 'Urban and rural community programs'
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
        name: 'Uttar Pradesh',
        code: 'UP',
        volunteers: 6789,
        projects: 124,
        impact: '4.5L+ lives',
        color: '#F5B7B1',
        description: 'Large-scale education and health initiatives'
    }
];


let selectedState = null;


function initStateSelection() {
    createStateSelectionUI();
    setupEventListeners();
    window.stateSelection = { states, selectedState };
}


function createStateSelectionUI() {
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
                </div>
            </div>
            
            <!-- States Grid -->
            <div class="states-grid" id="states-grid">
                ${generateStatesHTML()}
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
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = stateSelectionHTML;
}


function generateStatesHTML() {
    return states.map(state => {
        const impactLevel = getImpactLevel(state.impact);
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


function getImpactLevel(impact) {
    const number = parseFloat(impact.replace(/[^\d.]/g, ''));
    if (number >= 3) return 'high-impact';
    if (number >= 1) return 'medium-impact';
    return 'low-impact';
}


function setupEventListeners() {
 
    document.addEventListener('click', (e) => {
        if (e.target.closest('.state-card')) {
            const stateCard = e.target.closest('.state-card');
            selectState(stateCard);
        }
    });
    
   
    const searchInput = document.getElementById('state-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterStates(e.target.value);
        });
    }
    
  
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setActiveFilter(e.target);
            filterByCategory(e.target.dataset.filter);
        });
    });
}


function selectState(stateCard) {
    
    document.querySelectorAll('.state-card').forEach(card => {
        card.classList.remove('selected');
    });
    
   
    stateCard.classList.add('selected');
    
    const stateCode = stateCard.dataset.state;
    const stateData = states.find(s => s.code === stateCode);
    
    if (stateData) {
        selectedState = stateData;
        
        
        if (window.volunteerRegistration) {
            window.volunteerRegistration.selectedState = stateData;
        }
        
        showStateInfo(stateData);
    }
}


function showStateInfo(stateData) {
    const infoContainer = document.getElementById('selected-state-info');
    if (!infoContainer) return;
    
    document.getElementById('selected-state-name').textContent = stateData.name;
    document.getElementById('selected-volunteers').textContent = stateData.volunteers.toLocaleString();
    document.getElementById('selected-projects').textContent = stateData.projects;
    document.getElementById('selected-impact').textContent = stateData.impact;
    document.getElementById('selected-description').textContent = stateData.description;
    
    infoContainer.style.display = 'block';
    infoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


function filterStates(searchTerm) {
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

 
function setActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function filterByCategory(category) {
    const stateCards = document.querySelectorAll('.state-card');
    
    stateCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (category === 'high-impact') {
            const impactLevel = card.dataset.impact;
            card.style.display = impactLevel === 'high-impact' ? 'block' : 'none';
        }
    });
}