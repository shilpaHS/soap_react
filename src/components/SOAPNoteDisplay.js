import React from 'react';

const SOAPNoteDisplay = ({ soapNote }) => {
  let parsedNote = null;
  
  try {
    // Parse the soapNote string into an object
    parsedNote = JSON.parse(soapNote);
  } catch (error) {
    console.error("Error parsing soapNote:", error);
  }

  // Extract content from choices if available
  const content = parsedNote && parsedNote.choices && parsedNote.choices[0]?.message?.content;

  return (
    <div>
      <h2>SOAP Note:</h2>
      <pre>{content || "No SOAP note generated yet."}</pre>
    </div>
  );
};

export default SOAPNoteDisplay;
