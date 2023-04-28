import os
import whisper

model = whisper.load_model("base")

def getTranscription(file_name):
    audioPath = os.path.abspath(f".\\temp\\{file_name}.mp3")
    result = model.transcribe(audioPath)
    return result['text']
