import { useRef, useEffect, useState } from 'react';
import Camera from '../components/Camera';
import Card from '../components/Card';
import InterviewQuestions from '../components/InterviewQuestions';
import Timer from '../utils/timer';

const InterviewPage = () => {
  let trueCount = 0,
    falseCount = 0;

  const timer = useRef();
  const webSocket = useRef();
  const webcamRef = useRef();

  const [interviewBegun, setInterviewBegun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readyForInterview, setReadyForInterview] = useState(false);
  const [userHasCamera, setUserHasCamera] = useState(false);

  const faceColor = readyForInterview ? 'red' : 'green';

  const sendFrames = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc === null) return;
    const blobData = await fetch(imageSrc);
    const blob = await blobData.blob();
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

  const onSocketMessage = async (e) => {
    if (typeof e.data === 'object') {
      const buffer = await e.data.arrayBuffer();
      const notOk = new Int8Array(buffer)[0];

      if (notOk) {
        if (trueCount < 3) trueCount++;
        console.log(`true count is ${trueCount}`);
        falseCount = 0;
      } else {
        if (falseCount < 3) falseCount++;
        console.log(`false count is ${falseCount}`);
        trueCount = 0;
      }

      if (trueCount >= 3) {
        setReadyForInterview(true);
      } else if (falseCount >= 3) {
        setReadyForInterview(false);
      }
    }
  };

  const onSocketClose = () => {
    if (timer.current) timer.current.stop();
    console.log(loading);
    if (!loading) {
      // failre after connection has started already
      console.log('Failed! Please restart.');
      return;
    }
    console.log('websocket Closed');
    if (!interviewBegun) {
      webSocket.current = new WebSocket('ws://localhost:8765');
      webSocket.current.addEventListener('open', onSocketOpen);
      webSocket.current.addEventListener('close', onSocketClose);
      webSocket.current.addEventListener('message', onSocketMessage);
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    webSocket.current.addEventListener('open', onSocketOpen);
    webSocket.current.addEventListener('error', onSocketClose);
    webSocket.current.addEventListener('message', onSocketMessage);

    return () => {
      webSocket.current.close();
      timer.current.stop();
    };
  }, []);

  useEffect(() => {
    if (interviewBegun) {
      webSocket.current.close();
      timer.current.stop();
    }
  }, [interviewBegun]);

  const beginInterview = () => {
    setInterviewBegun(true);
  };

  const render = () => {
    if (!interviewBegun) {
      return (
        <Camera
          ref={webcamRef}
          faceColor={faceColor}
          loading={loading}
          webSocket={webSocket.current}
          onUserMedia={() => setUserHasCamera(true)}
          onUserMediaError={() => setUserHasCamera(false)}
        >
          <div className="start-interview">
            <Card className="start-interview-card">
              {userHasCamera && (
                <>
                  <p className="start-interview-title">
                    Make sure your face is in the indicated square and the
                    lighting in the room is bright enough.
                  </p>
                  <button
                    className="start-interview-button"
                    onClick={beginInterview}
                    disabled={readyForInterview}
                  >
                    Start interview
                  </button>
                </>
              )}
              {!userHasCamera && (
                <p className="start-interview-title">
                  No camera detected. Please make sure you connect your camera
                  then refresh this page.
                </p>
              )}
            </Card>
          </div>
        </Camera>
      );
    }

    return (
      <Camera
        ref={webcamRef}
        faceColor={faceColor}
        loading={loading}
        webSocket={webSocket.current}
        interviewBegun={interviewBegun}
        onUserMedia={() => setUserHasCamera(true)}
        onUserMediaError={() => setUserHasCamera(false)}
      >
        <InterviewQuestions ref={webcamRef} />
      </Camera>
    );
  };

  return render();
};

export default InterviewPage;
