// treemap.js - Skills Treemap Visualization
console.log("Treemap.js loaded");

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Initializing Skills Treemap");
  
  // First, let's make sure the container is visible
  const container = document.getElementById('skills-treemap-container');
  if (container) {
    // Add a visible background so we can see if the container is there
    container.style.background = "rgba(0, 0, 0, 0.3)";
    container.style.border = "1px solid #333";
    console.log("Container found and styled");
  } else {
    console.error("skills-treemap-container not found in DOM!");
  }
  
  // Skill data structure organized by categories
  const skillsData = {
    name: "Skills",
    children: [
      {
        name: "Programming Languages",
        children: [
          { name: "Python", value: 96 },
          { name: "JavaScript", value: 80 },
          { name: "R", value: 65 },
          { name: "SQL", value: 90 }
        ]
      },
      {
        name: "AI & ML",
        children: [
          { name: "TensorFlow", value: 96 },
          { name: "PyTorch", value: 89 },
          { name: "NLP", value: 98 },
          { name: "Computer Vision", value: 96 }
        ]
      },
      {
        name: "Web Development",
        children: [
          { name: "HTML", value: 90 },
          { name: "CSS", value: 85 },
          { name: "React", value: 80 },
          { name: "Flask", value: 80 }
        ]
      },
      {
        name: "Cloud & DevOps",
        children: [
          { name: "AWS", value: 90 },
          { name: "GCP", value: 96 },
          { name: "GitHub", value: 88 },
          { name: "Docker", value: 96 }
        ]
      }
    ]
  };

  // Check if D3 is available
  if (typeof d3 === 'undefined') {
    console.error("D3 library not found! Make sure it's loaded properly.");
    // Add a visible error message to the container
    if (container) {
      container.innerHTML = '<div style="color: red; padding: 20px;">Error: D3 library not loaded properly. Check console for details.</div>';
    }
    return;
  } else {
    console.log("D3 library is available");
  }

  // Function to create the treemap
  function createSkillsTreemap() {
    console.log("Creating skills treemap");
    if (!container) return;
    
    // Clear the container
    container.innerHTML = '';
    
    // Set dimensions - use explicit dimensions
    const width = 800;
    const height = 500;
    
    console.log(`Creating SVG with dimensions ${width}x${height}`);
    
    try {
      // Create SVG element
      const svg = d3.select('#skills-treemap-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('style', 'background: rgba(0, 0, 0, 0.3);');
        
      // Define color scale for different categories
      const colorScale = d3.scaleOrdinal()
        .domain(["Programming Languages", "AI & ML", "Web Development", "Cloud & DevOps"])
        .range(["#4a89dc", "#ff7700", "#50C878", "#9370DB"]);
        
      // Create a hierarchical data structure
      const root = d3.hierarchy(skillsData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
        
      // Create treemap layout
      const treemap = d3.treemap()
        .size([width, height])
        .padding(2);
        
      // Generate the treemap
      treemap(root);
      
      // Create groups for each node
      const nodes = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);
        
      // Add rectangles for each skill
      nodes.append('rect')
        .attr('width', d => Math.max(0, d.x1 - d.x0))
        .attr('height', d => Math.max(0, d.y1 - d.y0))
        .attr('fill', d => colorScale(d.parent.data.name))
        .attr('opacity', 0.8)
        .attr('stroke', '#fff')
        .on('mouseover', function() {
          d3.select(this).attr('opacity', 1);
        })
        .on('mouseout', function() {
          d3.select(this).attr('opacity', 0.8);
        });
        
      // Add text labels
      nodes.append('text')
        .attr('x', 5)
        .attr('y', 20)
        .text(d => d.data.name)
        .attr('font-size', '12px')
        .attr('fill', 'white');
        
      // Add proficiency level as percentages
      nodes.append('text')
        .attr('x', 5)
        .attr('y', 38)
        .text(d => `${d.data.value}%`)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', 'white');
        
      // Add legend
      const legend = svg.append('g')
        .attr('transform', `translate(20, ${height - 100})`);
        
      const categories = ["Programming Languages", "AI & ML", "Web Development", "Cloud & DevOps"];
      
      categories.forEach((category, i) => {
        const legendRow = legend.append('g')
          .attr('transform', `translate(0, ${i * 20})`);
          
        legendRow.append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', colorScale(category));
          
        legendRow.append('text')
          .attr('x', 20)
          .attr('y', 12)
          .text(category)
          .attr('fill', 'white')
          .attr('font-size', '12px');
      });
      
      console.log("Treemap created successfully");
    } catch (error) {
      console.error("Error in treemap creation:", error);
      container.innerHTML = `<div style="color: red; padding: 20px;">Error creating treemap: ${error.message}</div>`;
    }
  }

  // Try to create the treemap immediately
  createSkillsTreemap();
  
  // Also try again after a delay to ensure everything is loaded
  setTimeout(createSkillsTreemap, 500);
  setTimeout(createSkillsTreemap, 1000);
  
  // Resize the treemap when window size changes
  window.addEventListener('resize', createSkillsTreemap);
});

// Add a window load event as an additional fallback
window.addEventListener('load', function() {
  console.log("Window loaded - trying treemap creation again");
  
  const container = document.getElementById('skills-treemap-container');
  if (container && container.innerHTML === '') {
    console.log("Container is empty, attempting to create treemap again");
    
    // If d3 is available but the container is empty, try creating the treemap again
    if (typeof d3 !== 'undefined') {
      try {
        // Call the createSkillsTreemap function if it exists
        if (typeof createSkillsTreemap === 'function') {
          createSkillsTreemap();
        } else {
          // Otherwise, dispatch a DOMContentLoaded event to trigger the initialization
          document.dispatchEvent(new Event('DOMContentLoaded'));
        }
      } catch (error) {
        console.error("Error in window.load treemap creation:", error);
      }
    }
  }
});
