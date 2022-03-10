import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import useCountDown from 'react-countdown-hook';
import Card from './Card';
import { ApplicantURL } from '../API/APIConstants';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import handleAPIError from '../utils/APIErrorHandling';
import { UserContext } from '../App';

const InterviewQuestions = React.forwardRef((props, webcamRef) => {
  let i = 0;
  const params = useParams();
  const interviewId = params.interviewId;
  const mediaRecorderRef = useRef();
  const recordTimeout = useRef();
  const [questions, setQuestions] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [stop, setStop] = useState(false);
  const [visible, setVisibility] = useState('hidden');
  const [counter, setCounter] = useState(0);
  const [readTimerVisibility, setReadTimer] = useState('visible');
  const setAuthUser = useContext(UserContext).setAuthUser;
  // const [secAnswerTime, setAnswerSecTime] = useState();
  // const [minAnswerTime, setAnswerMinTime] = useState();
  let secAnswerTime, minAnswerTime;

  const fetchQuestions = () => {
    return fetch(`${ApplicantURL}/candidate/join/${interviewId}`);
  };

  useEffect(() => {
    const setFetchedQuestions = async () => {
      const response = await fetchQuestions();
      const data = await response.json();
      if (response.status === 200) {
        setQuestions(data.questions);
      } else {
        handleAPIError(
          response.status,
          data,
          () => {},
          () => setAuthUser(null)
        );
      }
    };
    setFetchedQuestions();
  }, []);

  // let questions = [
  //   {
  //     statement:
  //       'How are you nfslbknnfl snblkaj;ha; hgrhah;hg f;hljsjf;ls klhklskjfhl;rshj;l lkjrhjs;lrjljl;sb kljgrjs;ljbsj ljgs;j.bl;jg srgj;jsl;bb',
  //     timeToThink: 0.5,
  //     timeToAnswer: 0.5,
  //   },
  //   {
  //     statement: 'State your skills',
  //     timeToThink: 6,
  //     timeToAnswer: 8,
  //   },
  //   {
  //     statement: "What's your name",
  //     timeToThink: 5,
  //     timeToAnswer: 5,
  //   },
  // ];

  const interval = 1000;

  const [timeLeftRead, { start: startRead }] = useCountDown(
    questions ? questions[counter]?.timeToThink * 60 * 1000 : 0,
    interval
  );

  const [
    timeLeftAnswer,
    { start: startAnswer, pause: pauseAnswer, reset: resetAnswer },
  ] = useCountDown(
    questions ? questions[counter]?.timeToAnswer * 60 * 1000 : 0,
    interval
  );

  const renderReadTime = (time) => {
    if (!questions || !questions[counter]) return '0:00';
    let secTime, minTime;
    minTime = parseInt(time / 1000 / 60);
    secTime = parseInt((time / 1000) % 60);

    if (time === 0) {
      if (questions[counter].timeToThink < 10)
        return '0' + questions[counter].timeToThink.toString() + ':00';
      return questions[counter].timeToThink.toString() + ':00';
    } else if (time > 0) {
      if (minTime < 10 && secTime < 10) {
        return '0' + minTime.toString() + ':0' + secTime.toString();
      } else if (minTime < 10 && secTime >= 10) {
        return '0' + minTime.toString() + ':' + secTime.toString();
      }
    }
    return minTime.toString() + secTime.toString();
  };

  const renderAnswerTime = (time) => {
    if (!questions || !questions[counter]) return '0:00';
    // setAnswerMinTime(parseInt(time / 1000 / 60));
    // setAnswerSecTime(parseInt((time / 1000) % 60));

    minAnswerTime = parseInt(time / 1000 / 60);
    secAnswerTime = parseInt((time / 1000) % 60);
    if ((start || !next) && time === 0) {
      if (questions[counter].timeToAnswer < 10)
        return '0' + questions[counter].timeToAnswer.toString() + ':00';
      return questions[counter].timeToThink.toString() + ':00';
    } else if (time > 0) {
      if (minAnswerTime < 10 && secAnswerTime < 10) {
        return '0' + minAnswerTime.toString() + ':0' + secAnswerTime.toString();
      } else if (minAnswerTime < 10 && secAnswerTime >= 10) {
        return '0' + minAnswerTime.toString() + ':' + secAnswerTime.toString();
      }
    } else if (minAnswerTime === 0 && secAnswerTime === 0) return '00:00';
    return minAnswerTime.toString() + secAnswerTime.toString();
  };

  const startInterview = () => {
    setRecordedChunks([]);
    startRead(questions[counter].timeToThink * 60 * 1000);
    if (visible === 'hidden') setVisibility('visible');
    if (start) setStart(false);

    setTimeout(() => {
      handleStartCaptureClick();
      console.log('Start recording (setTimeout)');
    }, questions[counter].timeToThink * 60 * 1000);

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
    }, questions[counter].timeToThink * 60 * 1000 + questions[counter].timeToAnswer * 60 * 1000);
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
    startAnswer(questions[counter].timeToAnswer * 60 * 1000);
    console.log('Created MediaRecorder');
    if (!stop) setStop(true);
    if (readTimerVisibility === 'visible') setReadTimer('hidden');
  }, [webcamRef, setStop, mediaRecorderRef, counter, questions]);

  const handleDataAvailable = useCallback(
    async ({ data }) => {
      if (data.size > 0) {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then((res) => res.blob());

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
      }
      if (stop) setStop(false);
    },
    [mediaRecorderRef, webcamRef, stop, setStop, counter, questions]
  );

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      console.log(recordedChunks);
      console.log(btoa(blob));
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
    resetAnswer(questions[counter].timeToAnswer * 60 * 1000);
    setVisibility('hidden');
    setStop(false);
  };

  return (
    <div className="questionspart">
      {questions.length !== 0 ? (
        <>
          <div style={{ visibility: visible }}>
            <Card className="questions">
              <p className="answertimer">{renderAnswerTime(timeLeftAnswer)}</p>
              <p className="questionTitle">{questions[counter]?.statement}</p>
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
          {recordedChunks.length > 0 && (
            <button onClick={handleDownload}>Download</button>
          )}
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: 'calc(30vh - 50px)',
            left: 'calc(70vw - 40px)',
          }}
        >
          <TailSpin color="hsl(215deg, 79%, 42%)" height={80} width={80} />
        </div>
      )}
    </div>
  );
});

export default InterviewQuestions;
