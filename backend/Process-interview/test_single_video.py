from recommendation import recomm
from emotion import emotionDetect
from openpose import openPose
import requests
import json
from pytube import YouTube


def download(url):
    path = url.split('/')[-1]
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return path

def main():
    link = 'https://sris.s3.us-east-2.amazonaws.com/fb8842e2-e91c-453c-a4b8-0d683ef7d662/fb8842e2-e91c-453c-a4b8-0d683ef7d662-2022-07-03%2012:12:51.497460.mp4'
    
    path = download(link)

    e = emotionDetect(path)
    status = e.user_status()
    print(
        f'##################\nThe emotion output: {status}\n#############################\n')
    emotions = {}
    for emotion in status:
        emotions[emotion[0]] = emotion[1]
    print(emotions)

if __name__=="__main__":
    main()
