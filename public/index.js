const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const audios = document.getElementById("audios");

let firstMetadataBlob;

const socket = io();

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream, {});

            mediaRecorder.onstart = () => {
                setTimeout(() => {
                    mediaRecorder.requestData();
                }, 10);
            };

            mediaRecorder.ondataavailable = (e) => {
                const blob = new Blob([e.data], {
                    type: "audio/wav; codecs=opus",
                });

                if (!firstMetadataBlob) {
                    firstMetadataBlob = blob;
                } else {
                    const concatBlob = new Blob([firstMetadataBlob, blob], {
                        type: "audio/wav; codecs=opus",
                    });

                    socket.emit("audio-chunk", [firstMetadataBlob, blob]);

                    // const audioURL = window.URL.createObjectURL(concatBlob);

                    // const newAudioEl = document.createElement("audio");
                    // newAudioEl.controls = "controls";
                    // newAudioEl.src = audioURL;

                    // audios.appendChild(newAudioEl);
                }
            };

            recordBtn.onclick = () => {
                mediaRecorder.start(3000);
                console.log("recorder started");
            };

            stopBtn.onclick = () => {
                mediaRecorder.stop();
            };
        })
        .catch((err) => {
            console.log("The following `getUserMedia` error occured: " + err);
        });
} else {
    console.log("getUserMedia not supported on your browser!");
}
