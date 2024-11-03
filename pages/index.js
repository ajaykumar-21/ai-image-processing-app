"use client";
import { useState } from "react";
import ImageUpload from "@/src/components/ImageUpload";
import ImageFilters from "@/src/components/ImageFilters";

export default function HomePage() {
  const [imageData, setImageData] = useState(null);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">AI-Enhanced Image Processing</h1>
      <ImageUpload onImageSelect={setImageData} />
      {imageData && (
        <div className="mt-6">
          <ImageFilters imageSrc={imageData} />
        </div>
      )}
    </div>
  );
}
