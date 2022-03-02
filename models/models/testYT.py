from recommendation import recomm
from pytube import YouTube



def main():
    text = 'https://www.youtube.com/watch?v=0g1Q4fBDp2U'
    yt = YouTube(text)
    stream_url = yt.streams.all()[0].url
    print(stream_url)
    path = stream_url
    keywords = ['xyz','abc']
    r = recomm(path,keywords)
    resText = r.res() #return double value containing the score
    print(resText)

if __name__=="__main__":
    main()
