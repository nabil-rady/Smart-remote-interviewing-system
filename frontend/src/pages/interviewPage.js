import React, { useRef, useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import Webcam from 'react-webcam';
import Card from '../components/Card';
import NavBar from '../components/NavBar';

import './scss/videopage.scss';

const WebcamStreamCapture = () => {
  let i = 0;
  let Questions = [
    {
      title:
        'How are you nfslbknnfl snblkaj;ha; hgrhah;hg f;hljsjf;ls klhklskjfhl;rshj;l lkjrhjs;lrjljl;sb kljgrjs;ljbsj ljgs;j.bl;jg srgj;jsl;bb',
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
  const [visible, setVisibility] = useState('hidden');
  const [counter, setCounter] = useState(0);
  const [readTimerVisibility, setReadTimer] = useState('visible');

  const [timeLeftRead, { start: startRead }] = useCountDown(
    Questions[counter].readTime * 1000,
    interval
  );

  const [timeLeftAnswer, { start: startAnswer, pause: pauseAnswer }] =
    useCountDown(Questions[counter].answerTime * 1000, interval);

  const webSocket = useRef();
  const recordTimeout = useRef();

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    return () => webSocket.current.close();
  }, []);

  useEffect(() => {
    if (webSocket.current) {
      webSocket.current.addEventListener('open', function (event) {
        webSocket.current.send('Hello Server!');
      });
      webSocket.current.addEventListener('message', function (event) {
        console.log(`Message ${event.data}`);
      });
    }
  }, [webSocket]);

  const renderReadTime = (time) => {
    let secTime, minTime;
    if (time === 0) {
      if (Questions[counter].readTime < 10)
        return '0' + Questions[counter].readTime.toString();
      return Questions[counter].readTime.toString();
    } else if (Questions[counter].readTime < 10) {
      return '0' + (time / 1000).toString();
    }
    return (time / 1000).toString();
  };

  const renderAnswerTime = (time) => {
    let secTime, minTime;
    if ((start || !next) && time === 0) {
      if (Questions[counter].answerTime < 10)
        return '0' + Questions[counter].answerTime.toString();
      return Questions[counter].answerTime.toString();
    } else if (Questions[counter].answerTime < 10) {
      return '0' + (time / 1000).toString();
    }
    return (time / 1000).toString();
  };

  const startInterview = () => {
    setRecordedChunks([]);
    startRead(Questions[counter].readTime * 1000);
    if (visible === 'hidden') setVisibility('visible');
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
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    startAnswer(Questions[counter].answerTime * 1000);
    console.log('Created MediaRecorder');
    if (!stop) setStop(true);
    if (readTimerVisibility === 'visible') setReadTimer('hidden');
  }, [webcamRef, setStop, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    async ({ data }) => {
      if (data.size > 0) {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then((res) => res.blob());
        i++;
        console.log(blob, i);
        webSocket.current.send(blob);
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
    setReadTimer('visible');
    setNext(false);
    setStart(true);
    setVisibility('hidden');
    setStop(false);
  };

  return (
    <>
      <NavBar />
      <div className="interview-page">
        <Webcam
          audio={true}
          ref={webcamRef}
          muted={true}
          screenshotFormat="image/png"
          className="video"
        />

        <div className="questionspart">
          <div style={{ visibility: visible }}>
            <Card className="questions">
              <p className="answertimer">{renderAnswerTime(timeLeftAnswer)}</p>
              <p className="questionTitle">{Questions[counter].title}</p>
            </Card>
          </div>

          <br />
          <div style={{ visibility: readTimerVisibility }}>
            <Card className="readCard">
              <p className="readtimer">{renderReadTime(timeLeftRead)}</p>
            </Card>
          </div>

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
          {/* {recordedChunks.length > 0 && (
            <button onClick={handleDownload}>Download</button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default WebcamStreamCapture;
