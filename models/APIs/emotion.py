from keras.models import load_model
from time import sleep
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
import cv2
import numpy as np

face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
classifier =load_model('./Emotion_Detection.h5')

class_labels = ['Angry','Happy','Neutral','Sad','Surprise']

###############################
"""Emotion recognetion model"""
#inp : name of video to be analysed , ex : video150.mp4 
# status : empty array to save status
###############################
def emo(inp,status):
    cap = cv2.VideoCapture(inp)
    while True:
        # Grab a single frame of video
        ret, frame = cap.read()
        labels = []
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray,1.3,5)

        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
            roi_gray = gray[y:y+h,x:x+w]
            roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)


            if np.sum([roi_gray])!=0:
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi,axis=0)

            # make a prediction on the ROI, then lookup the class

                preds = classifier.predict(roi)[0]
                print("\nprediction = ",preds)
                label=class_labels[preds.argmax()]
                print("\nprediction max = ",preds.argmax())
                print("\nlabel = ",label)
                status.append(label)
                label_position = (x,y)
                #cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
            #else:
                #cv2.putText(frame,'No Face Found',(20,60),cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
            print("\n\n")
        #cv2.imshow('Emotion Detector',frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
#################
"""User status"""
# return user status in 2d array form
# r = user_status(status)
# print(r) ==> [['Angry', 0.13333333333333333], ['Happy', 0.4], ['Neutral', 0.2], ['Sad', 0.13333333333333333], ['Surprise', 0.13333333333333333]]
#################
def user_status(status):
    res = []
    count = [0,0,0,0,0]
    for i in range(len(status)):
        if class_labels[0] == status[i]:
            count[0] = count[0] + 1
        elif class_labels[1] == status[i]:
            count[1] = count[1] + 1
        elif class_labels[2] == status[i]:
            count[2] = count[2] + 1
        elif class_labels[3] == status[i]:
            count[3] = count[3] + 1
        else:
            count[4] = count[4] + 1
    for i in range(len(count)):
        res.append([class_labels[i],count[i] / len(status)])
    return res




















