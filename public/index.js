const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const audios = document.getElementById("audios");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            let chunks = [];

            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);

                const blob = new Blob(chunks, {
                    type: "audio/ogg; codecs=opus",
                });

                chunks = [];

                const audioURL = window.URL.createObjectURL(blob);

                const newAudioEl = document.createElement("audio");
                newAudioEl.controls = "controls";
                newAudioEl.src = audioURL;

                audios.appendChild(newAudioEl);
            };

            recordBtn.onclick = () => {
                mediaRecorder.start(5000);
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
