import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'tailwindcss/tailwind.css';

const DropzoneComponent = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(Object.assign(selectedFile, {
      preview: URL.createObjectURL(selectedFile)
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

  });

  return (
    <div {...getRootProps()} className={` mb-4 border-2 border-dashed p-4 rounded-lg ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
      <input {...getInputProps()} />
      <div className="flex  items-center justify-center">
      {!file && 
          <div className="w-160 h-16 mb-4 text-gray-500">
            <h1>Click or drag to upload image</h1>
            <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
            </svg>
          </div>
        }
        {file && <img src={file.preview} alt="Preview" className=" w-full h-[200px] md:h-[200px]  object-contain" />}
      </div>
    </div>
  );
};

export default DropzoneComponent;
