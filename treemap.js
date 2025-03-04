// treemap.js - Skills Treemap Visualization
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Initializing Skills Treemap");
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
  function createSkillsTreemap() {
    console.log("Creating skills treemap");
    const container = document.getElementById('skills-treemap-container');
    if (!container) {
      console.error("skills-treemap-container not found!");
      return;
    }
    container.innerHTML = '';
    const width = 800;
    const height = 500;
    const svg = d3.select('#skills-treemap-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const colorScale = d3.scaleOrdinal()
      .domain(["Programming Languages", "AI & ML", "Web Development", "Cloud & DevOps"])
      .range(["#4a89dc", "#ff7700", "#50C878", "#9370DB"]);
    const root = d3.hierarchy(skillsData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const treemap = d3.treemap()
      .size([width, height])
      .padding(2);
    treemap(root);
    const nodes = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);
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
    nodes.append('text')
      .attr('x', 5)
      .attr('y', 20)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', 'white');
    nodes.append('text')
      .attr('x', 5)
      .attr('y', 38)
      .text(d => `${d.data.value}%`)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white');
      
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
  }

  setTimeout(function() {
    try {
      createSkillsTreemap();
      console.log("Initial treemap created");
    } catch (error) {
      console.error("Error creating initial treemap:", error);
    }
  }, 100);

  setTimeout(function() {
    try {
      createSkillsTreemap();
      console.log("Delayed treemap created");
    } catch (error) {
      console.error("Error creating delayed treemap:", error);
    }
  }, 1000);

  window.addEventListener('resize', createSkillsTreemap);
});
