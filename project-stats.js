// Create a new file called project-stats.js

// Manually updated project statistics
const projectStats = {
  'RTST': {
    downloads: 25k+,
    stars: 0,
    lastUpdated: '2023-09-15',
    updatedAt: 'Last updated: Oct 10, 2023'
  },
  'Simple Deployment': {
    downloads: '2k+',
    stars: 1,
    lastUpdated: '2023-08-20',
    updatedAt: 'Last updated: Oct 5, 2023'
  },
  'Ubuntu Llama-2-7B': {
    downloads: '2k+',
    stars: 4,
    lastUpdated: '2023-10-05',
    updatedAt: 'Last updated: Oct 15, 2023'
  },

  'SweatyCrayfish/llama-3-8b-quantized': {
    downloads: '888 monthly',
    stars: 10,
    lastUpdated: '2024-04',
    updatedAt: '2024-04'
  },
  'light-distribution-analysis': {
    downloads: '8k+',
    stars: 3,
    lastUpdated: '2024-07',
    updatedAt: '2024-07'
  },
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
