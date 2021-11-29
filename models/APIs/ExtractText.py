import speech_recognition as sr
import moviepy.editor as me
from denoise2 import denosing
from pydub import AudioSegment


##############################
"""Extract Speech from text"""
"""
VIDEO_FILE : name of video of user , ex : video200.mp4
OUTPUT_AUDIO_FILE1 : name of extracted audio from video , ex : out1_200.wav
OUTPUT_AUDIO_FILE2 : name of extracted audio from video after denoising , ex : out2_200.wav
"""
##############################

def spee2text(VIDEO_FILE,OUTPUT_AUDIO_FILE1,OUTPUT_AUDIO_FILE2):
    video_clip = me.VideoFileClip(r"{}".format(VIDEO_FILE))
    video_clip.audio.write_audiofile(r"{}".format(OUTPUT_AUDIO_FILE1), nbytes=2)
    recognizer = sr.Recognizer()
    # Reduce noise from audio
    denosing(OUTPUT_AUDIO_FILE1,OUTPUT_AUDIO_FILE2)
    a = AudioSegment.from_wav(OUTPUT_AUDIO_FILE2)
    a = a + 5
    a.export(OUTPUT_AUDIO_FILE2,"wav")
    audio_clip = sr.AudioFile("{}".format(OUTPUT_AUDIO_FILE2))
    with audio_clip as source:
        audio_file = recognizer.record(source)
    result = recognizer.recognize_google(audio_file)
    return result
    """
    #######################################
    #Writing the extracted text to txt file
    #######################################
    with open(OUTPUT_TEXT_FILE, 'w') as file:
        file.write(result)
    """