import React, { useEffect, useState } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

const ImageFilters = ({ imageSrc }) => {
  const [filteredImg, setFilteredImg] = useState(null);

  const applyBackgroundRemoval = async () => {
    const image = new Image();
    image.src = imageSrc;

    // Wait for the image to load before processing
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");

      // Load the BodyPix model
      const model = await bodyPix.load();

      // Segment the person in the image
      const segmentation = await model.segmentPerson(image);

      // Create a new canvas to store the person with a transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the original image onto the canvas
      ctx.drawImage(image, 0, 0);

      // Get image data to modify based on segmentation mask
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Loop over each pixel and apply transparency to background pixels
      for (let i = 0; i < imageData.data.length; i += 4) {
        const isPerson = segmentation.data[i / 4] === 1; // 1 if person, 0 if background
        if (!isPerson) {
          // Set the background pixel to be fully transparent
          imageData.data[i + 3] = 0; // Alpha channel
        }
      }

      // Put the modified image data back on the canvas
      ctx.putImageData(imageData, 0, 0);

      // Set the filtered image
      setFilteredImg(canvas.toDataURL());
    };
  };

  useEffect(() => {
    if (imageSrc) {
      applyBackgroundRemoval();
    }
  }, [imageSrc]);

  return (
    <div className="flex flex-col items-center">
      {filteredImg ? (
        <img
          src={filteredImg}
          alt="Filtered"
          className="w-full max-w-sm rounded shadow-lg"
        />
      ) : (
        <p>Applying background removal...</p>
      )}
    </div>
  );
};

export default ImageFilters;
