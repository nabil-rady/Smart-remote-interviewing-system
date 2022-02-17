import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import Countdown, { zeroPad } from 'react-countdown';
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

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [counter, setCounter] = useState(0);
  const [readTimer, setReadTimer] = useState(true);

  const refRead = useRef();
  const refAnswer = useRef();
  const webSocket = useRef();
  const recordTimeout = useRef();

  const handleReadStart = (e) => {
    console.log('STATED READ FROM HANDLE FUNCTION');
    refRead.current?.start();
  };

  const handleAnswerStart = (e) => {
    console.log('STATED ANSWER FROM HANDLE FUNCTION');
    refAnswer.current?.start();
  };

  const handleAnswerPause = (e) => {
    if (refAnswer.current.isPaused()) return;
    console.log('record paused');
    refAnswer.current?.pause();
  };

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    return () => webSocket.current.close();
  }, []);

  webSocket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });

  const rendererForRead = ({ minutes, seconds }) => {
    // Render a countdown
    return (
      <p className="readtimer">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </p>
    );
  };
  const rendererForAnswer = ({ minutes, seconds }) => {
    // Render a countdown
    return (
      <span className="answertimer">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const startInterview = () => {
    setRecordedChunks([]);
    if (!visibility) setVisibility(true);
    if (start) setStart(false);

    handleReadStart();

    setTimeout(() => {
      handleStartCaptureClick();
      console.log('Start recording (setTimeout)');
    }, Questions[counter].readTime * 1000);

    recordTimeout.current = setTimeout(() => {
      console.log('Stop recording (setTimeout)');
      if (!next) setNext(true);
      setStop((stop) => {
        if (stop) {
          handleStopCaptureClick();
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
    console.log('Created MediaRecorder');
    if (!stop) setStop(true);
    if (readTimer) setReadTimer(false);
    handleAnswerStart();
  }, [webcamRef, setStop, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        webSocket.current.send(data);
        console.log(`Send dataaaaaaaaaaa`);
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    console.log('Handle Stop Capture Click');
    clearTimeout(recordTimeout.current);
    if (!next) setNext(true);
    // handleAnswerPause();
    if (mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (stop) setStop(false);
  }, [mediaRecorderRef, webcamRef, setStop]);

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
            <Countdown
              date={Date.now() + Questions[counter].answerTime * 1000}
              autoStart={false}
              ref={refAnswer}
              controlled={false}
              onStart={() => console.log('STARTED')}
              onPause={() => console.log('PAUSED')}
              onComplete={() => console.log('COMPLETED')}
              renderer={rendererForAnswer}
            />
            <p className="questionTitle">{Questions[counter].title}</p>
          </Card>
        )}

        <br />
        {readTimer && (
          <Card className="readCard">
            <Countdown
              date={Date.now() + Questions[counter].readTime * 1000}
              autoStart={false}
              zeroPadTime={4}
              ref={refRead}
              renderer={rendererForRead}
            />
          </Card>
        )}

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
      </div>
    </>
  );
};

export default WebcamStreamCapture;
