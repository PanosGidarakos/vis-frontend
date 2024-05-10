import React from 'react';

const DataExploration: React.FC = () => {
  const centerContentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensures the content is centered vertically
  };

  return (
    <div style={centerContentStyle}> {/* Apply inline styles */}
      <h2>Data Explaration</h2>
    </div>
  );
};

export default DataExploration;
