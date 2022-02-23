import sqlalchemy, pika, sys, os, json

def processing(interview_id, conn):
    videos = conn.execute(f'SELECT questionId, link FROM Videos WHERE interviewId = "{interview_id}"').fetchall()
    for v in videos:
        print(v.questionId, v.link)
        keywords = conn.execute(f'SELECT value FROM Keywords WHERE questionId = "{v.questionId}"').fetchall()
        print(keywords)
        
        # PROCESS THE VIDEO AND GET THE RESULT

    # AFTER FINSHING THE INTERVIEW PROCESSING PUBLISH TO THE QUEUE
    result = None

    params = pika.URLParameters('amqps://eruaznuc:5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u@woodpecker.rmq.cloudamqp.com/eruaznuc')
    params.socket_timeout = 5
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    
    # send a message
    channel.basic_publish(exchange='', routing_key='Results', body=result)
    print (f"{interview_id} result sent to consumer")
    connection.close()




def main():
    engine = sqlalchemy.create_engine('mysql+pymysql://admin:nfy3WiNRHeKfMU@sevi.cisbfdavufvq.us-east-2.rds.amazonaws.com:5878/sevi')
    conn = engine.connect()
    
    params = pika.URLParameters('amqps://eruaznuc:5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u@woodpecker.rmq.cloudamqp.com/eruaznuc')
    interviews_connection = pika.BlockingConnection(params)
    interviews_channel = interviews_connection.channel()

    # create a function which is called on incoming messages
    def callback(ch, method, properties, body):
        processing(json.loads(body), conn)

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