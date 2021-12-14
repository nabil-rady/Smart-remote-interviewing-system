from flask import Flask,render_template, Response, jsonify
from LightDetect import VideoCamera
# from ExtractText import spee2text
# from emotion import emo,user_status
# from similarity import simi

app = Flask(__name__)


@app.route('/')
def index():
    # rendering webpage
    return render_template('index.html')
#####################
"""Light detection"""
#####################
def gen(camera):
    while True:
        #get camera frame
        global frame
        frame = camera.get_frame()
        if frame == None:
            break
        else:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video')
def video():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
@app.route('/check')
def check():
    while True:
        if frame == None:
            return jsonify(True)
#####################
"""Light detection"""
#####################




# ####################
# """Speech to text"""
# ####################
# #result = spee2text(VIDEO_FILE,OUTPUT_AUDIO_FILE1,OUTPUT_AUDIO_FILE2,OUTPUT_TEXT_FILE)
# """
# VIDEO_FILE : name of video of user , ex : video200.mp4
# OUTPUT_AUDIO_FILE1 : name of extracted audio from video , ex : out1_200.wav
# OUTPUT_AUDIO_FILE2 : name of extracted audio from video after denoising , ex : out2_200.wav
# """
# @app.route('/speechtotext')
# def speechtotext():
#     VIDEO_FILE = "ex.mp4"
#     OUTPUT_AUDIO_FILE1 = "ex_1.wav"
#     OUTPUT_AUDIO_FILE2 = "ex_2.wav"
#     # result is string 
#     # result = spee2text(VIDEO_FILE,OUTPUT_AUDIO_FILE1,OUTPUT_AUDIO_FILE2)
# ####################
# """Speech to text"""
# ####################




# #########################
# """Emotion recognetion"""
# #########################
# # emo(inp,status)
# # inp : name of video to be analysed , ex : video150.mp4 
# # status : empty array to save status
# """User status"""
# # return user status in 2d array form
# # r = user_status(status)
# # print(r) ==> [['Angry', 0.13333333333333333], ['Happy', 0.4], ['Neutral', 0.2], ['Sad', 0.13333333333333333], ['Surprise', 0.13333333333333333]]
# @app.route('/emotionrec')
# def emotionrec():
#     inp = "video5.mp4"
#     status = []
#     emo(inp,status)
#     res = user_status(status) 
# #########################
# """Emotion recognetion"""
# #########################





# #####################
# """Test similairty"""
# #####################
# @app.route('/textsimi')
# def textsimi():
#     text = "i love working with team"
#     score = simi(text)

# #####################
# """Test similairty"""
# #####################

if __name__ == '__main__':
    app.run(debug=True)