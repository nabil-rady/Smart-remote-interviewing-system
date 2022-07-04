import { useRef, useEffect, useState } from 'react';
import { WSURL } from '../API/APIConstants';
import Camera from '../components/Camera';
import Card from '../components/Card';
import InterviewQuestions from '../components/InterviewQuestions';
import Timer from '../utils/timer';

const InterviewPage = (props) => {
  const timer = useRef();
  const webSocket = useRef();
  const webcamRef = useRef();
  const [interviewBegun, setInterviewBegun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readyForInterview, setReadyForInterview] = useState(true);
  const [userHasCamera, setUserHasCamera] = useState(false);

  const faceColor = readyForInterview ? 'red' : 'green';
  const sendFrames = async () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 480,
      height: 360,
    });
    if (imageSrc === null) return;
    const blobData = await fetch(imageSrc);
    const blob = await blobData.blob();
    if (webSocket.current) webSocket.current.send(blob);
  };

  const onSocketOpen = () => {
    setLoading(false);
    console.log('Connection Started');
    webSocket.current.send('Hello Server!');
    timer.current = new Timer(sendFrames, 1500 / 2);
    timer.current.start();
  };

  const onSocketMessage = async (e) => {
    if (e.data === 'True') {
      setReadyForInterview(true);
    } else {
      setReadyForInterview(false);
    }
  };

  const onSocketClose = () => {
    if (timer.current) timer.current.stop();
    if (!loading) {
      // failre after connection has started already
      console.log('Failed! Please restart.');
      return;
    }
    console.log('Websocket Closed');
    if (!interviewBegun) {
      webSocket.current = new WebSocket(WSURL);
      webSocket.current.addEventListener('open', onSocketOpen);
      webSocket.current.addEventListener('close', onSocketClose);
      webSocket.current.addEventListener('message', onSocketMessage);
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket(WSURL);
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
        <InterviewQuestions ref={webcamRef} response={props.response} />
      </Camera>
    );
  };

  return render();
};

export default InterviewPage;
