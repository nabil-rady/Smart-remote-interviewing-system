import numpy as np
import cv2
import os
import threading

cascPath=os.path.dirname(cv2.__file__)+"/data/haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascPath)

stop_the_thread = False

class VideoCamera(object):
    count = 0

    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        if self.count < 10:
            # Capture frame-by-frame
            ret, frames = self.video.read()
            gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
            s = np.average(gray)
            # print(np.ceil(s))
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.1,
                minNeighbors=5,
                minSize=(30, 30),
                flags=cv2.CASCADE_SCALE_IMAGE
            )
            # Draw a rectangle around the faces
            for (x, y, w, h) in faces:
                centre_x = x + w / 2
                centre_y = y + y / 2
                height, width, channels = frames.shape
                if np.ceil(s) < 60:
                    cv2.rectangle(frames, (170, 90), (470, 390), (0, 0, 255), 2)
                elif (centre_x < (width / 2 - 50) or centre_x > (width / 2 + 50)) and (
                        centre_y < (height / 2 - 20) or centre_y > (height / 2 + 20)):
                    cv2.rectangle(frames, (x, y), (x + w, y + h), (0, 0, 255), 2)
                else:
                    cv2.rectangle(frames, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    self.count = self.count + 1
            # Display the resulting frame
            ret, jpeg = cv2.imencode('.jpg', frames)
            return jpeg.tobytes()
        else:
            return None

