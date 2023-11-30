import React, { useState, useEffect } from 'react';

const ProjectBox = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/proyectos'); // Update the endpoint to the correct one for fetching data from the 'proyectos' table
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>Proyectos</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {projects.map((project) => (
          <div key={project.id} className="project-box" style={projectBoxStyle}>
            <h3 style={{ color: 'green' }}>{project.title}</h3>
            <p style={{ color: 'black' }}>{project.description}</p>
            <img src={project.url} alt={project.title} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

const projectBoxStyle = {
  backgroundColor: '#F0F0F0',
  padding: '20px',
  margin: '10px',
  border: '1px solid #336699',
  borderRadius: '8px',
  width: '300px', // Adjust the width as needed
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  marginTop: '10px',
  borderRadius: '8px',
};

export default ProjectBox;
