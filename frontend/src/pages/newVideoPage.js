import React, { useRef, useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import Webcam from 'react-webcam';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import './scss/videopage.scss';
const WebcamStreamCapture = () => {
  let Questions = [
    {
      title: 'How are you nfslbknnfl snblkaj;ha; hgrhah;hg',
      readTime: 7,
      answerTime: 8,
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

  const interval = 1000;

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [counter, setCounter] = useState(0);
  const [readTimer, setReadTimer] = useState(true);

  const [timeLeftRead, { start: startRead }] = useCountDown(
    Questions[counter].readTime * 1000,
    interval
  );
  const [timeLeftAnswer, { start: startAnswer, pause: pauseAnswer }] =
    useCountDown(Questions[counter].answerTime * 1000, interval);

  const webSocket = useRef();
  const recordTimeout = useRef();

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8080', 'echo-protocol');
    return () => webSocket.current.close();
  }, []);

  const renderReadTime = (time) => {
    if (time === 0) {
      return Questions[counter].readTime.toFixed(2);
    }
    return (time / 1000).toFixed(2);
  };

  const renderAnswerTime = (time) => {
    if ((start || !next) && time === 0) {
      return Questions[counter].answerTime.toFixed(2);
    }
    return (time / 1000).toFixed(2);
  };

  const startInterview = () => {
    setRecordedChunks([]);
    startRead(Questions[counter].readTime * 1000);
    if (!visibility) setVisibility(true);
    if (start) setStart(false);

    setTimeout(() => {
      handleStartCaptureClick();
      console.log('Start recording (setTimeout)');
    }, Questions[counter].readTime * 1000);

    recordTimeout.current = setTimeout(() => {
      console.log('Stop recording (setTimeout)');
      if (!next) setNext(true);
      setStop((stop) => {
        if (stop) {
          handleStopCaptureClick(null, true);
          return false;
        }
        return false;
      });
    }, Questions[counter].readTime * 1000 + Questions[counter].answerTime * 1000);
  };

  const handleStartCaptureClick = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    startAnswer(Questions[counter].answerTime * 1000);
    console.log('Created MediaRecorder');
    if (!stop) setStop(true);
    if (readTimer) setReadTimer(false);
  }, [webcamRef, setStop, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        webSocket.current.send(data);
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(
    (e, isNonManualStop) => {
      console.log('Handle Stop Capture Click');
      console.log(`stop = ${stop}`);
      clearTimeout(recordTimeout.current);
      if (!next) setNext(true);
      if (!isNonManualStop) pauseAnswer();
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (stop) setStop(false);
    },
    [mediaRecorderRef, webcamRef, stop, setStop]
  );

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

  const handleNext = () => {
    setCounter((counter) => counter + 1);
    setReadTimer(true);
    setNext(false);
    setStart(true);
    setReadTimer(true);
    setVisibility(false);
    setStop(false);
  };

  return (
    <>
      <NavBar />
      <Webcam audio={true} ref={webcamRef} muted={true} className="video" />

      <div className="questionspart">
        {visibility && (
          <Card className="questions">
            {renderAnswerTime(timeLeftAnswer)}
            <p className="questionTitle">{Questions[counter].title}</p>
          </Card>
        )}

        <br />
        {readTimer && (
          <Card className="readCard">{renderReadTime(timeLeftRead)}</Card>
        )}

        {start && (
          <button onClick={startInterview} className="buttons">
            Start Capture
          </button>
        )}
        {stop && (
          <button
            onClick={(e) => handleStopCaptureClick(e, false)}
            className="buttons"
          >
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
      </div>
    </>
  );
};

export default WebcamStreamCapture;
