// Volunteer Dashboard JavaScript

class VolunteerDashboard {
    constructor() {
        this.volunteerData = {
            name: 'Priya',
            location: 'Maharashtra',
            level: 3,
            xp: 750,
            nextLevelXp: 1000,
            totalHours: 24,
            livesImpacted: 156,
            projectsCompleted: 8,
            badgesEarned: 12,
            rank: 47
        };
        
        this.init();
    }
    
    init() {
        this.loadVolunteerData();
        this.setupEventListeners();
        this.initializeCharts();
        this.startAnimations();
    }
    
    loadVolunteerData() {
        // Load data from localStorage or API
        const savedData = localStorage.getItem('volunteerData');
        if (savedData) {
            this.volunteerData = { ...this.volunteerData, ...JSON.parse(savedData) };
        }
        
        // Update UI with volunteer data
        this.updateDashboardData();
    }
    
    updateDashboardData() {
        // Update profile information
        document.getElementById('volunteer-name').textContent = this.volunteerData.name;
        document.getElementById('volunteer-location').textContent = this.volunteerData.location;
        document.getElementById('total-hours').textContent = this.volunteerData.totalHours;
        document.getElementById('lives-impacted').textContent = this.volunteerData.livesImpacted;
        document.getElementById('current-level').textContent = this.volunteerData.level;
        
        // Update progress information
        document.getElementById('current-xp').textContent = this.volunteerData.xp;
        document.getElementById('next-level-xp').textContent = this.volunteerData.nextLevelXp;
        
        // Update progress bar
        const progressPercentage = (this.volunteerData.xp / this.volunteerData.nextLevelXp) * 100;
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Update XP needed text
        const xpNeeded = this.volunteerData.nextLevelXp - this.volunteerData.xp;
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${xpNeeded} XP to Level ${this.volunteerData.level + 1}`;
        }
    }
    
    setupEventListeners() {
        // Impact period filter
        const impactPeriod = document.getElementById('impact-period');
        if (impactPeriod) {
            impactPeriod.addEventListener('change', (e) => {
                this.updateImpactData(e.target.value);
            });
        }
        
        // Quick action buttons
        document.querySelectorAll('.quick-action').forEach(action => {
            action.addEventListener('click', (e) => {
                const actionType = e.currentTarget.onclick?.toString().match(/(\w+)\(\)/)?.[1];
                if (actionType) {
                    this.handleQuickAction(actionType);
                }
            });
        });
    }
    
    initializeCharts() {
        // Simple chart implementation (you can replace with Chart.js or similar)
        const canvas = document.getElementById('impact-chart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.drawSimpleChart(ctx, canvas.width, canvas.height);
        }
    }
    
    drawSimpleChart(ctx, width, height) {
        // Sample data for monthly activity
        const data = [5, 8, 12, 15, 18, 24];
        const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        ctx.clearRect(0, 0, width, height);
        
        // Set up chart dimensions
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        const maxValue = Math.max(...data);
        
        // Draw axes
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw bars
        const barWidth = chartWidth / data.length * 0.6;
        const barSpacing = chartWidth / data.length;
        
        ctx.fillStyle = '#8CC63F';
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + (index * barSpacing) + (barSpacing - barWidth) / 2;
            const y = height - padding - barHeight;
            
            // Draw bar with rounded top
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
            ctx.fill();
            
            // Draw value on top of bar
            ctx.fillStyle = '#2C3E50';
            ctx.font = '12px Poppins';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth / 2, y - 5);
            
            // Draw month label
            ctx.fillText(months[index], x + barWidth / 2, height - padding + 15);
            
            ctx.fillStyle = '#8CC63F';
        });
    }
    
    startAnimations() {
        // Animate numbers on page load
        this.animateNumbers();
        
        // Start floating animations
        this.startFloatingAnimations();
    }
    
    animateNumbers() {
        const numberElements = [
            { element: document.getElementById('total-hours'), target: this.volunteerData.totalHours },
            { element: document.getElementById('lives-impacted'), target: this.volunteerData.livesImpacted },
            { element: document.getElementById('current-level'), target: this.volunteerData.level },
            { element: document.getElementById('current-xp'), target: this.volunteerData.xp }
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
    
    startFloatingAnimations() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + (index * 500));
        });
    }
    
    updateImpactData(period) {
        // Update impact statistics based on selected period
        const impactData = this.getImpactDataForPeriod(period);
        
        // Update the impact stats
        const statElements = document.querySelectorAll('.impact-stat .stat-number');
        statElements.forEach((element, index) => {
            if (impactData[index]) {
                this.animateNumber(element, 0, impactData[index], 1000);
            }
        });
        
        // Redraw chart with new data
        this.initializeCharts();
    }
    
    getImpactDataForPeriod(period) {
        const data = {
            month: [8, 45, 3, 4],
            quarter: [18, 98, 6, 8],
            year: [24, 156, 8, 12],
            all: [48, 312, 15, 25]
        };
        
        return data[period] || data.month;
    }
    
    handleQuickAction(actionType) {
        switch (actionType) {
            case 'findOpportunities':
                this.findOpportunities();
                break;
            case 'logHours':
                this.logHours();
                break;
            case 'joinTeam':
                this.joinTeam();
                break;
            case 'shareImpact':
                this.shareImpact();
                break;
            default:
                console.log('Unknown action:', actionType);
        }
    }
    
    findOpportunities() {
        // Redirect to opportunities page
        window.location.href = '/pages/volunteer-opportunities.html';
    }
    
    logHours() {
        // Show hours logging modal
        this.showHoursModal();
    }
    
    joinTeam() {
        // Show team joining interface
        this.showTeamModal();
    }
    
    shareImpact() {
        // Show social sharing options
        this.showShareModal();
    }
    
    showHoursModal() {
        const modal = this.createModal('Log Volunteer Hours', `
            <div class="hours-form">
                <div class="form-group">
                    <label for="activity-select">Activity</label>
                    <select id="activity-select">
                        <option value="">Select Activity</option>
                        <option value="teaching">Teaching Support</option>
                        <option value="health">Health Camp</option>
                        <option value="digital">Digital Literacy</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="hours-input">Hours Volunteered</label>
                    <input type="number" id="hours-input" min="0.5" max="24" step="0.5" placeholder="e.g., 2.5">
                </div>
                <div class="form-group">
                    <label for="date-input">Date</label>
                    <input type="date" id="date-input" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="description-input">Description (Optional)</label>
                    <textarea id="description-input" rows="3" placeholder="Describe your volunteer activity..."></textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn-primary" onclick="window.volunteerDashboard.submitHours()">Log Hours</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }
    
    showTeamModal() {
        const modal = this.createModal('Join a Team', `
            <div class="team-list">
                <div class="team-item">
                    <div class="team-info">
                        <h4>Education Champions</h4>
                        <p>Focused on improving education in Mumbai schools</p>
                        <div class="team-stats">
                            <span><i class="fas fa-users"></i> 24 members</span>
                            <span><i class="fas fa-clock"></i> 156 hours this month</span>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.volunteerDashboard.joinTeamAction('education')">Join Team</button>
                </div>
                <div class="team-item">
                    <div class="team-info">
                        <h4>Health Heroes</h4>
                        <p>Supporting healthcare initiatives across Maharashtra</p>
                        <div class="team-stats">
                            <span><i class="fas fa-users"></i> 18 members</span>
                            <span><i class="fas fa-clock"></i> 98 hours this month</span>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.volunteerDashboard.joinTeamAction('health')">Join Team</button>
                </div>
                <div class="team-item">
                    <div class="team-info">
                        <h4>Digital Innovators</h4>
                        <p>Teaching technology skills to underserved communities</p>
                        <div class="team-stats">
                            <span><i class="fas fa-users"></i> 12 members</span>
                            <span><i class="fas fa-clock"></i> 72 hours this month</span>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="window.volunteerDashboard.joinTeamAction('digital')">Join Team</button>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        `);
        
        document.body.appendChild(modal);
    }
    
    showShareModal() {
        const modal = this.createModal('Share Your Impact', `
            <div class="share-content">
                <div class="impact-summary">
                    <h4>Your Volunteer Journey</h4>
                    <div class="share-stats">
                        <div class="share-stat">
                            <span class="stat-number">${this.volunteerData.totalHours}</span>
                            <span class="stat-label">Hours Volunteered</span>
                        </div>
                        <div class="share-stat">
                            <span class="stat-number">${this.volunteerData.livesImpacted}</span>
                            <span class="stat-label">Lives Impacted</span>
                        </div>
                        <div class="share-stat">
                            <span class="stat-number">${this.volunteerData.projectsCompleted}</span>
                            <span class="stat-label">Projects Completed</span>
                        </div>
                    </div>
                    <p class="share-message">
                        "I've volunteered ${this.volunteerData.totalHours} hours with @SmileFoundation and helped impact ${this.volunteerData.livesImpacted} lives! Join me in making a difference. #VolunteerWithSmile #MakeADifference"
                    </p>
                </div>
                <div class="share-buttons">
                    <button class="share-btn facebook" onclick="window.volunteerDashboard.shareOn('facebook')">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button class="share-btn twitter" onclick="window.volunteerDashboard.shareOn('twitter')">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="share-btn linkedin" onclick="window.volunteerDashboard.shareOn('linkedin')">
                        <i class="fab fa-linkedin-in"></i> LinkedIn
                    </button>
                    <button class="share-btn whatsapp" onclick="window.volunteerDashboard.shareOn('whatsapp')">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        `);
        
        document.body.appendChild(modal);
    }
    
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        return modal;
    }
    
    submitHours() {
        const activity = document.getElementById('activity-select').value;
        const hours = parseFloat(document.getElementById('hours-input').value);
        const date = document.getElementById('date-input').value;
        const description = document.getElementById('description-input').value;
        
        if (!activity || !hours || !date) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Update volunteer data
        this.volunteerData.totalHours += hours;
        this.volunteerData.xp += Math.floor(hours * 10); // 10 XP per hour
        this.volunteerData.livesImpacted += Math.floor(hours * 2); // Estimate 2 lives per hour
        
        // Save to localStorage
        localStorage.setItem('volunteerData', JSON.stringify(this.volunteerData));
        
        // Update UI
        this.updateDashboardData();
        
        // Close modal
        document.querySelector('.modal-overlay').remove();
        
        // Show success message
        this.showSuccessMessage(`Successfully logged ${hours} hours! You earned ${Math.floor(hours * 10)} XP.`);
    }
    
    joinTeamAction(teamType) {
        // Simulate joining a team
        this.showSuccessMessage(`Successfully joined the ${teamType} team! You'll receive updates about team activities.`);
        document.querySelector('.modal-overlay').remove();
    }
    
    shareOn(platform) {
        const message = `I've volunteered ${this.volunteerData.totalHours} hours with Smile Foundation and helped impact ${this.volunteerData.livesImpacted} lives! Join me in making a difference.`;
        const url = window.location.origin;
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}&hashtags=VolunteerWithSmile,MakeADifference`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(message)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }
    
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
function findOpportunities() {
    window.location.href = '/pages/volunteer-opportunities.html';
}

function viewProfile() {
    alert('Profile editing feature coming soon!');
}

function viewAllAchievements() {
    alert('Full achievements page coming soon!');
}

function viewActivity(activityId) {
    alert(`Viewing activity: ${activityId}`);
}

function viewAllActivities() {
    alert('Full activities page coming soon!');
}

function updateImpactData() {
    const period = document.getElementById('impact-period').value;
    window.volunteerDashboard.updateImpactData(period);
}

function viewFullLeaderboard() {
    alert('Full leaderboard page coming soon!');
}

function joinEvent(eventId) {
    alert(`Joining event: ${eventId}`);
}

function viewAllEvents() {
    alert('Full events page coming soon!');
}

function logHours() {
    window.volunteerDashboard.logHours();
}

function joinTeam() {
    window.volunteerDashboard.joinTeam();
}

function shareImpact() {
    window.volunteerDashboard.shareImpact();
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.volunteerDashboard = new VolunteerDashboard();
    
    // Add modal styles
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
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
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
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #8CC63F;
            box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.1);
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        
        .team-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .team-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .team-item:hover {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .team-info h4 {
            margin: 0 0 5px 0;
            color: #2C3E50;
        }
        
        .team-info p {
            margin: 0 0 8px 0;
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .team-stats {
            display: flex;
            gap: 15px;
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .team-stats span {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .share-content {
            text-align: center;
        }
        
        .impact-summary {
            margin-bottom: 25px;
        }
        
        .share-stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .share-stat {
            text-align: center;
        }
        
        .share-stat .stat-number {
            display: block;
            font-size: 1.5rem;
            font-weight: 700;
            color: #8CC63F;
            font-family: var(--font-heading);
        }
        
        .share-stat .stat-label {
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .share-message {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            font-style: italic;
            color: #2C3E50;
            border-left: 4px solid #2196F3;
        }
        
        .share-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .share-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .share-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .share-btn.facebook { background: #1877F2; }
        .share-btn.twitter { background: #1DA1F2; }
        .share-btn.linkedin { background: #0A66C2; }
        .share-btn.whatsapp { background: #25D366; }
        
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
        }
        
        .success-content {
            display: flex;
            align-items: center;
            gap: 10px;
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
            }
            
            .modal-actions {
                flex-direction: column;
            }
            
            .team-item {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }
            
            .share-buttons {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for external use
window.VolunteerDashboard = VolunteerDashboard;