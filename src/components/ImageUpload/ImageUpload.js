import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ setImagesToUpload, images, setImages }) => {

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to only 3 images
    if (images.length + files.length > 3) {
      alert('You can upload up to 3 images only');
      return;
    }

    // Store file objects and preview URLs locally
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    // Send file objects to parent component to handle later
    setImagesToUpload((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <div className="image-upload-container">
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-square">
            <img src={image} alt="Uploaded preview" />
          </div>
        ))}
        {images.length < 3 && (
          <label className="upload-square">
            + Add Image
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
