import { useContext, useEffect, useRef, useState } from 'react';
import { LoadingContext } from '../App';
import Webcam from 'react-webcam';
import NavBar from '../components/NavBar';
import Timer from '../utils/timer';
import { TailSpin } from 'react-loader-spinner';

import './scss/before-interview.scss';

const BeforeInterviewPage = () => {
  // const { loading, setLoading } = useContext(LoadingContext);

  const webcamRef = useRef(null);
  const webSocket = useRef(null);
  const timer = useRef(null);
  const [loading, setLoading] = useState(true);

  const sendFrames = async () => {
    if (webSocket.current !== null && webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      webSocket.current.send(blob);
    }
  };

  const onSocketOpen = () => {
    setLoading(false);
    console.log('Connection Started');
    timer.current = new Timer(sendFrames, 1000 / 24, () => {});
    timer.current.start();
    console.log('Timer started');
  };

  const onSocketError = () => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    webSocket.current.addEventListener('open', onSocketOpen);
    webSocket.current.addEventListener('error', onSocketError);
  };

  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:8765');
    webSocket.current.addEventListener('open', onSocketOpen);
    webSocket.current.addEventListener('error', onSocketError);
    return () => webSocket.current.close();
  }, []);

  const render = () => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      );
    }
    return (
      <>
        <NavBar />
        <div className="before-interview">
          <Webcam
            audio={true}
            ref={webcamRef}
            muted={true}
            screenshotFormat="image/png"
            className="video"
          />
        </div>
      </>
    );
  };
  return render();
};

export default BeforeInterviewPage;
