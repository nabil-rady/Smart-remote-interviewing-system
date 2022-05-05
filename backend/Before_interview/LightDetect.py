import cv2
import numpy as np

# class used to detect face position and light intensity (input -> image as bytes // output -> bytes)
"""
########################################################
How to use?
########################################################
while True:
	light_face_detect_instance = lightFaceDetect(data)
	output = light_face_detect_instance.returnedBytes()
""" 

class lightFaceDetect:
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    output = bytes()
    def __init__(self,data):
        img = self.bts_to_img(data)
        #cv2.imshow('', img)
        #cv2.waitKey(0)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        s = np.average(gray)
        faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
        for (x, y, w, h) in faces:
            #centre_x = x + w / 2
            #centre_y = y + y / 2
            height, width, channels = img.shape
            if (x >= (0.15 * width) and y >= (0.05 * height)) and ((x+w) <= (0.85 * width) and (y+h) <= (0.8 * height)) and np.ceil(s) > 60:
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            else:
                cv2.rectangle(img, (int(0.15 * width), int(0.05 * height)), (int(0.85 * width), int(0.8 * height)), (0, 0, 255), 2)
        self.output = self.image_to_bts(img)

    def image_to_bts(self,frame):
        _, bts = cv2.imencode('.jpg', frame)
        bts = bts.tobytes()
        return bts

    def bts_to_img(self,bts):
        buff = np.frombuffer(bts, np.uint8)
        buff = buff.reshape(1, -1)
        img = cv2.imdecode(buff, cv2.IMREAD_COLOR)
        return img

    def returnedBytes(self):
        return self.output
