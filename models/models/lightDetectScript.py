import asyncio
import websockets
import time
from model import lightFaceDetect3

async def echo(websocket):
    async for message in websocket:
        if not isinstance(message, str):
            detection_model = lightFaceDetect3()
            result = detection_model.detection(message)
            await websocket.send(result)
            t = time.time()
            print(t)
            print(type(message), result)
            with open(f'test-{t}.png', "wb") as out_file:
                out_file.write(message)


        else:
            print(message)
            await websocket.send(message)

async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())