from recommendation import recomm
from emotion import emotionDetect
from openpose import openPose
import sys

def main():
    path = sys.argv[1]
    r = recomm(path)
    resText = r.res()
    #send result
    e = emotionDetect(path)
    status = e.user_status()
    #send result
    o = openPose(path)
    res = o.res()
    #send result

if __name__=="__main__":
    main()
