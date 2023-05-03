const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const audios = document.getElementById("audios");

const socket = io();
const timeSlice = 4000;

function recordAndSend(stream) {
    const recorder = new MediaRecorder(stream);
    let audioBuffer;

    recorder.ondataavailable = (e) => (audioBuffer = e.data);
    recorder.onstop = (e) => {
        socket.emit("audio-chunk", audioBuffer);
    };

    setTimeout(() => recorder.stop(), timeSlice);

    recorder.start();
}

let micInterval;
recordBtn.onclick = () => {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((stream) => {
                micInterval = setInterval(
                    () => recordAndSend(stream),
                    timeSlice
                );
            });
    }
};

stopBtn.onclick = () => clearInterval(micInterval);
