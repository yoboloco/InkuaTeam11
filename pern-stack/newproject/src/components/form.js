import React, { useState } from 'react';
import './component.css'

function Form() {
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/insertRow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data sent successfully.');
        // Clear the form or handle success as needed
      } else {
        console.error('Failed to send data to the server.');
        // Handle the error accordingly
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error accordingly
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;