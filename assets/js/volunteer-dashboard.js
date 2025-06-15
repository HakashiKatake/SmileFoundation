
document.addEventListener('DOMContentLoaded', function() {

    const volunteerData = {
        name: 'Priya',
        location: 'Maharashtra',
        level: 3,
        xp: 750,
        nextLevelXp: 1000,
        totalHours: 24,
        livesImpacted: 156,
        projectsCompleted: 8
    };
    

    const savedData = localStorage.getItem('volunteerData');
    if (savedData) {
        Object.assign(volunteerData, JSON.parse(savedData));
    }
    
    
    function updateDashboard() {
 
        document.getElementById('volunteer-name').textContent = volunteerData.name;
        document.getElementById('volunteer-location').textContent = volunteerData.location;
        document.getElementById('total-hours').textContent = volunteerData.totalHours;
        document.getElementById('lives-impacted').textContent = volunteerData.livesImpacted;
        document.getElementById('current-level').textContent = volunteerData.level;
        document.getElementById('current-xp').textContent = volunteerData.xp;
        document.getElementById('next-level-xp').textContent = volunteerData.nextLevelXp;
        
  
        const progressPercentage = (volunteerData.xp / volunteerData.nextLevelXp) * 100;
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        

        const xpNeeded = volunteerData.nextLevelXp - volunteerData.xp;
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${xpNeeded} XP to Level ${volunteerData.level + 1}`;
        }
    }
    

    function drawChart() {
        const canvas = document.getElementById('impact-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = [5, 8, 12, 15, 18, 24];
        const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
   
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
      
        const barWidth = 30;
        const spacing = 20;
        const startX = 50;
        const startY = canvas.height - 50;
        
        ctx.fillStyle = '#8CC63F';
        
        data.forEach((value, index) => {
            const x = startX + (index * (barWidth + spacing));
            const height = value * 5;
            
          
            ctx.fillRect(x, startY - height, barWidth, height);
            
         
            ctx.fillStyle = '#2C3E50';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(months[index], x + barWidth/2, startY + 20);
            ctx.fillStyle = '#8CC63F';
        });
    }
    
   
    window.logHours = function() {
        const hours = prompt('Enter hours volunteered (1-24):');
        if (!hours) return;
        
        const parsedHours = parseFloat(hours);
        if (isNaN(parsedHours) || parsedHours < 1 || parsedHours > 24) {
            alert('Please enter a valid number between 1 and 24');
            return;
        }
        
        
        volunteerData.totalHours += parsedHours;
        volunteerData.xp += Math.floor(parsedHours * 10);
        volunteerData.livesImpacted += Math.floor(parsedHours * 2);
        
     
        localStorage.setItem('volunteerData', JSON.stringify(volunteerData));
        updateDashboard();
        
        alert(`Successfully logged ${parsedHours} hours! You earned ${Math.floor(parsedHours * 10)} XP.`);
    };
    
  
    window.findOpportunities = function() {
        window.location.href = '/pages/volunteer-opportunities.html';
    };
    
    window.joinTeam = function() {
        alert('Team joining feature will be available soon!');
    };
    
    window.shareImpact = function() {
        alert(`Share your impact: I've volunteered ${volunteerData.totalHours} hours with Smile Foundation!`);
    };
    
 
    const periodSelector = document.getElementById('impact-period');
    if (periodSelector) {
        periodSelector.addEventListener('change', function() {
            const period = this.value;
            const data = {
                month: [8, 45, 3, 4],
                quarter: [18, 98, 6, 8],
                year: [24, 156, 8, 12],
                all: [48, 312, 15, 25]
            }[period] || [8, 45, 3, 4];
            
           
            document.querySelectorAll('.impact-stat .stat-number').forEach((el, i) => {
                if (data[i]) el.textContent = data[i];
            });
        });
    }
    

    updateDashboard();
    drawChart();
});