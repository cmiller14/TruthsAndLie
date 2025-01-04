import React, { useState } from "react";
import "./inputForm.css";

const InputForm = ({ isOpen, onClose, onSubmit}) => {
  if (!isOpen) return null; // Don't render the component if it's not open
  const [formData, setFormData] = useState({ name: "", truth1: "", truth2: "", lie: "", guessed: false});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data back to App.jsx
    // Reset form data to defaults
    setFormData({
        name: "",
        truth1: "",
        truth2: "",
        lie: "",
    });
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Submit Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Truth 1:
            <input
              type="text"
              name="truth1"
              value={formData.truth1}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Truth 2:
            <input
              type="text"
              name="truth2"
              value={formData.truth2}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Lie:
            <input
              type="text"
              name="lie"
              value={formData.lie}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
