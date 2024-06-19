import React, { useState } from 'react';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewImage && (
        <div className="mt-4">
          <img
            src={previewImage}
            alt="Preview"
            className=" object-cover"
            style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'cover' }}

          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
