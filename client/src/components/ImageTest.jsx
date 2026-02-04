import { useState } from 'react';
import API_BASE_URL from '../config/api';

const ImageTest = () => {
  const [testUrl, setTestUrl] = useState('');
  const [imageStatus, setImageStatus] = useState('');

  const testImageUrl = (url) => {
    setImageStatus('Testing...');
    const img = new Image();
    
    img.onload = () => {
      setImageStatus('✅ Image loads successfully');
    };
    
    img.onerror = () => {
      setImageStatus('❌ Image failed to load');
    };
    
    img.src = url;
  };

  const testServerConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test-uploads`);
      const data = await response.json();
      console.log('Server test:', data);
      setImageStatus(`Server response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setImageStatus(`Server error: ${error.message}`);
    }
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header">
          <h5>Image Upload Test</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Test Image URL:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder={`${API_BASE_URL}/uploads/profile/filename.jpg`}
              />
              <button 
                className="btn btn-primary" 
                onClick={() => testImageUrl(testUrl)}
              >
                Test Image
              </button>
            </div>
          </div>
          
          <div className="mb-3">
            <button 
              className="btn btn-info" 
              onClick={testServerConnection}
            >
              Test Server Connection
            </button>
          </div>
          
          {imageStatus && (
            <div className="alert alert-info">
              <pre>{imageStatus}</pre>
            </div>
          )}
          
          {testUrl && (
            <div className="mt-3">
              <h6>Image Preview:</h6>
              <img 
                src={testUrl} 
                alt="Test" 
                style={{ maxWidth: '200px', maxHeight: '200px' }}
                onLoad={() => console.log('Image loaded:', testUrl)}
                onError={() => console.log('Image failed:', testUrl)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageTest;