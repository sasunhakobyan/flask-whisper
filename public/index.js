const downloadLink = document.getElementById("download");
const stopBtn = document.getElementById("stop-btn");
const recordBtn = document.getElementById("record-btn");
const audios = document.getElementById("audios");

const onUserAllow = async function (stream) {
    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];

    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data); //emit chunks
    });

    mediaRecorder.addEventListener("stop", function () {});

    stopBtn.addEventListener("click", function () {
        mediaRecorder.stop();
    });

    mediaRecorder.start(4000);
};

recordBtn.onclick = () => {
    navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(onUserAllow);
};
