import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import useCountDown from 'react-countdown-hook';
import Webcam from 'react-webcam';
import useDimensions from 'react-cool-dimensions';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import Timer from '../utils/timer';
import { TailSpin } from 'react-loader-spinner';

import './scss/videopage.scss';

const WebcamStreamCapture = () => {
  const [faceColor, setFaceColor] = useState('red');
  let trueCount = 0,
    falseCount = 0;
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

  const webcamRef = useRef();
  const mediaRecorderRef = useRef();
  const timer = useRef();
  const webSocket = useRef();
  const recordTimeout = useRef();
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visible, setVisibility] = useState('hidden');
  const [counter, setCounter] = useState(0);
  const [readTimerVisibility, setReadTimer] = useState('visible');
  const [loading, setLoading] = useState(true);
  const { observe, width: videoWidth, height: videoHeight } = useDimensions();
  const smallScreen = useMediaQuery('only screen and (max-width: 900px)');

  const sendFrames = async () => {
    i++;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc === null) return;
    const blobData = await fetch(imageSrc);
    const blob = await blobData.blob();
    console.log(blob, i);
    if (webSocket.current) webSocket.current.send(blob);
  };

  const onSocketOpen = () => {
    setLoading(false);
    console.log('Connection Started');
    webSocket.current.send('Hello Server!');
    timer.current = new Timer(sendFrames, 1000 / 3, () => {});
    timer.current.start();
    console.log('Timer started');
  };

  const onSocketClose = () => {
    if (timer.current) timer.current.stop();
    if (webSocket.current) webSocket.current.close();
    webSocket.current = new WebSocket('ws://localhost:8765');
    webSocket.current.addEventListener('open', onSocketOpen);
    webSocket.current.addEventListener('close', onSocketClose);
    console.log('websocket Closed');
  };

  const [timeLeftRead, { start: startRead }] = useCountDown(
    Questions[counter].readTime * 1000,
    interval
  );

  const [timeLeftAnswer, { start: startAnswer, pause: pauseAnswer }] =
    useCountDown(Questions[counter].answerTime * 1000, interval);

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    webSocket.current.addEventListener('open', onSocketOpen);
    webSocket.current.addEventListener('error', onSocketClose);
    webSocket.current.addEventListener('message', function (event) {
      console.log(`Message ${event.data}`);
      if (event.data === 'True') {
        trueCount++;
        falseCount = 0;
      }

      if (event.data === 'False') {
        falseCount++;
        trueCount = 0;
      }

      console.log(`True ${trueCount}, false ${falseCount}`);
      if (trueCount > 5) setFaceColor('red');
      else if (falseCount > 5) setFaceColor('green');
    });
    return () => webSocket.current.close();
  }, []);

  // useEffect(() => {
  //   if (webSocket.current) {
  //     webSocket.current.addEventListener('message', function (event) {
  //       console.log(`Message ${event.data}`);
  //     });
  //   }
  // }, [webSocket]);

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
    timer.current.start();
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
        // webSocket.current.send(blob);
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
        timer.current.stop();
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

  const render = () => {
    if (loading)
      return (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50vh - 40px)',
            left: 'calc(50vw - 40px)',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      );
    return (
      <>
        <NavBar />
        <div className="interview-page">
          <div
            className="face"
            style={{
              width: `${faceWidth}px`,
              height: `${faceHeight}px`,
              left: `calc(${
                videoWidth / 2 - faceWidth / 2
              }px + ${leftMargin}rem )`,
              top: `${0.15 * videoHeight}px`,
              border: `2px solid ${faceColor}`,
            }}
          ></div>
          <Webcam
            audio={true}
            ref={(el) => {
              webcamRef.current = el;
              observe(el?.video);
            }}
            muted={true}
            screenshotFormat="image/png"
            className="video"
          />
          <div className="questionspart">
            <div style={{ visibility: visible }}>
              <Card className="questions">
                <p className="answertimer">
                  {renderAnswerTime(timeLeftAnswer)}
                </p>
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

  const faceWidth = 0.5 * videoWidth;
  const faceHeight = 0.55 * videoHeight;
  const leftMargin = !smallScreen ? 3 : 0;
  return render();
};

export default WebcamStreamCapture;
