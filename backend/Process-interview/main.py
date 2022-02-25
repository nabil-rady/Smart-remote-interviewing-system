import pika, sys, os, json
from dotenv import load_dotenv

from recommendation import recomm
from emotion import emotionDetect
from openpose import openPose

def processing(interview):
    print(interview['interviewId'])
    for question in interview['questions']:
        path = question['videoLink']
        keywords = question['keywords']
        print(path, keywords)
        
        r = recomm(path,keywords)
        resText = r.res() #return double value containing the score
        print('The recommendation output: ', r, resText)
        #send result
        
        e = emotionDetect(path)
        status = e.user_status()
        print('The emotion output: ', e, status)
        #send result

        o = openPose(path)
        res = o.res()
        print('The openPose output: ', o, res)

    # AFTER FINSHING THE INTERVIEW PROCESSING PUBLISH TO THE QUEUE
    # result = None

    # params = pika.URLParameters(os.getenv('rabbitMQ_url'))
    # params.socket_timeout = 5
    # connection = pika.BlockingConnection(params)
    # channel = connection.channel()
    
    # send a message
    # channel.basic_publish(exchange='', routing_key='Results', body=result)
    # print (f"{interview_id} result sent to consumer")
    # connection.close()




def main():
    # engine = sqlalchemy.create_engine('mysql+pymysql://admin:nfy3WiNRHeKfMU@sevi.cisbfdavufvq.us-east-2.rds.amazonaws.com:5878/sevi')
    # conn = engine.connect()

    load_dotenv()
    
    params = pika.URLParameters(os.getenv('rabbitMQ_url'))
    interviews_connection = pika.BlockingConnection(params)
    interviews_channel = interviews_connection.channel()

    # create a function which is called on incoming messages
    def callback(ch, method, properties, body):
        processing(json.loads(body))

    # set up subscription on the queue
    interviews_channel.basic_consume('Interviews', callback, auto_ack=True)

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