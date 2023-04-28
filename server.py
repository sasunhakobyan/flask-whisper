import os
import time
from aiohttp import web
import socketio

sio = socketio.AsyncServer(buffer_size=1e-4)
app = web.Application()

sio.attach(app)

pagePath = os.path.abspath("./public/index.html")
staticPath = os.path.abspath("./public")

async def index(request):
    with open(pagePath) as f:
        return web.Response(text=f.read(), content_type="text/html")

@sio.on('audio-chunk')
def handle_audio_chunk(sid, data):
    currentTimeInMs = time.time()

    with open(f"./temp/{currentTimeInMs}.mp3", 'ab') as f:
        f.write(data)
        f.close()

app.router.add_get('/', index)

app.router.add_static('/public', staticPath)

if __name__ == '__main__':
    web.run_app(app)

# print(getTranscription(currentTimeInMs))
# os.remove(f".\\temp\{currentTimeInMs}.mp3")