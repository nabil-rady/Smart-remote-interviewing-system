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
        path2 = "audio.wav"
        audio = AudioSegment.from_file(path)
        audio.export(path2, format="wav")
        recognizer = sr.Recognizer()
        # d = denoise(path2)
        audio_clip = sr.AudioFile("{}".format(path2))
        with audio_clip as source:
            recognizer.adjust_for_ambient_noise(source)
            audio_file = recognizer.record(source)
        sent = []
        result = ""
        try:
            result = recognizer.recognize_google(audio_file)
        except sr.UnknownValueError:
            print("Can not process audio ")
        if not result:
            self.y = 0
        else:
            print(result)
            sent.append(result)
            sent = sent + keywords
            sent_vec3 = model.encode(sent)
            x = cosine_similarity(
                [sent_vec3[0]],
                sent_vec3[1:]
            )
            for i in range(len(x[0])):
                self.y = self.y + x[0][i]
            self.y = (self.y / (len(sent) - 1)) * 1000.0

    def res(self):
        if self.y < 0:
            self.y = 0
        return self.y
