import React, { useState, useEffect } from 'react';
import Nav from '../components/NavBar';
import "./css/video.css"
const Videopage = () => {
    
    let recordingTimeMS = 5000;
    
    const log = (msg) => {
        const logElement = document.getElementById("log");
        logElement.innerHTML += msg + "\n";
    }
    
    const wait = (delayInMS) => {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
    }
    
    const startRecording = (stream, lengthInMS) => {
        let recorder = new MediaRecorder(stream);
        let data = [];
        
        recorder.ondataavailable = event => data.push(event.data);
        recorder.start();
        log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");
        
        let stopped = new Promise((resolve, reject) => {
            recorder.onstop = resolve;
            recorder.onerror = event => reject(event.name);
        });
        
        let recorded = wait(lengthInMS).then(() => recorder.state == "recording" && recorder.stop());
    
        return Promise.all([
            stopped,
            recorded
        ])
        .then(() => data);
    }
    
    const stop = (stream) => {
        stream.getTracks().forEach(track => track.stop());
    }
    
    const startHandler = () => {
        let downloadButton = document.getElementById("downloadButton");
        let recording = document.getElementById("recording");
        let preview = document.getElementById("preview");
        navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
        }).then(stream => {
        preview.srcObject = stream;
        downloadButton.href = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        return new Promise(resolve => preview.onplaying = resolve);
        }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
        .then (recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";
        
        log("Successfully recorded " + recordedBlob.size + " bytes of " +
            recordedBlob.type + " media.");
        })
        .catch(log);
    }
    
    function stopHandler () {
        let preview = document.getElementById("preview");
        stop(preview.srcObject);
    }
  return (
    <div>
        <Nav />
        <div className="interview">
            <div className="left">
                <div id="startButton" className="button" onClick={startHandler}>
                    Start
                </div>
                <h2>Preview</h2>
                <video id="preview" width="160" height="120" autoPlay="" muted=""></video>
            </div>

            <div className="right">
                <div id="stopButton" className="button" onClick={stopHandler}>
                    Stop
                </div>
                <h2>Recording</h2>
                <video id="recording" width="160" height="120" controls=""></video>
                <a id="downloadButton" className="button">
                Download
                </a>
            </div>

            <div className="bottom">
                <pre id="log"></pre>
            </div>
        </div>
        
    </div>
  );
}

export default Videopage;