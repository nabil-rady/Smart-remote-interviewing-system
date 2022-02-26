import speech_recognition as sr
import moviepy.editor as me
from denoise2 import denoise
from pydub import AudioSegment
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import math

model_name = 'bert-base-nli-mean-tokens'
model = SentenceTransformer(model_name)


class recomm:
    y = 0.0

    def __init__(self, path, keywords):
        video_clip = me.VideoFileClip(r"{}".format(path))
        # path2 = path.replace("mp4", "wav")
        path2 = "audio.wav"
        video_clip.audio.write_audiofile(r"{}".format(path2), nbytes=2)
        recognizer = sr.Recognizer()
        d = denoise(path2)
        a = AudioSegment.from_wav(path2)
        a = a + 5
        a.export(path2, "wav")
        audio_clip = sr.AudioFile("{}".format(path))
        with audio_clip as source:
            audio_file = recognizer.record(source)
        sent = []
        result = recognizer.recognize_google(audio_file)
        sent.append(result)
        sent = sent + keywords
        sent_vec3 = model.encode(sent)
        x = cosine_similarity(
            [sent_vec3[0]],
            sent_vec3[1:]
        )
        for i in range(len(x)):
            self.y = self.y + x[0][i]
        self.y = (self.y / (len(sent) - 1)) * 1000.0

    def res(self):
        return self.y
