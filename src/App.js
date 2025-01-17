import React, { useState } from 'react';
import axios from 'axios';
import AudioRecorder from './components/AudioRecorder';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import SOAPNoteDisplay from './components/SOAPNoteDisplay';

const App = () => {
  const [transcription, setTranscription] = useState('');
  const [soapNote, setSoapNote] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);

  const uploadAudio = async (audio) => {
    const formData = new FormData();
    formData.append('audio', audio);

    try {
      const { data } = await axios.post('/api/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTranscription(data.transcription);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const generateSOAPNote = async () => {
    try {
      const { data } = await axios.post('/api/soap-note', { transcription });
      setSoapNote(data.soapNote);
    } catch (error) {
      console.error('Error generating SOAP note:', error);
    }
  };

  return (
    <div className="App">
      <h1>SOAP Note Generator</h1>
      <AudioRecorder onAudioReady={(blob) => setAudioBlob(blob)} />
      <button onClick={() => uploadAudio(audioBlob)} disabled={!audioBlob}>
        Upload Audio
      </button>
      <button onClick={generateSOAPNote} disabled={!transcription}>
        Generate SOAP Note
      </button>
      <TranscriptionDisplay transcription={transcription} />
      <SOAPNoteDisplay soapNote={soapNote} />
    </div>
  );
};

export default App;
