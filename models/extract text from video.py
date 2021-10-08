import speech_recognition as sr
import moviepy.editor as me
from denoise2 import denosing

VIDEO_FILE = "video.mp4"
OUTPUT_AUDIO_FILE = "converted.wav"
OUTPUT_TEXT_FILE = "recognized.txt"
try:
    video_clip = me.VideoFileClip(r"{}".format(VIDEO_FILE))
    video_clip.audio.write_audiofile(r"{}".format(OUTPUT_AUDIO_FILE), nbytes=2)
    recognizer = sr.Recognizer()
    # Reduce noise from audio
    denosing(OUTPUT_AUDIO_FILE)
    OUTPUT_AUDIO_FILE = 'text1.wav'
    audio_clip = sr.AudioFile("{}".format(OUTPUT_AUDIO_FILE))
    with audio_clip as source:
        audio_file = recognizer.record(source)
    print("Please wait ...")
    result = recognizer.recognize_google(audio_file)
    with open(OUTPUT_TEXT_FILE, 'w') as file:
        file.write(result)
        print("Speech to text conversion successfull.")
except Exception as e:
    print("Attempt failed -- ", e)