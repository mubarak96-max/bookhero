import React from 'react';

const CopyButton = () => {
  return (
    <Button variant='contained' component='span' onClick={copyToClipboard}>
      Copy image Link
    </Button>
  );
};

export default CopyButton;
