const downloadLink = document.getElementById("download");
const stopBtn = document.getElementById("stop-btn");
const recordBtn = document.getElementById("record-btn");
const audios = document.getElementById("audios");

const socket = io();

const onUserAllow = async function (stream) {
    let recordedChunks = [];

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
        console.log("data available");

        socket.emit("audio-chunk", e.data);

        recordedChunks = [];
    };

    mediaRecorder.addEventListener("stop", function () {});

    stopBtn.addEventListener("click", function () {
        mediaRecorder.stop();
    });

    mediaRecorder.start(15000);
};

recordBtn.onclick = () => {
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(onUserAllow);
};

// const audioBlob = new Blob(recordedChunks, {
//     type: "audio/webm;codecs=opus",
// });

// const audioUrl = URL.createObjectURL(audioBlob);

// const newAudioEl = document.createElement("audio");
// newAudioEl.controls = "controls";
// newAudioEl.src = audioUrl;

// audios.appendChild(newAudioEl);
