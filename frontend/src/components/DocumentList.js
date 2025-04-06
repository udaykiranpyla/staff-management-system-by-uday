import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentList = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/documents')
      .then(res => setDocs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    await axios.delete(`http://localhost:5000/api/documents/${id}`);
    setDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div>
      <h3>📚 Documents</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Uploaded</th>
            <th>Expires</th>
            <th>Status</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{new Date(doc.uploadDate).toLocaleDateString()}</td>
              <td>{doc.expiryDate}</td>
              <td style={{ color: isExpired(doc.expiryDate) ? 'red' : 'green' }}>
                {isExpired(doc.expiryDate) ? 'Expired' : 'Valid'}
              </td>
              <td>
                <a href={`http://localhost:5000${doc.filePath}`} download>
                  📥
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(doc.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
