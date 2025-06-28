import React, { useState } from 'react';

function App() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get-result/${id}`);
      if (!res.ok) {
        throw new Error('ID not found');
      }
      const data = await res.json();
      setResult(data);
      setError('');
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔍 Search Prediction Result by UNIQUE_ID</h2>

      <input
        type="text"
        placeholder="Enter UNIQUE_ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          padding: '10px',
          marginRight: '10px',
          width: '250px',
          fontSize: '16px'
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Search
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '30px' }}>
          <h3>📄 Prediction Result:</h3>
          <p><strong>UNIQUE_ID:</strong> {result.UNIQUE_ID}</p>
          <p><strong>TARGET:</strong> {result.TARGET}</p>
          <p><strong>PREDICTED_TARGET:</strong> {result.PREDICTED_TARGET}</p>
        </div>
      )}
    </div>
  );
}

export default App;
