/*import React, { useState } from 'react';

function CreateProjectBox() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    // You can handle image upload here and set the 'image' state accordingly
    // For example, using FileReader to convert the image to base64 or uploading to a server.
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit =async () => {
    try {
      const response = await fetch('http://localhost:5000/api/insertText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        

       body: JSON.stringify({ longText: description }),
      });
  
      if (response.ok) {
        console.log('Description sent successfully.');
        // Clear the description
        setDescription('');
      } else {
        console.error('Failed to send description to the server.');
        // Handle the error accordingly
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error accordingly
    }
    // You can perform your submit action here, e.g., sending data to a server
    // You can access 'description' and 'image' states for data.
    console.log('Description:', description);
    console.log('Image:', image);

    // Clear the description and image
    setDescription('');
    setImage(null);
  };

  return (
    <div className="create-project-box">
      <h2>Create New Project</h2>
      <div className="input-container">
        <textarea
          rows="4"
          cols="50"
          placeholder="Project Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="input-container">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {image && <img src={image} alt="Project Preview" className="image-preview" />}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
*/

//tryng to send image and entire text

import React, { useState } from 'react';

const CreateProjectBox = () => {
  const [image, setImage] = useState(null);

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

  const handleUpload = async () => {
    try {
      if (!image) {
        console.error('No image selected for upload.');
        return;
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully to Cloudinary. URL:', data.url);
        setImage(null);
      } else {
        console.error('Failed to upload image to Cloudinary.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {image && <img src={image} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <div>
        <button onClick={handleUpload}>Upload Image</button>
      </div>
    </div>
  );
};

export default CreateProjectBox;

