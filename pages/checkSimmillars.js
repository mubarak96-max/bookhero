import React from 'react';
import Upload from '../components/CheckSimmilarities/CheckSimmillar';

const checkSimmillars = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Upload />
    </div>
  );
};

export default checkSimmillars;
