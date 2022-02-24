from recommendation import recomm
from emotion import emotionDetect
from openpose import openPose
import sys

def get_keywords():
    #do something

def main():
    path = sys.argv[1]
    keywords = get_keywords()
    r = recomm(path,keywords)
    resText = r.res() #return double value containing the score
    #send result
    e = emotionDetect(path)
    status = e.user_status()
    #send result
    o = openPose(path)
    res = o.res()
    #send result

if __name__=="__main__":
    main()
