import React from 'react';

const TranscriptionDisplay = ({ transcription }) => {
  return (
    <div>
      <h2>Transcription:</h2>
      <p>{transcription || "No transcription yet."}</p>
    </div>
  );
};

export default TranscriptionDisplay;
