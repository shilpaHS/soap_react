import React from 'react';

const SOAPNoteDisplay = ({ soapNote }) => {
  let parsedNote = null;
  let content = "No SOAP note generated yet.";

  try {
    // Parse the soapNote string into an object
    if (soapNote) {
      parsedNote = JSON.parse(soapNote);
      // Extract content from choices if available
      content = parsedNote.choices?.[0]?.message?.content || content;
    }
  } catch (error) {
    console.error("Error parsing soapNote:", error);
  }

  return (
    <div>
      <h2>SOAP Note:</h2>
      <pre>{content}</pre>
    </div>
  );
};

export default SOAPNoteDisplay;
