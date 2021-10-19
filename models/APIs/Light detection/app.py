from flask import Flask,render_template, Response, jsonify
from LightDetect import VideoCamera, VideoCamera1

app = Flask(__name__)


@app.route('/')
def index():
    # rendering webpage
    return render_template('index.html')

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

if __name__ == '__main__':
    app.run(debug=True)