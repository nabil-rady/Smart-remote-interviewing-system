FROM python:3.8

WORKDIR /app

COPY requirements.txt ./

RUN DEBIAN_FRONTEND=noninteractive apt-get update -y && apt-get install -y ffmpeg libsm6 libxext6

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python", "./main.py" ]
