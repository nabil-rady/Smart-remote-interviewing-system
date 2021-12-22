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

  let webSocket;
  let recordTimeout;
  const refRead = useRef();
  const refAnswer = useRef();

  const handleReadStart = (e) => {
    refRead.current?.start();
  };

  const handleAnswerStart = (e) => {
    refAnswer.current?.start();
  };

  const handleAnswerPause = (e) => {
    console.log('record paused');
    refAnswer.current?.pause();
  };

  useEffect(() => {
    webSocket = new WebSocket('ws://localhost:8080', 'echo-protocol');
    return () => webSocket.close();
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
    setVisibility(true);
    setStart(false);
    handleReadStart();
    setTimeout(() => {
      handleStartCaptureClick();
      console.log('start recording...');
    }, Questions[counter].readTime * 1000);

    recordTimeout = setTimeout(() => {
      setNext(true);
      // console.log("stop recording...")
      setStop((stop) => {
        console.log(stop);
        if (stop) {
          handleStopCaptureClick();
          return false;
        }
        return true;
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
    console.log('recording....');
    setStop(true);
    setReadTimer(false);
    handleAnswerStart();
  }, [webcamRef, setStart, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        webSocket.send(data);
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    console.log('ALOOO');
    clearTimeout(recordTimeout);
    setNext(true);
    handleAnswerPause();
    if (stop) {
      mediaRecorderRef.current.stop();
    }
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
  // const renderer = ({ api }) => {
  //   api.start();
  // };
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
