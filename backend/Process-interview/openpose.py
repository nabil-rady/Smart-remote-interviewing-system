import cv2
import numpy as np

BODY_PARTS = {"Nose": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
              "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
              "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "REye": 14,
              "LEye": 15, "REar": 16, "LEar": 17, "Background": 18}

POSE_PAIRS = [["Neck", "RShoulder"], ["Neck", "LShoulder"], ["RShoulder", "RElbow"],
              ["RElbow", "RWrist"], ["LShoulder", "LElbow"], ["LElbow", "LWrist"],
              ["Neck", "RHip"], ["RHip", "RKnee"], ["RKnee", "RAnkle"], ["Neck", "LHip"],
              ["LHip", "LKnee"], ["LKnee", "LAnkle"], ["Neck", "Nose"], ["Nose", "REye"],
              ["REye", "REar"], ["Nose", "LEye"], ["LEye", "LEar"]]

        
class openPose:
    pointsCur = []
    count = 0
    change = 0
    def __init__(self,path):
        net = cv2.dnn.readNetFromTensorflow("graph_opt.pb")
        cap = cv2.VideoCapture(path)
        while cap.isOpened():
            hasFrame, frame = cap.read()
            if not hasFrame:
                break
            inWidth = 224
            inHeight = 224
            frameWidth = frame.shape[1]
            frameHeight = frame.shape[0]

            net.setInput(
                cv2.dnn.blobFromImage(frame, 1.0, (inWidth, inHeight), (127.5, 127.5, 127.5), swapRB=True, crop=False))
            out = net.forward()
            out = out[:, :19, :, :]  # MobileNet output [1, 57, -1, -1], we only need the first 19 elements

            assert (len(BODY_PARTS) == out.shape[1])

            points = []
            for i in range(len(BODY_PARTS)):
                # Slice heatmap of corresponging body's part.
                heatMap = out[0, i, :, :]

                # Originally, we try to find all the local maximums. To simplify a sample
                # we just find a global one. However only a single pose at the same time
                # could be detected this way.
                _, conf, _, point = cv2.minMaxLoc(heatMap)
                x = (frameWidth * point[0]) / out.shape[3]
                y = (frameHeight * point[1]) / out.shape[2]
                # Add a point if it's confidence is higher than threshold.
                if conf > 0.2:
                    points.append((int(x), int(y)))
            if self.count > 0:
                # pointsCur = points
                pnt_change = 0
                for i in range(min(len(points), len(self.pointsCur))):
                    p_dif = np.subtract(points[i], self.pointsCur[i])
                    try:
                        x_dif = abs(p_dif[0] / points[i][0])
                        y_dif = abs(p_dif[1] / points[i][1])
                        if x_dif >= 0.05 or y_dif >= 0.05:
                            pnt_change = pnt_change + 1
                    except:
                        continue
                    # print(x_dif)
                    # print(y_dif)
                if pnt_change > 1:
                    self.change = self.change + 1
            self.pointsCur = points
            self.count = self.count + 1
        cap.release()
        cv2.destroyAllWindows()
    def res(self):
        print(self.change)
        print(self.count)
        per = (self.change / self.count) * 100.0
        return per