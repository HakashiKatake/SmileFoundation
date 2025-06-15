class VolunteerOpportunities {
    constructor() {
        this.opportunities = [];
        this.filteredOpportunities = [];
        this.activeFilters = { search: '' };
        
        this.init();
    }
    
    init() {
        this.generateOpportunities();
        this.setupEventListeners();
        this.renderOpportunities();
    }
    
    generateOpportunities() {
      
        const categories = ['education', 'healthcare', 'women-empowerment', 'digital-literacy'];
        const locations = ['mumbai', 'delhi', 'remote'];
        
      
        const templates = [
            {
                title: 'Mathematics Tutor',
                description: 'Help students improve their mathematics skills through tutoring sessions.',
                impact: '50+ students',
                duration: 'Ongoing'
            },
            {
                title: 'Health Awareness',
                description: 'Conduct health awareness sessions in urban communities.',
                impact: '200+ families',
                duration: '3 months'
            }
        ];
        
        
        for (let i = 0; i < 20; i++) {
            const template = templates[i % templates.length];
            this.opportunities.push({
                id: `opp-${i + 1}`,
                title: template.title + (i > 1 ? ` - ${i}` : ''),
                description: template.description,
                location: locations[i % locations.length],
                category: categories[i % categories.length],
                impact: template.impact,
                duration: template.duration
            });
        }
        
        this.filteredOpportunities = [...this.opportunities];
    }
    
    setupEventListeners() {
 
        const searchInput = document.getElementById('opportunity-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }
        
    
        document.querySelectorAll('.quick-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleQuickFilter(e.target.dataset.filter);
            });
        });
    }
    
    handleQuickFilter(filterValue) {
 
        document.getElementById('opportunity-search').value = '';
        this.activeFilters.search = '';
        
        
        if (filterValue && filterValue !== 'all') {
            this.filteredOpportunities = this.opportunities.filter(opp => 
                opp.category === filterValue || opp.location === filterValue
            );
        } else {
            this.filteredOpportunities = [...this.opportunities];
        }
        
        this.renderOpportunities();
    }
    
    applyFilters() {
        if (this.activeFilters.search) {
            this.filteredOpportunities = this.opportunities.filter(opp => {
                const searchText = `${opp.title} ${opp.description}`.toLowerCase();
                return searchText.includes(this.activeFilters.search);
            });
        } else {
            this.filteredOpportunities = [...this.opportunities];
        }
        
        this.renderOpportunities();
    }
    
    renderOpportunities() {
        const list = document.getElementById('opportunities-list');
        if (!list) return;
        
      
        const count = document.getElementById('results-count');
        if (count) count.textContent = this.filteredOpportunities.length;
        
     
        list.innerHTML = this.filteredOpportunities.map(opp => `
            <div class="opportunity-card" data-id="${opp.id}">
                <div class="card-content">
                    <h4>${opp.title}</h4>
                    <p>${opp.description}</p>
                    <div class="opportunity-details">
                        <span>${this.getDisplayName('location', opp.location)}</span>
                        <span>${opp.duration}</span>
                    </div>
                    <div class="impact-info">Impact: ${opp.impact}</div>
                </div>
                <button onclick="applyForOpportunity('${opp.id}')">Apply</button>
            </div>
        `).join('');
    }
    
    getDisplayName(type, value) {
        const locationMap = {
            'mumbai': 'Mumbai',
            'delhi': 'Delhi',
            'remote': 'Remote'
        };
        
        return locationMap[value] || value;
    }
}


function applyForOpportunity(id) {
    const opp = window.volunteerOpportunities.opportunities.find(o => o.id === id);
    if (!opp) return;
    
    alert(`You're applying for: ${opp.title}\nPlease contact volunteer@smilefoundation.org to complete your application.`);
}

function clearAllFilters() {
    document.getElementById('opportunity-search').value = '';
    window.volunteerOpportunities.handleQuickFilter('all');
}


document.addEventListener('DOMContentLoaded', function() {
    window.volunteerOpportunities = new VolunteerOpportunities();
});