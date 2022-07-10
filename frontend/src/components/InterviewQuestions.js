import React, { useRef, useState, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import Card from './Card';
import { ApplicantURL } from '../API/APIConstants';
import { Link } from 'react-router-dom';
import handleAPIError from '../utils/APIErrorHandling';
import ErrorModal from './ErrorModal';
import SuccessfullModal from './SuccessfullModal';
import { TailSpin } from 'react-loader-spinner';

const InterviewQuestions = React.forwardRef((props, webcamRef) => {
  const [upload, setUpload] = useState(false);
  const [lastVideo, setLastVideo] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const mediaRecorderRef = useRef();
  const recordTimeout = useRef();
  const [questions, setQuestions] = useState([]);
  const [questionsResponse, setQuestionsResponse] = useState();
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visible, setVisibility] = useState('hidden');
  const [counter, setCounter] = useState(0);
  const [readTimerVisibility, setReadTimer] = useState('visible');
  const [error, setError] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    setQuestions(props.response.questions);
    setQuestionsResponse(props.response);
  }, [props.response]);
  let secAnswerTime, minAnswerTime;
  const interval = 1000;

  const [timeLeftRead, { start: startRead }] = useCountDown(
    questions ? questions[counter]?.timeToThink * 1000 : 0,
    interval
  ); //60

  const [
    timeLeftAnswer,
    { start: startAnswer, pause: pauseAnswer, reset: resetAnswer },
  ] = useCountDown(
    questions ? questions[counter]?.timeToAnswer * 1000 * 60 : 0,
    interval
  ); //60

  const renderReadTime = (time) => {
    if (!questions || !questions[counter]) return '0:00';
    let secTime, minTime;
    minTime = parseInt(time / 1000 / 60); // /60
    secTime = parseInt((time / 1000) % 60); // %60

    if (time === 0) {
      if (questions[counter].timeToThink < 10)
        return '0' + questions[counter].timeToThink.toString() + ':00';
      return questions[counter].timeToThink.toString() + ':00';
    } else if (time > 0) {
      if (minTime < 10 && secTime < 10) {
        return '0' + minTime.toString() + ':0' + secTime.toString();
      } else if (minTime < 10 && secTime >= 10) {
        return '0' + minTime.toString() + ':' + secTime.toString();
      } else if (minTime >= 10 && secTime < 10) {
        return '0' + minTime.toString() + ':0' + secTime.toString();
      } else if (minTime >= 10 && secTime >= 10) {
        return minTime.toString() + ':' + secTime.toString();
      }
    }
    return minTime.toString() + ':' + secTime.toString();
  };

  const renderAnswerTime = (time) => {
    if (!questions || !questions[counter]) return '0:00';
    minAnswerTime = parseInt(time / 1000 / 60); // /60
    secAnswerTime = parseInt((time / 1000) % 60); // %60
    if ((start || !next) && time === 0) {
      if (questions[counter].timeToAnswer < 10)
        return '0' + questions[counter].timeToAnswer.toString() + ':00';
      return questions[counter].timeToAnswer.toString() + ':00';
    } else if (time > 0) {
      if (minAnswerTime < 10 && secAnswerTime < 10) {
        return '0' + minAnswerTime.toString() + ':0' + secAnswerTime.toString();
      } else if (minAnswerTime < 10 && secAnswerTime >= 10) {
        return '0' + minAnswerTime.toString() + ':' + secAnswerTime.toString();
      } else if (minAnswerTime === 10 && secAnswerTime >= 10) {
        return minAnswerTime.toString() + ':' + secAnswerTime.toString();
      } else if (minAnswerTime === 10 && secAnswerTime < 10) {
        return minAnswerTime.toString() + ':0' + secAnswerTime.toString();
      }
    } else if (minAnswerTime === 0 && secAnswerTime === 0) return '00:00';
    return minAnswerTime.toString() + ':' + secAnswerTime.toString();
  };

  const startInterview = () => {
    setRecordedChunks([]);
    startRead(questions[counter].timeToThink * 1000 * 60); //60
    if (visible === 'hidden') setVisibility('visible');
    if (start) setStart(false);

    setTimeout(() => {
      handleStartCaptureClick();
    }, questions[counter].timeToThink * 1000 * 60); //60

    recordTimeout.current = setTimeout(() => {
      if (!next) setNext(true);
      setStop((stop) => {
        if (stop) {
          handleStopCaptureClick(null, true);
          return false;
        }
        return false;
      });
    }, questions[counter].timeToThink * 1000 * 60 + questions[counter].timeToAnswer * 1000 * 60); //60 //60
  };

  const handleStartCaptureClick = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm;codecs="vp8,opus"',
      videoBitsPerSecond: 125000,
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    startAnswer(questions[counter].timeToAnswer * 1000 * 60); //60
    if (!stop) setStop(true);
    if (readTimerVisibility === 'visible') setReadTimer('hidden');
  }, [webcamRef, setStop, mediaRecorderRef, counter, questions]);

  const handleDataAvailable = useCallback(
    async ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(
    (e, isNonManualStop) => {
      setUpload(true);
      setUploadingVideo(true);
      if (counter > questions.length - 2) {
        setLastVideo(true);
        setNext(false);
      }
      clearTimeout(recordTimeout.current);
      if (!next) setNext(true);
      if (!isNonManualStop) pauseAnswer();
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (stop) setStop(false);
    },
    [mediaRecorderRef, webcamRef, stop, setStop, counter, questions]
  );

  const handleNext = () => {
    setCounter((counter) => counter + 1);
    setReadTimer('visible');
    setNext(false);

    setStart(true);
    resetAnswer(questions[counter].timeToAnswer * 1000 * 60); //60
    setVisibility('hidden');
    setStop(false);
  };
  const handleUpload = async () => {
    setUploadLoading(true)
    setUpload(false);
    if (counter === questions.length - 2) {
      setNext(false);
    }
    if (recordedChunks.length) {
      const videoBlob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const fileReader = new FileReader();
      fileReader.onload = async function (event) {
        const readArrayBuffer = event.target.result;
        const readUint8Array = new Uint8Array(readArrayBuffer);
        const fileName = `${
          questionsResponse.interviewId
        }-${new Date().getTime()}`;
        for (let i = 0; i < readUint8Array.length; i += 5e6) {
          const chunk = readUint8Array.slice(i, i + 5e6);
          let statusCode;
          try {
            const response = await fetch(
              `${ApplicantURL}/candidate/upload-video`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  interviewId: questionsResponse.interviewId,
                  questionId: questions[counter].questionId,
                  video: Array.from(chunk),
                  videoExtension: 'webm',
                  lastVideo: lastVideo,
                  name: fileName,
                  end: i + 5e6 >= readUint8Array.length ? true : false,
                }),
              }
            );
            statusCode = response.status;
            const data = await response.json();
            if (statusCode === 200) {
              setUploadLoading(false);
              setUploadingVideo(false);
              setDone(true);
              setNext(true);
            } else {
              handleAPIError(statusCode, data, setError);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
      fileReader.readAsArrayBuffer(videoBlob);
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  const closeWindow = () => {
    setDone(false);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {done && (
        <SuccessfullModal
          title="Video Uploaded Successfully"
          closeWindow={closeWindow}
        />
      )}
      <div className="questionspart">
        <>
          <div style={{ visibility: visible }}>
            <Card className="interview_questions">
              <p className="questionTitle">{questions[counter]?.statement}</p>
            </Card>
            <Card className="readCard">
              <span className="TimeToThink_label"> Answer Time: </span>
              <p className="readtimer">{renderAnswerTime(timeLeftAnswer)}</p>
            </Card>
          </div>

          <br />
          <div style={{ visibility: readTimerVisibility }}>
            <Card className="readCard">
              <span className="TimeToThink_label"> Think Time: </span>
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
          
          {upload && (
            <button onClick={handleUpload} className="buttons">
              Upload
            </button>
          )}
          {uploadLoading && ( 
          <div
            style={{
              display:'flex',
              justifyContent : 'center'

            }}
          >
            <TailSpin color="hsl(215deg, 79%, 42%)" height={60} width={60} />
          </div>
          )}
          {next && !lastVideo && (
            <button
              onClick={handleNext}
              className="buttons"
              disabled={uploadingVideo}
            >
              Next Qusetion
            </button>
          )}
          {lastVideo && !uploadingVideo && (
            <button className="buttons">
              <Link to="/finish">Finish</Link>
            </button>
          )}
        </>
      </div>
    </>
  );
});

export default InterviewQuestions;
