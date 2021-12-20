import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import Countdown from 'react-countdown';
import './scss/videopage.scss';
const WebcamStreamCapture = () => {
  let Questions = [
    {
      title: 'How are you',
      readTime: 7,
      answerTime: 10,
    },
    {
      title: 'State your skills',
      readTime: 6,
      answerTime: 8,
    },
    {
      title: "What's your name",
      readTime: 5,
      answerTime: 5,
    },
  ];

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [counter, setCounter] = useState(0);
  const [readTimer, setReadTimer] = useState(true);
  let webSocket;
  const ref = useRef();

  const handleStart = (e) => {
    ref.current?.start();
  };

  const handlePause = (e) => {
    ref.current?.pause();
  };

  useEffect(() => {
    webSocket = new WebSocket('ws://localhost:8080', 'echo-protocol');
    return () => webSocket.close();
  }, []);

  const startInterview = () => {
    setVisibility(true);
    setStart(false);
    handleStart();
    setTimeout(handleStartCaptureClick, Questions[counter].readTime * 1000);
    if (stop) {
      setTimeout(() => {
        setNext(true);
        setStop(false);
        handleStopCaptureClick();
      }, Questions[counter].readTime * 1000 + Questions[counter].answerTime * 1000);
    }
  };
  const handleStartCaptureClick = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start(1000 * 5);
    console.log('recording....');
    setStop(true);
    setReadTimer(false);
  }, [webcamRef, setStart, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        webSocket.send(data);
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks] //????
  );

  const handleStopCaptureClick = useCallback(() => {
    setNext(true);
    mediaRecorderRef.current.stop();
    //   setStart(false)
    setStop(false);
  }, [mediaRecorderRef, webcamRef, setStart]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'react-webcam-stream-capture.mp4';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  const renderer = ({ api }) => {
    api.start();
  };
  const handleNext = () => {
    setCounter((counter) => counter + 1);
    setNext(false);
    setStart(true);
    setReadTimer(true);
    setVisibility(false);
    setStop(false);
  };
  return (
    <>
      <NavBar />
      {visibility && (
        <Card className="questions">
          <p className="questionTitle">{Questions[counter].title}</p>
        </Card>
      )}
      <Webcam audio={true} ref={webcamRef} muted={true} className="video" />
      {readTimer && (
        <Countdown
          date={Date.now() + Questions[counter].readTime * 1000}
          autoStart={false}
          ref={ref}
        />
      )}{' '}
      <br />
      {start && (
        <button onClick={startInterview} className="buttons">
          Start Capture
        </button>
      )}
      {stop && (
        <button onClick={handleStopCaptureClick} className="buttons">
          Stop Capture
        </button>
      )}
      {next && (
        <button onClick={handleNext} className="buttons">
          Next Qusetion
        </button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
    </>
  );
};

export default WebcamStreamCapture;
