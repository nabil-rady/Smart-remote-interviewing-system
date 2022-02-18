import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import NavBar from '../components/NavBar';
import Timer from '../utils/timer';

import './scss/before-interview.scss';

const BeforeInterviewPage = () => {
    const webcamRef = useRef(null);
    const webSocket = useRef(null);
    const timer = useRef(null);

    const sendFrames = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then((res) => res.blob());
        webSocket.current.send(blob);
    };

    useEffect(() => {
        webSocket.current = new WebSocket('ws://localhost:8765');
        timer.current = new Timer(sendFrames, 1000/24, () => {});
        return () => webSocket.current.close();
    }, []);

    useEffect(() => {
        if (timer.current !== null){
            console.log(`Timer started`);
            timer.current.start();
        }
    }, [timer])

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

    return (
        <>
            <NavBar />
            <div className='before-interview'>
                <Webcam
                    audio={true}
                    ref={webcamRef}
                    muted={true}
                    screenshotFormat="image/png"
                    className="video"
                />
            </div>
        </>
    )
}

export default BeforeInterviewPage;
