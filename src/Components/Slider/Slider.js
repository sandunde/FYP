import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./Slider.css";

const Slider = () => {
  const [waveActive, setWaveActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [movieName, setMovieName] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setMovieName("");
    setRecognizedText("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await sendAudioFile(audioBlob);
        setWaveActive(false);
      };

      recorder.start();

      setTimeout(() => {
        recorder.stop();
        setWaveActive(false);
        setLoading(true);
      }, 7000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
    setWaveActive(true);
  };

  const handleCancelClick = () => {
    window.location.reload()
  }

  const sendAudioFile = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded_audio.webm');

    try {
      const response = await fetch('http://localhost:5000/process_audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload audio file');
      }

      const data = await response.json();
      setRecognizedText(data.recognized_text);
      setMovieName(data.movie_name);
    } catch (error) {
      console.error('Error uploading audio file:', error);
    } finally {
      setLoading(false); // Stop loading spinner after response
    }
  };

  useEffect(() => {
    console.log(recognizedText);
  }, [recognizedText]);

  return (
    <div className="slider-container">
      <Button
        variant="dark"
        className={`main-button ${waveActive ? 'wave' : ''}`}
        onClick={handleButtonClick}
        disabled={waveActive}
      >
        AUDIO
      </Button>
      {waveActive && (
        <Button
          variant="danger"
          className="cancel-button"
          onClick={handleCancelClick}
          >
            CANCEL
          </Button>
      )}
      {loading && <Spinner animation="border" role="status" className="spinner" />}
      {movieName && (
        <div>
          <h2>Movie Name:</h2>
          <p>{movieName}</p>
        </div>
      )}
      {recognizedText && (
        <div>
          <h2>Recognized Text:</h2>
          <p>{recognizedText}</p>
        </div>
      )}
    </div>
  );
};

export default Slider;
