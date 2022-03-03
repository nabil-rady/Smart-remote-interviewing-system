from keras.models import load_model
from time import sleep
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
import cv2
import numpy as np

face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
classifier =load_model('./Emotion_Detection.h5')

class_labels = ['Angry','Happy','Neutral','Sad','Surprise']


class emotionDetect:
    status = []
    def __init__(self,path):
        cap = cv2.VideoCapture(path)
        while cap.isOpened():
            # Grab a single frame of video
            ret, frame = cap.read()
            try:
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_classifier.detectMultiScale(gray, 1.3, 5)
                for (x, y, w, h) in faces:
                    #cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
                    roi_gray = gray[y:y + h, x:x + w]
                    roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

                    if np.sum([roi_gray]) != 0:
                        roi = roi_gray.astype('float') / 255.0
                        roi = img_to_array(roi)
                        roi = np.expand_dims(roi, axis=0)

                        # make a prediction on the ROI, then lookup the class

                        preds = classifier.predict(roi)[0]
                        label = class_labels[preds.argmax()]
                        #print(label)
                        self.status.append(label)
            except:
                break
        cap.release()
        cv2.destroyAllWindows()
    def user_status(self):
        res = []
        count = [0, 0, 0, 0, 0]
        for i in range(len(self.status)):
            if class_labels[0] == self.status[i]:
                count[0] = count[0] + 1
            elif class_labels[1] == self.status[i]:
                count[1] = count[1] + 1
            elif class_labels[2] == self.status[i]:
                count[2] = count[2] + 1
            elif class_labels[3] == self.status[i]:
                count[3] = count[3] + 1
            else:
                count[4] = count[4] + 1
        for i in range(len(count)):
            res.append([class_labels[i], count[i] / len(self.status)])
        return res
