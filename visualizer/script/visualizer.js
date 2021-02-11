class Visualizer {
    constructor(control, playlist) {
        this.control = control;
        this.playlist = playlist;
        // used for stopping canvas
        this.stopBtn = document.getElementById('stop');
        this.audioElement = document.querySelector("audio");
        this.createVisualizer();
    }
    createVisualizer = () => {
        let songImgDiv = document.getElementsByClassName("songImgDiv")[0];
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");
        canvas.setAttribute("width", (0.4 * window.innerWidth) + "px");
        canvas.setAttribute("height", (0.4 * window.innerWidth) + "px");
        context.lineWidth = 1.5;
        let animationID;
        this.stopBtn.addEventListener("click", () => {
            cancelAnimationFrame(animationID);
            control.removeRotateAnimation();
        });
        let audioContext = new AudioContext();
        let analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        let audio = audioContext.createMediaElementSource(this.audioElement);
        audio.src = playlist.songs[playlist.currentPlayingSongIndex].audioSrc;
        audio.connect(analyser);
        analyser.connect(audioContext.destination);
        let frequencyDataSize = analyser.frequencyBinCount;
        let frequencyDataArr = new Uint8Array(frequencyDataSize);
        let bars = 128;
        let barHeight = 0;
        let center_x = canvas.width / 2;
        let center_y = canvas.height / 2;
        let end_x = 0;
        let end_y = 0;
        let begin_x = 0;
        let begin_y = 0;
        let radius = songImgDiv.offsetWidth / 2;
        context.moveTo(center_x, center_y);
        function renderVisualizer(){
            context.clearRect(0,0,canvas.width, canvas.height);
            analyser.getByteFrequencyData(frequencyDataArr);
            for(let i = 0; i < bars; i++){
                barHeight = Math.floor(frequencyDataArr[i] * 0.4) + 10;
                end_x = Math.floor(center_x+ Math.cos(i * 2 * Math.PI / bars)*(radius + barHeight + 10));
                end_y = Math.floor(center_y + Math.sin(i * 2 * Math.PI / bars)*(radius + barHeight + 10));
                begin_x = Math.floor(center_x + Math.cos(i * 2 * Math.PI / bars)*(radius + 10));
                begin_y = Math.floor(center_y+ Math.sin(i * 2 * Math.PI / bars)*(radius+10));
                context.beginPath();
                context.moveTo(begin_x, begin_y);
                context.lineTo(end_x, end_y);
                context.stroke();
            }
            animationID = requestAnimationFrame(renderVisualizer);
        }
        this.audioElement.play();
        renderVisualizer();
    }
}