import pika
import sys
import os
import json
from dotenv import load_dotenv
import requests

from recommendation import recomm
from emotion import emotionDetect
from openpose import openPose


def download(url):
    path = url.split('/')[-1]
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return path


def processing(video):
    print(video['interviewId'], video['questionId'])
    link = video['link']
    keywords = video['keywords']
    print(link, keywords)

    # Download the video
    path = download(link)
    print(path)

    results = {}
    results['interviewId'] = video['interviewId']
    results['questionId'] = video['questionId']
    results['lastVideo'] = video['lastVideo']

    # Apply the ML models
    r = recomm(path, keywords)
    resText = r.res()
    print(
        f'###############################\nThe recommendation output: {resText}\n##################################\n')
    results['recommendation'] = resText

    e = emotionDetect(path)
    status = e.user_status()
    print(
        f'##################\nThe emotion output: {status}\n#############################\n')
    emotions = {}
    for emotion in status:
        emotions[emotion[0]] = emotion[1]
    results['emotions'] = emotions
    
    o = openPose(path)
    res = o.res()
    print(
        f'#################\nThe openPose output: {res}\n#################\n')
    results['openPose'] = res

    # delete the video, and audio
    os.remove(path)
    os.remove("audio.wav")

    # AFTER FINSHING THE INTERVIEW PROCESSING PUBLISH TO THE QUEUE
    result = json.dumps(results)
    print(result)

    params = pika.URLParameters(os.getenv('rabbitMQ_url'))
    params.socket_timeout = 5
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    # send a message
    channel.basic_publish(exchange='', routing_key='Results', body=result)
    print(
        f"Question {results['questionId']} at interview {results['interviewId']} result sent to consumer")
    connection.close()


def main():
    load_dotenv()

    params = pika.URLParameters(os.getenv('rabbitMQ_url'))
    interviews_connection = pika.BlockingConnection(params)
    interviews_channel = interviews_connection.channel()

    # create a function which is called on incoming messages
    def callback(ch, method, properties, body):
        processing(json.loads(body))

    # set up subscription on the queue
    interviews_channel.basic_consume('Videos', callback, auto_ack=True)

    # start consuming (blocks)
    interviews_channel.start_consuming()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
