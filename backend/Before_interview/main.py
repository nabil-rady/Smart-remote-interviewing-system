import asyncio
import websockets
import time
from LightDetect3 import lightFaceDetect3

async def echo(websocket):
    async for message in websocket:
        try:
            if not isinstance(message, str):
                detection_model = lightFaceDetect3()
                result = detection_model.detection(message)
                await websocket.send(str(result))
                t = time.time()
                print(type(message), t, result)
            else:
                print(message)
                await websocket.send(message)

        except websockets.ConnectionClosed as e:
            print(f'Timeout', e)
        

async def main():
    async with websockets.serve(echo, "0.0.0.0", 5000):
        await asyncio.Future()  # run forever
asyncio.run(main())
