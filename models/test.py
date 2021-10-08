from pydub import AudioSegment

#Split wav file to multiple tracks
"""
t1 = 60 * 1000 #Works in milliseconds
newAudio = AudioSegment.from_wav("converted.wav")
newAudio1 = newAudio[:t1]
newAudio2 = newAudio[t1:]
newAudio1.export('x7.wav', format="wav")
newAudio2.export('x8.wav', format="wav")
"""
a = AudioSegment.from_wav("filtered_wel.wav")
a = a + 5
a.export("text1.wav","wav")