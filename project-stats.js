// Create a new file called project-stats.js

// Manually updated project statistics
const projectStats = {
  'RTST': {
    downloads: 1250,
    stars: 87,
    lastUpdated: '2023-09-15',
    updatedAt: 'Last updated: Oct 10, 2023' // When you manually updated these stats
  },
  'Simple Deployment': {
    downloads: 785,
    stars: 42,
    lastUpdated: '2023-08-20',
    updatedAt: 'Last updated: Oct 5, 2023'
  },
  'Ubuntu Llama-2-7B': {
    downloads: 2370,
    stars: 156,
    lastUpdated: '2023-10-05',
    updatedAt: 'Last updated: Oct 15, 2023'
  },
  'Web-Scraping-NLP': {
    downloads: 635,
    stars: 38,
    lastUpdated: '2023-07-30',
    updatedAt: 'Last updated: Sep 28, 2023'
  },
  'Cyber-Security': {
    downloads: 825,
    stars: 53,
    lastUpdated: '2023-09-10',
    updatedAt: 'Last updated: Oct 8, 2023'
  },
  'Real-world-model-test': {
    downloads: 410,
    stars: 29,
    lastUpdated: '2023-06-25',
    updatedAt: 'Last updated: Sep 20, 2023'
  },
  'Google-Apps': {
    downloads: 1680,
    stars: 92,
    lastUpdated: '2023-09-28',
    updatedAt: 'Last updated: Oct 12, 2023'
  }
};

// Function to format numbers for better readability
function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// Function to display project statistics
function displayProjectStats(projectName) {
  const statsContainer = document.getElementById('project-stats');
  if (!statsContainer) return;
  
  // Get stats for the selected project
  const stats = projectStats[projectName];
  if (!stats) {
    statsContainer.innerHTML = '<p>No statistics available for this project.</p>';
    return;
  }
  
  // Display the statistics with icons
  statsContainer.innerHTML = `
    <div class="stat-item">
      <i class="fas fa-download"></i>
      <span>${formatNumber(stats.downloads)}</span>
      <p>Downloads</p>
    </div>
    <div class="stat-item">
      <i class="fas fa-star"></i>
      <span>${stats.stars}</span>
      <p>GitHub Stars</p>
    </div>
    <div class="stat-item">
      <i class="fas fa-calendar-alt"></i>
      <span>${stats.lastUpdated}</span>
      <p>Last Code Update</p>
    </div>
    <div class="stats-footer">
      <p class="stats-update-info">${stats.updatedAt}</p>
    </div>
  `;
  
  // Add animation to make the numbers count up
  const statValues = statsContainer.querySelectorAll('.stat-item span');
  statValues.forEach(span => {
    // Skip the date value
    if (span.textContent.includes('-')) return;
    
    const finalValue = parseInt(span.textContent.replace('k', '000'));
    let startValue = 0;
    const duration = 1500;
    const frameRate = 20;
    const increment = finalValue / (duration / frameRate);
    
    const counter = setInterval(() => {
      startValue += increment;
      
      if (startValue >= finalValue) {
        span.textContent = span.textContent.includes('k') ? 
          formatNumber(finalValue) : finalValue;
        clearInterval(counter);
      } else {
        span.textContent = span.textContent.includes('k') ? 
          formatNumber(Math.floor(startValue)) : Math.floor(startValue);
      }
    }, frameRate);
  });
}

// Add this to your existing event listeners for project frames
function enhanceProjectFrames() {
  // Get all project frames
  const projectFrames = document.querySelectorAll('.project-frame');
  
  // Create container for project stats if it doesn't exist
  let statsContainer = document.getElementById('project-stats');
  if (!statsContainer) {
    statsContainer = document.createElement('div');
    statsContainer.id = 'project-stats';
    statsContainer.className = 'project-stats-container';
    
    // Insert stats container after project description
    const projectDescContainer = document.getElementById('project-description-container');
    if (projectDescContainer) {
      projectDescContainer.parentNode.insertBefore(statsContainer, 
        projectDescContainer.nextSibling);
    }
  }
  
  // Add click event listeners to project frames
  projectFrames.forEach(frame => {
    frame.addEventListener('click', function() {
      const projectName = this.getAttribute('data-project');
      displayProjectStats(projectName);
    });
  });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', enhanceProjectFrames);
