// project-stats.js

const projectStats = {
  'RTST': {
    downloads: "25k+",
    stars: 0,
    lastUpdated: '2023-09-15',
    updatedAt: 'Last updated: Oct 10, 2023'
  },
  'Simple Deployment': {
    downloads: "2k+",
    stars: 1,
    lastUpdated: '2023-08-20',
    updatedAt: 'Last updated: Oct 5, 2023'
  },
  'Ubuntu Llama-2-7B': {
    downloads: "27",
    stars: 6,
    lastUpdated: '2023-10-05',
    updatedAt: 'Last updated: Dec 8, 2023'
  },
  'SweatyCrayfish/llama-3-8b-quantized': {
    downloads: "888 monthly",
    stars: 10,
    lastUpdated: '2024-04',
    updatedAt: '2024-04'
  },
  'light-distribution-analysis': {
    downloads: "8k+",
    stars: 3,
    lastUpdated: '2024-07',
    updatedAt: '2024-07'
  },
};

// Utility to format numbers for better readability
function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// Displays the stats for a specific project in #project-stats container
function displayProjectStats(projectName) {
  const statsContainer = document.getElementById('project-stats');
  if (!statsContainer) return;

  // Get the stats for this project
  const stats = projectStats[projectName];
  if (!stats) {
    statsContainer.innerHTML = '<p>No statistics available for this project.</p>';
    return;
  }

  // Render the stats with icons
  statsContainer.innerHTML = `
    <div class="stat-item">
      <i class="fas fa-download"></i>
      <span>${stats.downloads}</span>
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

  const statValues = statsContainer.querySelectorAll('.stat-item span');
  statValues.forEach(span => {
    if (span.textContent.includes('-') || span.textContent.match(/[^\d]/)) {
      return;
    }

    let text = span.textContent.replace('k', '000').replace('+', '');
    const finalValue = parseInt(text, 10);
    if (isNaN(finalValue)) return;

    // Animate from 0 to finalValue
    let startValue = 0;
    const duration = 1500;  
    const frameRate = 20;   
    const increment = finalValue / (duration / frameRate);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= finalValue) {
        span.textContent = formatNumber(finalValue);
        clearInterval(counter);
      } else {
        span.textContent = formatNumber(Math.floor(startValue));
      }
    }, frameRate);
  });
}

// Sets up click listeners on each .project-frame, plus default project
function enhanceProjectFrames() {
  const projectFrames = document.querySelectorAll('.project-frame');
  let statsContainer = document.getElementById('project-stats');
  if (!statsContainer) {
    statsContainer = document.createElement('div');
    statsContainer.id = 'project-stats';
    statsContainer.className = 'project-stats-container';
    
    // Insert stats container after #project-description-container
    const projectDescContainer = document.getElementById('project-description-container');
    if (projectDescContainer && projectDescContainer.parentNode) {
      projectDescContainer.parentNode.insertBefore(statsContainer, projectDescContainer.nextSibling);
    }
  }
  
  projectFrames.forEach(frame => {
    frame.addEventListener('click', () => {
      const projectName = frame.getAttribute('data-project');
      displayProjectStats(projectName);
    });
  });

  // Display a default project's stats on page load
  const defaultProject = 'RTST'; 
  displayProjectStats(defaultProject);
}

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', enhanceProjectFrames);
