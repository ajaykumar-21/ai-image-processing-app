"use client";
import { useState } from "react";
// import "../../app/globals.css";

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend  = () => {
        // console.log(reader);
        setPreview(reader.result);
        onImageSelect(reader.result); // Pass the image data to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-w-sm rounded shadow-lg"
        />
      )}
    </div>
  );
};

export default ImageUpload;
