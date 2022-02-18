import asyncio
import websockets
#import cv2
#import numpy as np
#import base64
#import io
#import PIL.Image as Image
import time

async def echo(websocket):
    async for message in websocket:
        if not isinstance(message, str):
            t = time.time()
            print(t)
            print(type(message))
#            with open(f'test-{t}.png', "wb") as out_file:
 #               out_file.write(message)


        else:
            print(message)
        await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
