import { useEffect, useRef } from 'react';
import video from '../videos/AES Summary.mp4';
export default function TestSockets() {
  const webSocket = useRef();
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
        // let decodedVideo = new Buffer.from(event.data, 'base64');
      });
    }
  }, [webSocket]);
  return (
    <dev>
      Tesssssssst
      <video></video>
    </dev>
  );
}
