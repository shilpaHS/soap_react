import React, { useState } from 'react';
import axios from 'axios';
import AudioRecorder from './components/AudioRecorder';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import SOAPNoteDisplay from './components/SOAPNoteDisplay';

const App = () => {
  const [transcription, setTranscription] = useState('');
  const [soapNote, setSoapNote] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);  // State for uploading status
  const [isGenerating, setIsGenerating] = useState(false);  // State for generating SOAP note

  const uploadAudio = async (audio) => {
    const formData = new FormData();
    formData.append('audio', audio);

    setIsUploading(true);  // Set uploading status to true

    try {
      const { data } = await axios.post('/api/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscription(data.transcription);
    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setIsUploading(false);  // Reset uploading status after the request
    }
  };

  const generateSOAPNote = async () => {
    if (!transcription) return;  // Ensure transcription exists

    setIsGenerating(true);  // Set generating status to true

    try {
      const { data } = await axios.post('/api/soap-note', { transcription });
      setSoapNote(data.soapNote);
    } catch (error) {
      console.error('Error generating SOAP note:', error);
    } finally {
      setIsGenerating(false);  // Reset generating status after the request
    }
  };

  return (
    <div className="App">
      <h1>SOAP Note Generator</h1>
      <AudioRecorder onAudioReady={(blob) => setAudioBlob(blob)} />
      
      {/* Display loading spinner if uploading */}
      <button  className="button upload" onClick={() => uploadAudio(audioBlob)} disabled={!audioBlob || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Audio'}
      </button>
      
      {/* Display loading spinner if generating SOAP note */}
      <button className="button soap" onClick={generateSOAPNote} disabled={!transcription || isGenerating}>
        {isGenerating ? 'Generating SOAP Note...' : 'Generate SOAP Note'}
      </button>
      
      <TranscriptionDisplay transcription={transcription} />
      <SOAPNoteDisplay soapNote={soapNote} />
    </div>
  );
};

export default App;
