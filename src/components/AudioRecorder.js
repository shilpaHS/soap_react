import React, { useState } from 'react';
import '../index.css';  // Import the styles

const AudioRecorder = ({ onAudioReady }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [paused, setPaused] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        onAudioReady(audioBlob);
        setIsListening(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setIsListening(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setPaused(false); // Reset paused state when stopping the recording
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && paused) {
      mediaRecorder.resume();
      setPaused(false);
    }
  };

  return (
    <div>
      <button
        onClick={startRecording}
        disabled={recording}
        className={`button start ${recording ? 'disabled' : ''}`}
      >
        {recording ? 'Recording...' : 'Start Recording'}
      </button>
   
      <button
        onClick={pauseRecording}
        disabled={!recording || paused}
        className="button pause"
      >
        Pause Recording
      </button>
      <button
        onClick={resumeRecording}
        disabled={!paused}
        className="button resume"
      >
        Resume Recording
      </button>
      <button
        onClick={stopRecording}
        disabled={!recording}
        className="button stop"
      >
        Stop Recording
      </button>
      {isListening && (
        <p className="listening-text">Listening...</p>
      )}
    </div>
  );
};

export default AudioRecorder;
