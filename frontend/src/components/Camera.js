import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Webcam from 'react-webcam';
import useDimensions from 'react-cool-dimensions';
import NavBar from '../components/NavBar';
import { TailSpin } from 'react-loader-spinner';
import '../pages/scss/videopage.scss';

const Camera = React.forwardRef((props, webcamRef) => {
  const { observe, width: videoWidth, height: videoHeight } = useDimensions();

  const smallScreen = useMediaQuery('only screen and (max-width: 900px)');
  const faceWidth = 0.5 * videoWidth;
  const faceHeight = 0.55 * videoHeight;
  const leftMargin = !smallScreen ? 3 : 0;

  const renderFace = () => {
    if (props.interviewBegun) {
      return null;
    }
    return (
      <div
        className="face"
        style={{
          width: `${faceWidth}px`,
          height: `${faceHeight}px`,
          left: `calc(${videoWidth / 2 - faceWidth / 2}px + ${leftMargin}rem )`,
          top: `${0.15 * videoHeight}px`,
          border: `2px solid ${props.faceColor}`,
        }}
      ></div>
    );
  };
  const render = () => {
    if (props.loading) {
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
    }
    return (
      <>
        <NavBar />
        <div className="interview-page">
          {renderFace()}
          <Webcam
            audio={true}
            ref={(el) => {
              webcamRef.current = el;
              observe(el?.video);
            }}
            muted={true}
            width={480}
            height={360}
            screenshotFormat="image/webp"
            className="video"
            onUserMedia={props.onUserMedia}
            onUserMediaError={props.onUserMediaError}
            videoConstraints={{
              width: 480,
              height: 360,
              facingMode: 'user',
            }}
            screenshotQuality={0.5}
          />
          {props.children}
        </div>
      </>
    );
  };
  return render();
});

export default Camera;
