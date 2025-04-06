import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [expiryDate, setExpiryDate] = useState('');

  const handleUpload = async () => {
    if (!file || !expiryDate) {
      alert('Select file and expiry date!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('expiryDate', expiryDate);

    try {
      await axios.post('http://localhost:5000/api/documents/upload', formData);
      alert('Upload successful!');
      window.location.reload();
    } catch (err) {
      alert('Upload failed!');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Upload New Document</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input
        type="date"
        value={expiryDate}
        onChange={e => setExpiryDate(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
