import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, FolderUp } from 'lucide-react';

const BulkUploadCard = ({ onFilesUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }));
    
    setUploadedFiles(prev => [...prev, ...filesWithPreview]);
    onFilesUpload(filesWithPreview);
  }, [onFilesUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const removeFile = (id) => {
    const newFiles = uploadedFiles.filter(file => file.id !== id);
    setUploadedFiles(newFiles);
    onFilesUpload(newFiles);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col h-full"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-1.5 rounded-lg">
          <FolderUp className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Bulk Certificate Upload</h3>
      </div>
      
      {/* Dropzone - Takes remaining space */}
      <div className="flex-1 flex flex-col">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg flex-1 flex items-center justify-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : uploadedFiles.length > 0
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-primary-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600 text-center p-4">
            {uploadedFiles.length > 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-2"
              >
                <FileText className="h-12 w-12 text-green-600 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
                  </p>
                  <p className="text-xs text-gray-600">Ready for verification</p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {isDragActive ? 'Drop files here' : 'Drag & drop certificates here'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Supports: JPG, PNG, PDF (Max 10MB each)</p>
                  <button className="mt-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                    Browse Files
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center">
                      <FileText className="h-3 w-3 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 truncate max-w-[150px]">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BulkUploadCard;
