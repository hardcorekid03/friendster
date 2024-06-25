import React, { useState } from 'react';
import DropzoneComponent from './Dropzone'; // Adjust the path as necessary

const FileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    setFileName(file.name);
    onFileSelect(file.name); // Pass file name up to parent component
  };

  return (
    <div>
      <DropzoneComponent onFileSelect={handleFileSelect} />
    </div>
  );
};

export default FileUpload;
