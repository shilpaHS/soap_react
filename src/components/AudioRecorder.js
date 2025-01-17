import React, { useState } from 'react';

const AudioRecorder = ({ onAudioReady }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => setAudioBlob(e.data);
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      onAudioReady(audioBlob);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;
