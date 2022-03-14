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

    # r = recomm(path, keywords)
    # resText = r.res()  # return double value containing the score
    # print(
    #     f'###############################\nThe recommendation output: r=> {r}, resText=> {resText}\n##################################\n')
    # # send result

    # e = emotionDetect(path)
    # status = e.user_status()
    # print(
    #     f'##################\nThe emotion output: e=> {e}, status=> {status}\n#############################\n')
    # # send result

    # o = openPose(path)
    # res = o.res()
    # print(
    #     f'#################\nThe openPose output: o=> {o}, res=> {res}\n#################\n')

    # delete the video
    os.remove(path)

    # AFTER FINSHING THE INTERVIEW PROCESSING PUBLISH TO THE QUEUE
    result = json.dumps(video)
    print(result)
    
    params = pika.URLParameters(os.getenv('rabbitMQ_url'))
    params.socket_timeout = 5
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    # send a message
    channel.basic_publish(exchange='', routing_key='Results', body=result)
    print (f"Question {video['questionId']} at interview {video['interviewId']} result sent to consumer")
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
