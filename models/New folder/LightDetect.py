import cv2
import numpy as np

class lightFaceDetect:
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    def __init__(self,path):
        img = cv2.imread(path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        s = np.average(gray)
        faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
        for (x, y, w, h) in faces:
            centre_x = x + w / 2
            centre_y = y + y / 2
            height, width, channels = img.shape
            if (x >= (0.15 * width) and y >= (0.05 * height)) and ((x+w) <= (0.85 * width) and (y+h) <= (0.8 * height)):
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            else:
                cv2.rectangle(img, (int(0.15 * width), int(0.05 * height)), (int(0.85 * width), int(0.8 * height)), (0, 0, 255), 2)
        cv2.imwrite(path, img)