import React, { useState } from 'react';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit project information
      const projectResponse = await fetch('http://localhost:5000/api/saveProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
  
      if (!projectResponse.ok) {
        console.error('Failed to submit project information.');
        return;
      }
  
      // Submit image and receive image URL
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
  
        const imageResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.url;
          console.log('Image uploaded successfully to Cloudinary. URL:', imageUrl);
        } else {
          console.error('Failed to upload image to Cloudinary.');
          return;
        }
      }
  
      // Submit project information and image URL to proyectos table
      const proyectosResponse = await fetch('http://localhost:5000/api/saveProyecto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, url: imageUrl }),
      });
  
      if (proyectosResponse.ok) {
        console.log('Project information submitted to proyectos table.');
        console.log(imageUrl)
      } else {
        console.error('Failed to submit project information to proyectos table.');
      }
  
      // Clear form fields
      setTitle('');
      setDescription('');
      setImage(null);
  
      // Display success message
      // Display success message for 5 seconds
      setSuccessMessage('Project created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
  
      console.log('Project and image information submitted successfully.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <div className="centered-form">
      <div className="project-form-container">
        <h2>Informacion del proyecto</h2>
        <div className="input-container">
          <label>Titulo:</label>
          <input placeholder="Ingresar descripcion" type="text" value={title} onChange={handleTitleChange} />

        </div>
        <div className="input-container">
          <label>Descripcion:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Ingresar descripcion"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="input-container">
          <label>Imagen menor a 1mb:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="submit-button-container">
          <button onClick={handleSubmit}>Enviar proyecto</button>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ProjectForm;




